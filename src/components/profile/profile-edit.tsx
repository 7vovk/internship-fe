"use client";

import {
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
import { useState } from "react";
import { AuthType, useAuth } from "@/hooks/useAuth.hook";
import {
  deleteCurrentUserAction,
  updateCurrentUserAction,
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
  const { logout } = useAuth();
  const tUser = useTranslations("User");
  const tAuth = useTranslations("Auth");
  const tButtons = useTranslations("Buttons");
  const editFormSchema = getEditSchema(tAuth);
  const editPasswordSchema = getEditPasswordSchema(tAuth);
  const editPasswordPayloadSchema = getEditPasswordPayloadSchema(tAuth);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
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

  async function handleUpdate() {
    try {
      const updated: UserActionResult = await updateCurrentUserAction(
        form.getValues(),
      );
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

  function handleClose() {
    form.clearErrors();
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
