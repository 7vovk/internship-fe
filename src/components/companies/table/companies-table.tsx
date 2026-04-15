import { Table } from "../../shared/ui";
import { Company } from "@/lib/interfaces";
import { Routes } from "@/config/site.enums";
import TablePagination from "../../shared/table-pagination";
import { getAllCompanies, getUserCompanies } from "@/lib/api/companies";
import { getCurrentUserCached } from "@/lib/utils";
import { CompaniesTableHeader } from "@/components/companies/table/companies-table-header";
import { CompaniesTableBody } from "@/components/companies/table/companies-table-body";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";

type CompaniesTableProps = Partial<{
  page: number;
  limit: number;
  isProfile: boolean;
  showRoleBadges: boolean;
  showActions: ActionButtons[];
}>;

export default async function CompaniesTable({
  page = 1,
  limit = 10,
  isProfile = false,
  showRoleBadges = false,
  showActions,
}: CompaniesTableProps) {
  const currentUser = await getCurrentUserCached();

  const companies = isProfile
    ? await getUserCompanies({ page, limit })
    : await getAllCompanies({ page, limit });
  const rows: Array<Company> = companies?.data ?? [];

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <CompaniesTableHeader
          showRoleBadges={showRoleBadges}
          showActions={showActions}
        />
        <CompaniesTableBody
          rows={rows}
          showActions={showActions}
          currentUser={currentUser}
          showRoleBadges={showRoleBadges}
          backHref={Routes.PROFILE}
        />
      </Table>
      {companies && (
        <TablePagination route={Routes.COMPANIES} data={companies} />
      )}
    </div>
  );
}
