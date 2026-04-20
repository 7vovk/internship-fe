import { Table } from "../../shared/ui";
import { Company } from "@/lib/interfaces";
import { Routes } from "@/config/site.enums";
import TablePagination from "../../shared/table-pagination";
import { getAllCompanies, getUserCompanies } from "@/lib/api/companies";
import { getCurrentUserCached } from "@/lib/utils";
import { CompaniesTableHeader } from "@/components/companies/table/companies-table-header";
import { CompaniesTableBody } from "@/components/companies/table/companies-table-body";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";
import { getTranslations } from "next-intl/server";

type CompaniesTableProps = Partial<{
  page: number;
  limit: number;
  isProfile: boolean;
  showActions: ActionButtons[];
}>;

export default async function CompaniesTable({
  page = 1,
  limit = 10,
  isProfile = false,
  showActions,
}: CompaniesTableProps) {
  const currentUser = await getCurrentUserCached();
  const t = await getTranslations("Companies");

  const companies = isProfile
    ? await getUserCompanies({ page, limit })
    : await getAllCompanies({ page, limit });
  const rows: Array<Company> = companies?.data ?? [];

  return (
    <div className="rounded-lg border bg-card w-full">
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">{t("userCompanies")}</h2>
      </div>
      <Table>
        <CompaniesTableHeader showActions={showActions} />
        <CompaniesTableBody
          rows={rows}
          showActions={showActions}
          currentUser={currentUser}
        />
      </Table>
      {rows.length > 0 && (
        <TablePagination route={Routes.COMPANIES} data={companies} />
      )}
    </div>
  );
}
