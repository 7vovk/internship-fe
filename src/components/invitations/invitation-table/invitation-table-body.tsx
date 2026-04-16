import { TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { convertDate } from "@/app/utils/date.utils";
import { CompanyInvitationActions } from "@/components/companies/action-buttons/company-invitation-actions";
import { InvTableRow } from "@/lib/interfaces";
import { NoRecordsRow } from "@/components/shared/no-records-row";
import { UserInvitationActions } from "@/components/invitations/user-invitation-actions";

interface InvitationTableBodyProps {
  isCompany?: boolean;
  showActions?: boolean;
  rows: InvTableRow[];
}

export async function InvitationTableBody({
  isCompany,
  showActions = false,
  rows,
}: InvitationTableBodyProps) {
  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map((invite) => {
          const emailCell = isCompany
            ? [invite.email]
            : [invite.companyName ?? invite.email];
          const repeatedCells: string[] = [
            ...emailCell,
            invite.type,
            invite.status,
            convertDate(invite.createDate, "dd/mm/yyyy, HH:MM:ss"),
            convertDate(invite.updateDate, "dd/mm/yyyy, HH:MM:ss"),
          ];

          return (
            <TableRow key={invite.id}>
              {repeatedCells.map((cell, i) => (
                <TableCell
                  key={i}
                  className="h-14 px-4 text-start text-muted-foreground"
                >
                  {cell}
                </TableCell>
              ))}

              {showActions && (
                <TableCell className="h-14 px-4 text-muted-foreground">
                  <div className="flex justify-start">
                    {isCompany ? (
                      <CompanyInvitationActions
                        inviteId={invite.id}
                        type={invite.type}
                        status={invite.status}
                      />
                    ) : (
                      <UserInvitationActions
                        inviteId={invite.id}
                        type={invite.type}
                        status={invite.status}
                      />
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          );
        })
      ) : (
        <NoRecordsRow colSpan={showActions ? 6 : 5} />
      )}
    </TableBody>
  );
}
