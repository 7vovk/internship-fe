import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/lib/api/users";
import { User, Pagination } from "@/lib/api/interfaces";
import { Routes } from "@/config/site.enums";

export default async function UsersTable() {
  const users: Pagination<User[]> = await getAllUsers();

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">User</TableHead>
            <TableHead className="h-12 px-4 font-medium">Email</TableHead>
            <TableHead className="h-12 px-4 font-medium">Roles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.length > 0 ? (
            users.data.map((person) => (
              <TableRow
                key={person.email}
                className="group relative cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="relative h-14 px-4 font-medium">
                  <Link
                    href={`${Routes.USERS}/${person.id}`}
                    className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Open ${person.firstName} ${person.lastName}`}
                  />
                  <div className="relative z-0 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage alt={person.firstName} />
                      <AvatarFallback>
                        {person.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {person.firstName} {person.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="h-14 px-4 text-sm text-muted-foreground">
                  {person.email}
                </TableCell>
                <TableCell className="h-14 px-4">
                  <div className="flex flex-wrap gap-1">
                    {person.roles?.length ? (
                      person.roles.map((role) => (
                        <Badge key={`${person.id}-${role}`} variant="secondary">
                          {role}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">No role</Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="h-24 text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
