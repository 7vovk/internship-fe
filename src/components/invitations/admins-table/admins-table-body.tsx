import { Badge, TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { CompanyAdminRole } from "@/components/companies/action-buttons/company-admin-role";
import { AdminRoleMode } from "@/lib/enums/action-buttons.enums";
import { NoRecordsRow } from "@/components/shared/no-records-row";
import { User } from "@/lib/interfaces";
import { getCompanyAdmins } from "@/lib/api/companies";
import { Roles } from "@/lib/enums/profile.enums";

type AdminsTableBodyProps = {
  companyId: string;
  ownerId: string;
};

export async function AdminsTableBody({
  companyId,
  ownerId,
}: AdminsTableBodyProps) {
  const companyAdmins: User[] = await getCompanyAdmins(companyId);
  const admins: User[] = companyAdmins.filter((admin) => admin.id !== ownerId);

  return (
    <TableBody>
      {admins.length > 0 ? (
        admins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell className="h-14 px-4 text-start">
              {admin.firstName} {admin.lastName}
            </TableCell>
            <TableCell className="h-14 px-4 text-start text-muted-foreground">
              {admin.email}
            </TableCell>
            <TableCell className="h-14 px-4 text-start">
              <Badge variant="secondary">{Roles.ADMIN}</Badge>
            </TableCell>
            <TableCell className="h-14 px-4 text-start">
              <div className="flex justify-start">
                <CompanyAdminRole
                  isAdmin
                  companyId={companyId}
                  memberId={admin.id}
                  mode={AdminRoleMode.REMOVE}
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
