import { Badge, TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import {
  Company,
  CompanyActions,
  ProfileCompanyData,
  User,
} from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { CompanyRowLink } from "@/app/components/client/company-row-link";
import { convertDate } from "@/app/utils/date.utils";
import { GetCompanyActions } from "@/components/companies/company-action-buttons";

type CompaniesTableBodyProps = {
  rows: Array<Company | ProfileCompanyData>;
  currentUser: User | null;
  shouldDisplayLeave: boolean;
  showRoleBadges: boolean;
  profileCompanies?: ProfileCompanyData[];
  isLeaveDisplayed?: boolean;
  backHref?: string;
};

export async function CompaniesTableBody({
  rows,
  currentUser,
  shouldDisplayLeave,
  isLeaveDisplayed,
  profileCompanies,
  showRoleBadges,
  backHref,
}: CompaniesTableBodyProps) {
  const tCompanies = await getTranslations(
    siteConfig.pages.companies.translation,
  );

  const membershipCompanyIds = new Set([
    ...(currentUser?.invitedTo?.map((company) => company.id) ?? []),
    ...(currentUser?.companyAdministration?.map((company) => company.id) ?? []),
  ]);

  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((company) => {
          const displayActions: CompanyActions = shouldDisplayLeave
            ? isLeaveDisplayed
              ? { leave: true }
              : "ownerId" in company && company.ownerId === currentUser?.id
                ? { all: true }
                : membershipCompanyIds.has(company.id)
                  ? { leave: true }
                  : {}
            : { all: true };
          const hasAnyActions = Boolean(
            displayActions.all ||
            displayActions.update ||
            displayActions.remove ||
            displayActions.leave,
          );
          const isRowClickable = profileCompanies ? true : hasAnyActions;
          const repeatedCells = [
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
              {showRoleBadges && (
                <TableCell className="h-14 px-4 font-medium">
                  {"roles" in company && company.roles.length > 0 ? (
                    <div className="relative z-0 flex items-center gap-2">
                      {company.roles.map((role) => (
                        <Badge
                          key={`${company.id}-${role}`}
                          variant="secondary"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </TableCell>
              )}

              <TableCell className="h-14 px-4 font-medium">
                <div className="relative z-20 flex items-center gap-3">
                  <span>
                    <GetCompanyActions
                      display={displayActions}
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
        <TableRow>
          <TableCell
            colSpan={8}
            className="h-24 text-center text-muted-foreground"
          >
            {tCompanies("noCompanies")}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
