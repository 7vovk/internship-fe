import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { TableHeaderData } from "@/lib/interfaces";

export async function AdminsTableHeader() {
  const t = await getTranslations("General");
  const headerData: TableHeaderData[] = [
    { width: "w-[24%]", title: "name" },
    { width: "w-[26%]", title: "email" },
    { width: "w-[14%]", title: "roles" },
    { width: "w-[36%]", title: "actions" },
  ];
  return (
    <TableHeader>
      <TableRow className="border-b hover:bg-transparent">
        {headerData.map((header) => (
          <TableHead
            key={header.title}
            className={cn(
              "h-12 px-4 py-3 font-medium whitespace-normal break-words align-top leading-snug",
              header.width,
            )}
          >
            {t(header.title)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
