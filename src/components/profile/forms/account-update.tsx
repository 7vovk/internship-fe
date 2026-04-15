"use client";

import { useTranslations } from "next-intl";
import { ServerActionResult, User } from "@/lib/interfaces";
import {
  updateCurrentUserAction,
  updateCurrentUserImageAction,
} from "@/components/profile/profile.server-action";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CardContent,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shared/ui";
import FormController from "@/components/forms/form-controller";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getEditSchema } from "@/components/forms/auth.schema";
import { useRouter } from "next/navigation";

type ProfileEditProps = {
  currentUser: User | null;
};

export function AccountUpdate({ currentUser }: ProfileEditProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const tButtons = useTranslations("Buttons");
  const tUser = useTranslations("User");
  const tAuth = useTranslations("Auth");
  const tGeneral = useTranslations("General");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const editFormSchema = getEditSchema(tGeneral);
  const currentProfilePicture = currentUser?.profilePictureUrl || "";

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      profilePicture: currentProfilePicture,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      description: currentUser?.description,
    },
  });

  async function handleUpdate() {
    try {
      const { firstName, lastName, description } = form.getValues();
      const updated: ServerActionResult = await updateCurrentUserAction({
        firstName,
        lastName,
        description,
      });
      if (!updated.ok) {
        errorToaster(updated.message);
        return;
      }

      if (selectedImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("profilePicture", selectedImageFile);
        const imageUpdated = await updateCurrentUserImageAction(imageFormData);
        if (!imageUpdated.ok) {
          errorToaster(imageUpdated.message);
          return;
        }
      }

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  function handleImageSelect(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      errorToaster(tAuth("chooseImageFile"));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
    setSelectedImageFile(file);
    input.value = "";
  }

  function handleClose() {
    form.clearErrors();
    setSelectedImage(null);
    setSelectedImageFile(null);
  }

  useEffect(() => {
    return () => {
      if (selectedImage?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="hover:bg-green-600 hover:text-white"
          />
        }
      >
        {tButtons("edit")}
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{tUser("editProfile")}</SheetTitle>
          <SheetDescription>{tUser("editDescription")}</SheetDescription>
        </SheetHeader>
        <CardContent>
          <div className="space-y-2 mb-2">
            <p className="text-sm font-medium">{tAuth("profilePicture")}</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  alt={currentUser?.firstName ?? "User"}
                  src={selectedImage || form.watch("profilePicture") || ""}
                />
                <AvatarFallback
                  firstName={form.watch("firstName")}
                  lastName={form.watch("lastName")}
                />
              </Avatar>
              <div className="flex w-full flex-col gap-2">
                <input
                  ref={imageInputRef}
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => imageInputRef.current?.click()}
                >
                  {selectedImageFile
                    ? tAuth("changeImage")
                    : tAuth("chooseImage")}
                </Button>
              </div>
            </div>
          </div>

          <form
            id="edit-account-form"
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <FormController
              control={form.control}
              name="firstName"
              label={tAuth("firstName")}
              placeholder={tAuth("firstNamePlaceholder")}
              autoComplete="off"
            />

            <FormController
              control={form.control}
              name="lastName"
              label={tAuth("lastName")}
              placeholder={tAuth("lastNamePlaceholder")}
              autoComplete="off"
            />

            <FormController
              control={form.control}
              name="description"
              label={tAuth("userDescription")}
              autoComplete="off"
              placeholder={tAuth("userDescriptionPlaceholder")}
              type="textarea"
            />
          </form>
        </CardContent>
        <SheetFooter>
          <Button
            type="submit"
            form="edit-account-form"
            className="w-full py-2 font-medium"
          >
            {tButtons("saveChanges")}
          </Button>
          <SheetClose
            render={<Button variant="outline" />}
            onClick={handleClose}
          >
            {tButtons("close")}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
