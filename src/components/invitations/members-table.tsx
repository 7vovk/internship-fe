import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui";
import { CompanyExcludeMember } from "@/components/companies/action-buttons/company-exclude-member";
import { getTranslations } from "next-intl/server";
import { getCompanyMembers } from "@/lib/api/companies";
import { User } from "@/lib/interfaces";

interface MembersTableProps {
  companyId: string;
  ownerId: string;
}

export async function MembersTable({ companyId, ownerId }: MembersTableProps) {
  const companyMembers: User[] = await getCompanyMembers(companyId);
  const members: User[] = companyMembers.filter(
    (member) => member.id !== ownerId,
  );
  const t = await getTranslations("General");
  return (
    <section className="rounded-lg border bg-card w-full">
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">{t("members")}</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">Name</TableHead>
            <TableHead className="h-12 px-4 font-medium">Email</TableHead>
            <TableHead className="h-12 px-4 font-medium">Role</TableHead>
            <TableHead className="h-12 px-4 font-medium">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="h-14 px-4">
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell className="h-14 px-4">{member.email}</TableCell>
                <TableCell className="h-14 px-4">
                  <Badge variant="secondary">
                    {member.roles.includes("admin") ? "admin" : "member"}
                  </Badge>
                </TableCell>
                <TableCell className="h-14 px-4">
                  <CompanyExcludeMember
                    companyId={companyId}
                    memberId={member.id}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
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
