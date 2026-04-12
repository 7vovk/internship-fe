"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import FormController from "@/components/forms/form-controller";
import { useTranslations } from "next-intl";
import { UserActionResult } from "@/lib/interfaces";
import { updateCurrentUserAction } from "@/components/profile/profile.server-action";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getEditPasswordPayloadSchema,
  getEditPasswordSchema,
} from "@/components/forms/auth.schema";
import { useRouter } from "next/navigation";

export function EditPassword() {
  const router = useRouter();
  const tUser = useTranslations("User");
  const tAuth = useTranslations("Auth");

  const editPasswordSchema = getEditPasswordSchema(tAuth);
  const editPasswordPayloadSchema = getEditPasswordPayloadSchema(tAuth);

  const passwordForm = useForm<z.infer<typeof editPasswordSchema>>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

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
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  return (
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
          placeholder="**************"
          autoComplete="off"
        />

        <FormController
          control={passwordForm.control}
          name="confirmPassword"
          type="password"
          label={tAuth("passwordConfirm")}
          placeholder="**************"
          autoComplete="off"
        />
      </form>
    </ConfirmationModal>
  );
}
