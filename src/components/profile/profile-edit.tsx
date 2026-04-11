"use client";

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
} from "../shared/ui";
import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import FormController from "@/components/forms/form-controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getEditPasswordPayloadSchema,
  getEditPasswordSchema,
  getEditSchema,
} from "@/components/forms/auth.schema";
import { useTranslations } from "next-intl";
import { parseErrorMessage } from "@/lib/errors";
import { errorToaster } from "@/app/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { AuthType, useAuth } from "@/hooks/useAuth.hook";
import {
  deleteCurrentUserAction,
  updateCurrentUserAction,
  updateCurrentUserImageAction,
} from "./profile.server-action";
import { User, UserActionResult } from "@/lib/interfaces";

type ProfileEditProps = {
  authType: AuthType;
  currentUser: User | null;
};

export default function ProfileEdit({
  authType,
  currentUser,
}: ProfileEditProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { logout } = useAuth();
  const tUser = useTranslations("User");
  const tAuth = useTranslations("Auth");
  const tButtons = useTranslations("Buttons");
  const editFormSchema = getEditSchema(tAuth);
  const editPasswordSchema = getEditPasswordSchema(tAuth);
  const editPasswordPayloadSchema = getEditPasswordPayloadSchema(tAuth);
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

  const passwordForm = useForm<z.infer<typeof editPasswordSchema>>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    return () => {
      if (selectedImage?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  async function handleUpdate() {
    try {
      const { firstName, lastName, description } = form.getValues();
      const updated: UserActionResult = await updateCurrentUserAction({
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

  async function handleDelete() {
    try {
      const deleted: UserActionResult = await deleteCurrentUserAction();
      if (!deleted.ok) {
        errorToaster(deleted.message);
        return;
      }
      await logout(authType);
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  async function handlePasswordUpdate() {
    try {
      const formData = editPasswordSchema.parse(passwordForm.getValues());
      const payload = editPasswordPayloadSchema.parse(formData);
      const updated: UserActionResult = await updateCurrentUserAction(payload);
      if (!updated.ok) {
        errorToaster(updated.message);
        return;
      }
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
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

      <ConfirmationModal
        buttonName="editPassword"
        btnClasses="hover:bg-yellow-500 hover:text-white"
        btnOkClasses="text-black bg-yellow-300 hover:bg-yellow-500 hover:text-white"
        description={tUser("editPass")}
        icon="warning"
        onConfirm={handlePasswordUpdate}
      >
        <form id="edit-password-form" className="space-y-4">
          <FormController
            control={passwordForm.control}
            name="password"
            type="password"
            label={tAuth("password")}
            placeholder={"**************"}
            autoComplete="off"
          />

          <FormController
            control={passwordForm.control}
            name="confirmPassword"
            type="password"
            label={tAuth("passwordConfirm")}
            placeholder={"**************"}
            autoComplete="off"
          />
        </form>
      </ConfirmationModal>

      <ConfirmationModal
        buttonName="deleteAccount"
        btnClasses="hover:bg-red-500 hover:text-white"
        btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
        title="sure"
        description={tUser("removeAccount")}
        icon="alert"
        onConfirm={handleDelete}
      />
    </div>
  );
}
