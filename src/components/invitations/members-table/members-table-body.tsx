import { Badge, TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { CompanyExcludeMember } from "@/components/companies/action-buttons/company-exclude-member";
import { CompanyAdminRole } from "@/components/companies/action-buttons/company-admin-role";
import { User } from "@/lib/interfaces";
import { getCompanyMembers } from "@/lib/api/companies";
import { NoRecordsRow } from "@/components/shared/no-records-row";
import { AdminRoleMode } from "@/lib/enums/action-buttons.enums";
import { Roles } from "@/lib/enums/profile.enums";

interface MembersTableBodyProps {
  companyId: string;
  ownerId: string;
}

export async function MembersTableBody({
  companyId,
  ownerId,
}: MembersTableBodyProps) {
  const companyMembers: User[] = await getCompanyMembers(companyId);
  const members: User[] = companyMembers.filter(
    (member) => member.id !== ownerId,
  );
  return (
    <TableBody>
      {members.length > 0 ? (
        members.map((member) => {
          const isAdmin = member.roles.includes(Roles.ADMIN);
          return (
            <TableRow key={member.id}>
              <TableCell className="h-14 text-left px-4 py-3 whitespace-normal break-words align-top">
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell className="h-14 text-left px-4 py-3 text-muted-foreground whitespace-normal break-words align-top">
                {member.email}
              </TableCell>
              <TableCell className="h-14 text-left px-4 py-3 align-top">
                <Badge variant="secondary">
                  {isAdmin ? Roles.ADMIN : Roles.MEMBER}
                </Badge>
              </TableCell>
              <TableCell className="h-14 text-left px-4 py-3 align-top">
                <div className="flex justify-start">
                  <div className="flex flex-wrap items-start gap-2">
                    <CompanyAdminRole
                      companyId={companyId}
                      memberId={member.id}
                      isAdmin={isAdmin}
                      mode={AdminRoleMode.APPOINT}
                    />
                    <CompanyExcludeMember
                      companyId={companyId}
                      memberId={member.id}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <NoRecordsRow colSpan={4} />
      )}
    </TableBody>
  );
}
