import { Badge, TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { CompanyExcludeMember } from "@/components/companies/action-buttons/company-exclude-member";
import { User } from "@/lib/interfaces";
import { getCompanyMembers } from "@/lib/api/companies";
import { NoRecordsRow } from "@/components/shared/no-records-row";

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
        members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="h-14 text-left px-4">
              {member.firstName} {member.lastName}
            </TableCell>
            <TableCell className="h-14 text-left px-4 text-muted-foreground">
              {member.email}
            </TableCell>
            <TableCell className="h-14 text-left px-4">
              <Badge variant="secondary">
                {member.roles.includes("admin") ? "admin" : "member"}
              </Badge>
            </TableCell>
            <TableCell className="h-14 text-left px-4">
              <div className="flex justify-start">
                <CompanyExcludeMember
                  companyId={companyId}
                  memberId={member.id}
                />
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <NoRecordsRow colSpan={4} />
      )}
    </TableBody>
  );
}
