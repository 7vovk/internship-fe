"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { useTranslations } from "next-intl";
import { ServerActionResult } from "@/lib/interfaces";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { deleteCurrentCompanyAction } from "../company.server-action";
import { cn } from "@/lib/utils";

type CompanyDeleteProps = {
  companyId: string;
  buttonClassName?: string;
};

export function CompanyDelete({
  companyId,
  buttonClassName,
}: CompanyDeleteProps) {
  const t = useTranslations("Company");

  async function handleDelete() {
    try {
      const deleted: ServerActionResult =
        await deleteCurrentCompanyAction(companyId);
      if (!deleted.ok) {
        errorToaster(deleted.message);
      }
    } catch (error) {
      errorToaster(parseErrorMessage(error));
    }
  }

  return (
    <ConfirmationModal
      buttonName="delete"
      btnClasses={cn("hover:bg-red-500 hover:text-white", buttonClassName)}
      btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
      title="sure"
      description={t("remove")}
      icon="alert"
      onConfirm={handleDelete}
    />
  );
}
