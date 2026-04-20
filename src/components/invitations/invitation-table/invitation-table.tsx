import { Table } from "@/components/shared/ui";
import { InvitationTableHeader } from "@/components/invitations/invitation-table/invitation-table-header";
import { InvitationTableBody } from "@/components/invitations/invitation-table/invitation-table-body";
import { InvTableRow } from "@/lib/interfaces";

interface InvitationTableProps {
  title: string;
  rows: InvTableRow[];
  isCompany?: boolean;
  showActions?: boolean;
}

export function InvitationTable({
  title,
  rows,
  isCompany,
  showActions = false,
}: InvitationTableProps) {
  return (
    <section className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h2 className="text-center text-base font-semibold">{title}</h2>
      </div>
      <Table>
        <InvitationTableHeader isCompany={isCompany} showActions={showActions} />
        <InvitationTableBody
          rows={rows}
          isCompany={isCompany}
          showActions={showActions}
        />
      </Table>
    </section>
  );
}
