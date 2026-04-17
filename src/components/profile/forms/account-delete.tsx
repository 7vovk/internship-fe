"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { useTranslations } from "next-intl";
import { ServerActionResult } from "@/lib/interfaces";
import { deleteCurrentUserAction } from "@/components/profile/profile.server-action";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { AuthType, useAuth } from "@/hooks/useAuth.hook";

type ProfileDeleteProps = {
  authType: AuthType;
};

export function AccountDelete({ authType }: ProfileDeleteProps) {
  const { logout } = useAuth();
  const tUser = useTranslations("User");

  async function handleDelete() {
    try {
      const deleted: ServerActionResult = await deleteCurrentUserAction();
      if (!deleted.ok) {
        errorToaster(deleted.message);
        return;
      }
      await logout(authType);
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  return (
    <ConfirmationModal
      buttonName="deleteAccount"
      btnClasses="hover:bg-red-500 hover:text-white"
      btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
      title="sure"
      description={tUser("removeAccount")}
      icon="alert"
      onConfirm={handleDelete}
    />
  );
}
