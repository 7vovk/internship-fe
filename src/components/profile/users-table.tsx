import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/ui";
import { getAllUsers } from "@/lib/api/users";
import { PaginationData, User } from "@/lib/interfaces";
import { Routes } from "@/config/site.enums";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import TablePagination from "../shared/table-pagination";
import { NoRecordsRow } from "@/components/shared/no-records-row";

type UsersTableProps = {
  page?: number;
  limit?: number;
};

export default async function UsersTable({
  page = 1,
  limit = 10,
}: UsersTableProps) {
  const users: PaginationData<User[]> = await getAllUsers({ page, limit });
  const tUser = await getTranslations(siteConfig.pages.user.translation);
  const tProfile = await getTranslations(siteConfig.pages.profile.translation);
  const backHref = encodeURIComponent(
    `${Routes.USERS}?page=${page}&limit=${limit}`,
  );

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">
              {tUser("user")}
            </TableHead>
            <TableHead className="h-12 px-4 font-medium">
              {tUser("email")}
            </TableHead>
            <TableHead className="h-12 px-4 font-medium">
              {tUser("roles")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.length > 0 ? (
            users.data.map((person) => (
              <TableRow
                key={person.id}
                className="group relative cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="h-14 px-4 font-medium">
                  <Link
                    href={`${Routes.USERS}/${person.id}?back=${backHref}`}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={tProfile("open", {
                      firstName: person.firstName,
                      lastName: person.lastName,
                    })}
                  />
                  <div className="relative z-0 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage alt={person.firstName} />
                      <AvatarFallback
                        firstName={person.firstName}
                        lastName={person.lastName}
                      />
                    </Avatar>
                    <span>
                      {person.firstName} {person.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-left h-14 px-4 text-sm text-muted-foreground">
                  {person.email}
                </TableCell>
                <TableCell className="h-14 px-4">
                  <div className="flex flex-wrap gap-1">
                    {person.roles?.length ? (
                      person.roles.map((role) => (
                        <Badge key={person.id} variant="secondary">
                          {role}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">{tUser("noRole")}</Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoRecordsRow colSpan={3} />
          )}
        </TableBody>
      </Table>
      {users.data.length > 0 && (
        <TablePagination route={Routes.USERS} data={users} />
      )}
    </div>
  );
}
