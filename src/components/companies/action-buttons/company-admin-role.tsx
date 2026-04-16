"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster } from "@/app/utils";
import { useRouter } from "next/navigation";
import {
  addCompanyAdminAction,
  removeCompanyAdminAction,
} from "@/components/companies/company.server-action";
import { useTranslations } from "next-intl";
import { AdminRoleMode } from "@/lib/enums/action-buttons.enums";

type CompanyAdminRoleActionsProps = {
  companyId: string;
  memberId: string;
  isAdmin: boolean;
  mode?: AdminRoleMode;
};

export function CompanyAdminRole({
  companyId,
  memberId,
  isAdmin,
  mode = AdminRoleMode.BOTH,
}: CompanyAdminRoleActionsProps) {
  const router = useRouter();
  const tCompany = useTranslations("Company");

  async function handleAdminAdd() {
    const result = await addCompanyAdminAction(companyId, memberId);
    if (!result.ok) {
      errorToaster(result.message);
    }
    router.refresh();
  }

  async function handleRemoveAdmin() {
    const removed = await removeCompanyAdminAction(companyId, memberId);
    if (!removed.ok) {
      errorToaster(removed.message);
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {(mode === AdminRoleMode.APPOINT || mode === AdminRoleMode.BOTH) && (
        <ConfirmationModal
          buttonName="appointAdmin"
          isDisabled={isAdmin}
          btnClasses="hover:bg-blue-600 hover:text-white"
          btnOkClasses="text-black bg-blue-300 hover:bg-blue-500 hover:text-white"
          title="confirmAction"
          description={tCompany("appointAdmin")}
          icon="check"
          onConfirm={handleAdminAdd}
        />
      )}
      {(mode === AdminRoleMode.REMOVE || mode === AdminRoleMode.BOTH) && (
        <ConfirmationModal
          buttonName="removeAdmin"
          isDisabled={!isAdmin}
          btnClasses="hover:bg-yellow-600 hover:text-white"
          btnOkClasses="text-black bg-yellow-300 hover:bg-yellow-500 hover:text-white"
          title="sure"
          description={tCompany("removeAdmin")}
          icon="warning"
          onConfirm={handleRemoveAdmin}
        />
      )}
    </div>
  );
}
