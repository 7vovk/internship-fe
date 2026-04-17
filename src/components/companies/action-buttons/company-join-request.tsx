"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster } from "@/app/utils";
import { useRouter } from "next/navigation";
import { createCompanyJoinRequestAction } from "@/components/companies/company.server-action";
import { useTranslations } from "next-intl";
import { IconEnum } from "@/lib/enums/app.enums";

type CompanyJoinRequestProps = {
  companyId: string;
};

export function CompanyJoinRequest({ companyId }: CompanyJoinRequestProps) {
  const router = useRouter();
  const t = useTranslations("Company");

  async function handleJoinRequest() {
    const created = await createCompanyJoinRequestAction(companyId);
    if (!created.ok) {
      errorToaster(created.message);
    }
    router.refresh();
  }

  return (
    <ConfirmationModal
      buttonName="join"
      btnClasses="hover:bg-green-600 hover:text-white"
      btnOkClasses="text-black bg-green-300 hover:bg-green-500 hover:text-white"
      title="confirmAction"
      description={t("joinRequest")}
      icon={IconEnum.CHECK}
      onConfirm={handleJoinRequest}
    />
  );
}
