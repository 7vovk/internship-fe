"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { useTranslations } from "next-intl";
import { leaveSpecificCompany } from "@/lib/api/companies";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { useRouter } from "next/navigation";

type CompanyLeaveProps = {
  companyId: string;
  isDisabled?: boolean;
};

export function CompanyLeave({
  companyId,
  isDisabled = false,
}: CompanyLeaveProps) {
  const t = useTranslations("Company");
  const router = useRouter();

  async function handleLeaveCompany() {
    try {
      await leaveSpecificCompany(companyId);
      router.refresh();
      return true;
    } catch (error) {
      errorToaster(parseErrorMessage(error));
      return false;
    }
  }

  return (
    <ConfirmationModal
      buttonName="companyLeave"
      isDisabled={isDisabled}
      btnClasses="hover:bg-red-500 hover:text-white"
      btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
      title="sure"
      description={t("leave")}
      icon="alert"
      onConfirm={handleLeaveCompany}
    />
  );
}
