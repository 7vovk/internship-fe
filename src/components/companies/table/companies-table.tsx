import { Table } from "../../shared/ui";
import { Company, ProfileCompanyData } from "@/lib/interfaces";
import { Routes } from "@/config/site.enums";
import TablePagination from "../../shared/table-pagination";
import { getAllCompanies } from "@/lib/api/companies";
import { getCurrentUserCached } from "@/lib/utils";
import { CompaniesTableHeader } from "@/components/companies/table/companies-table-header";
import { CompaniesTableBody } from "@/components/companies/table/companies-table-body";

type CompaniesTableProps = {
  page?: number;
  limit?: number;
  profileCompanies?: ProfileCompanyData[];
  showRoleBadges?: boolean;
  isLeaveDisplayed?: boolean;
};

export default async function CompaniesTable({
  page = 1,
  limit = 10,
  profileCompanies,
  showRoleBadges = false,
  isLeaveDisplayed,
}: CompaniesTableProps) {
  const currentUser = await getCurrentUserCached();
  const hasMembershipCompanies = Boolean(
    currentUser?.invitedTo?.length ||
    currentUser?.companyAdministration?.length,
  );
  const companies = profileCompanies
    ? null
    : await getAllCompanies({ page, limit });
  const rows: Array<Company | ProfileCompanyData> =
    profileCompanies ?? companies?.data ?? [];
  const shouldDisplayLeave = isLeaveDisplayed ?? hasMembershipCompanies;

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <CompaniesTableHeader showRoleBadges={showRoleBadges} />
        <CompaniesTableBody
          profileCompanies={profileCompanies}
          rows={rows}
          isLeaveDisplayed={isLeaveDisplayed}
          currentUser={currentUser}
          shouldDisplayLeave={shouldDisplayLeave}
          showRoleBadges={showRoleBadges}
          backHref={Routes.PROFILE}
        />
      </Table>
      {!profileCompanies && companies && (
        <TablePagination route={Routes.COMPANIES} data={companies} />
      )}
    </div>
  );
}
