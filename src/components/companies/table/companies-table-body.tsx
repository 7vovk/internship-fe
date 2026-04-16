import { TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import { Company, User } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { CompanyRowLink } from "@/app/components/client/company-row-link";
import { convertDate } from "@/app/utils/date.utils";
import { GetCompanyActions } from "@/components/companies/action-buttons/company-action-buttons";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";
import { NoRecordsRow } from "@/components/shared/no-records-row";

type CompaniesTableBodyProps = {
  rows: Array<Company>;
  currentUser: User | null;
  showActions?: ActionButtons[];
  backHref?: string;
};

export async function CompaniesTableBody({
  rows,
  currentUser,
  showActions,
  backHref,
}: CompaniesTableBodyProps) {
  const tCompanies = await getTranslations(
    siteConfig.pages.companies.translation,
  );

  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((company) => {
          const isOwner = company.ownerId === currentUser?.id;
          const companyMember = company.members?.some(
            (member) => member.id === currentUser?.id,
          );
          const companyAdmin = company.admins?.some(
            (admin) => admin.id === currentUser?.id,
          );
          const canLeaveCompany = companyMember || companyAdmin;
          const canRequestCompany = !isOwner && !companyMember && !companyAdmin;

          const hasRequestAction =
            canRequestCompany &&
            (showActions?.includes(ActionButtons.ALL) ||
              showActions?.includes(ActionButtons.REQUEST));
          const isRowClickable =
            isOwner || companyMember || companyAdmin || hasRequestAction;
          const repeatedCells: string[] = [
            company.description,
            company.website,
            company.address,
            company.phone,
            convertDate(company.createDate, "dd/mm/yyyy, HH:MM:ss"),
            convertDate(company.updateDate, "dd/mm/yyyy, HH:MM:ss"),
          ];

          return (
            <TableRow
              key={company.id}
              className={cn(
                "group relative select-none",
                isRowClickable
                  ? "cursor-pointer hover:bg-muted/50"
                  : "hover:bg-transparent cursor-default",
              )}
            >
              <TableCell className="h-14 px-4 font-medium">
                {isRowClickable && (
                  <CompanyRowLink
                    companyId={company.id}
                    ariaLabel={tCompanies("open", { name: company.name })}
                    backHref={backHref}
                  />
                )}
                <div className="relative z-0 flex items-center gap-3">
                  <span>{company.name}</span>
                </div>
              </TableCell>
              {repeatedCells.map((cellName, i) => (
                <TableCell key={i} className="h-14 px-4 font-medium">
                  <div className="relative z-0 flex items-center gap-3">
                    <span>{cellName}</span>
                  </div>
                </TableCell>
              ))}

              <TableCell className="h-14 px-4 font-medium">
                <div className="relative z-20 flex items-center gap-3">
                  <span>
                    <GetCompanyActions
                      showActions={showActions}
                      canLeaveCompany={canLeaveCompany}
                      canRequestCompany={canRequestCompany}
                      company={company as Company}
                      variant="compact"
                    />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <NoRecordsRow colSpan={8} />
      )}
    </TableBody>
  );
}
