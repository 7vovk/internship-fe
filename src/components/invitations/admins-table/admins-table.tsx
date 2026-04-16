import { Table } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { AdminsTableHeader } from "@/components/invitations/admins-table/admins-table-header";
import { AdminsTableBody } from "@/components/invitations/admins-table/admins-table-body";

type AdminsTableProps = {
  companyId: string;
  ownerId: string;
};

export async function AdminsTable({ companyId, ownerId }: AdminsTableProps) {
  const t = await getTranslations("General");

  return (
    <section className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h2 className="text-center text-base font-semibold">{t("admins")}</h2>
      </div>
      <Table className="table-fixed">
        <AdminsTableHeader />
        <AdminsTableBody companyId={companyId} ownerId={ownerId} />
      </Table>
    </section>
  );
}
