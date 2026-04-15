import { Company } from "@/lib/interfaces";
import { cn, getCurrentUserCached } from "@/lib/utils";
import { CompanyDataModal } from "./company-data-modal";
import { CompanyDelete } from "./company-delete";
import { CompanyLeave } from "./company-leave";
import { CompanyInvite } from "@/components/companies/action-buttons/company-invite";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";

type CompanyActionButtonsProps = {
  company: Company;
  showActions?: ActionButtons[];
  wrapperClassName?: string;
  canLeaveCompany?: boolean;
  variant?: "compact" | "panel";
};

export async function GetCompanyActions({
  company,
  showActions,
  wrapperClassName,
  canLeaveCompany = true,
  variant = "compact",
}: CompanyActionButtonsProps) {
  const userData = await getCurrentUserCached();
  const isCompact = variant === "compact";
  const isOwner = company.ownerId === userData?.id;
  const isCompanyAdmin = company.admins?.some(
    (admin) => admin.id === userData?.id,
  );
  const triggerClassName = isCompact ? "h-8 px-2 text-xs" : "";
  const isVisible = (action: ActionButtons) =>
    showActions?.includes(ActionButtons.ALL) || showActions?.includes(action);

  return (
    <div
      className={cn(
        "flex items-center",
        isCompact ? "gap-2" : "gap-3",
        wrapperClassName,
      )}
    >
      {isOwner && isVisible(ActionButtons.UPDATE) && (
        <CompanyDataModal
          company={company}
          buttonClassName={triggerClassName}
        />
      )}

      {isOwner && isVisible(ActionButtons.REMOVE) && (
        <CompanyDelete
          companyId={company.id}
          buttonClassName={triggerClassName}
        />
      )}
      {isOwner && isVisible(ActionButtons.INVITE) && (
        <CompanyInvite companyId={company.id} />
      )}
      {isVisible(ActionButtons.LEAVE) && canLeaveCompany && !isOwner && (
        <CompanyLeave companyId={company.id} isDisabled={isCompanyAdmin} />
      )}
    </div>
  );
}
