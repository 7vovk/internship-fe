import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui";
import { convertDate } from "@/app/utils/date.utils";
import { CompanyInvitationActions } from "@/components/companies/action-buttons/company-invitation-actions";
import { getTranslations } from "next-intl/server";

interface InvitationTableProps {
  title: string;
  rows: {
    id: string;
    email: string;
    status: string;
    type: string;
    createDate: string;
    updateDate: string;
  }[];
}

export async function InvitationTable({ title, rows }: InvitationTableProps) {
  const t = await getTranslations("General");
  return (
    <section className="rounded-lg border bg-card w-full">
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">Email</TableHead>
            <TableHead className="h-12 px-4 font-medium">Type</TableHead>
            <TableHead className="h-12 px-4 font-medium">Status</TableHead>
            <TableHead className="h-12 px-4 font-medium">Created</TableHead>
            <TableHead className="h-12 px-4 font-medium">Updated</TableHead>
            <TableHead className="h-12 px-4 font-medium">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell className="h-14 px-4">{invite.email}</TableCell>
                <TableCell className="h-14 px-4">{invite.type}</TableCell>
                <TableCell className="h-14 px-4">{invite.status}</TableCell>
                <TableCell className="h-14 px-4">
                  {convertDate(invite.createDate, "dd/mm/yyyy, HH:MM:ss")}
                </TableCell>
                <TableCell className="h-14 px-4">
                  {convertDate(invite.updateDate, "dd/mm/yyyy, HH:MM:ss")}
                </TableCell>
                <TableCell className="h-14 px-4">
                  <CompanyInvitationActions
                    inviteId={invite.id}
                    type={invite.type}
                    status={invite.status}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-20 px-4 text-center text-muted-foreground hover:bg-transparent"
              >
                {t("noRecords")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
