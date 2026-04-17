import { Table } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { MembersTableHeader } from "@/components/invitations/members-table/members-table-header";
import { MembersTableBody } from "@/components/invitations/members-table/members-table-body";

interface MembersTableProps {
  companyId: string;
  ownerId: string;
}

export async function MembersTable({ companyId, ownerId }: MembersTableProps) {
  const t = await getTranslations("General");
  return (
    <section className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h2 className="text-center text-base font-semibold">{t("members")}</h2>
      </div>
      <Table className="table-fixed">
        <MembersTableHeader />
        <MembersTableBody companyId={companyId} ownerId={ownerId} />
      </Table>
    </section>
  );
}
