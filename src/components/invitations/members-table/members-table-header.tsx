import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export async function MembersTableHeader() {
  const t = await getTranslations("General");

  const headerData = [
    { width: "w-[30%]", title: "name" },
    { width: "w-[34%]", title: "email" },
    { width: "w-[16%]", title: "roles" },
    { width: "w-[20%]", title: "actions" },
  ];

  return (
    <TableHeader>
      <TableRow className="border-b hover:bg-transparent">
        {headerData.map((header) => (
          <TableHead
            key={header.title}
            className={cn("h-12 px-4 font-medium", header.width)}
          >
            {t(header.title)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
