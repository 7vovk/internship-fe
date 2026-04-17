"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster } from "@/app/utils";
import { useRouter } from "next/navigation";
import { excludeCompanyMemberAction } from "@/components/companies/company.server-action";
import { useTranslations } from "next-intl";
import { IconEnum } from "@/lib/enums/app.enums";

type CompanyExcludeMemberProps = {
  companyId: string;
  memberId: string;
};

export function CompanyExcludeMember({
  companyId,
  memberId,
}: CompanyExcludeMemberProps) {
  const router = useRouter();
  const t = useTranslations("Company");

  async function handleExcludeMember() {
    const excluded = await excludeCompanyMemberAction(companyId, memberId);
    if (!excluded.ok) {
      errorToaster(excluded.message);
    }
    router.refresh();
  }

  return (
    <ConfirmationModal
      buttonName="excludeUser"
      btnClasses="hover:bg-red-500 hover:text-white"
      btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
      title="sure"
      description={t("excludeMember")}
      icon={IconEnum.ALERT}
      onConfirm={handleExcludeMember}
    />
  );
}
