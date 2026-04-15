import { Company, CompanyActions } from "@/lib/interfaces";
import { cn, getCurrentUserCached } from "@/lib/utils";
import { CompanyDataModal } from "@/components/companies/company-data-modal";
import { CompanyDelete } from "@/components/companies/company-delete";
import { CompanyLeave } from "@/components/companies/company-leave";

type CompanyActionButtonsProps = {
  company: Company;
  display?: CompanyActions;
  wrapperClassName?: string;
  variant?: "compact" | "panel";
};

export async function GetCompanyActions({
  company,
  display,
  wrapperClassName,
  variant = "compact",
}: CompanyActionButtonsProps) {
  const userData = await getCurrentUserCached();
  const isCompact = variant === "compact";
  const isCompanyAdmin = Boolean(
    userData?.companyAdministration?.some(
      (adminCompany) => adminCompany.id === company.id,
    ),
  );

  const triggerClassName = isCompact ? "h-8 px-2 text-xs" : "";

  return (
    <div
      className={cn(
        "flex items-center",
        isCompact ? "gap-2" : "gap-3",
        wrapperClassName,
      )}
    >
      {company.ownerId === userData?.id &&
        (display?.all || display?.update) && (
          <CompanyDataModal
            company={company}
            buttonClassName={triggerClassName}
          />
        )}

      {company.ownerId === userData?.id &&
        (display?.all || display?.remove) && (
          <CompanyDelete
            companyId={company.id}
            buttonClassName={triggerClassName}
          />
        )}
      {display?.leave && company.ownerId !== userData?.id && (
        <CompanyLeave companyId={company.id} isDisabled={isCompanyAdmin} />
      )}
    </div>
  );
}
