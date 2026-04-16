import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

interface InvitationTableHeaderProps {
  isCompany?: boolean;
}

export async function InvitationTableHeader({
  isCompany,
}: InvitationTableHeaderProps) {
  const t = await getTranslations("General");
  const firstHeaderTitle = isCompany ? "email" : "name";
  const actions = isCompany ? [{ width: "w-[16%]", title: "actions" }] : [];
  const headerData = [
    { width: "w-[22%]", title: firstHeaderTitle },
    { width: "w-[14%]", title: "type" },
    { width: "w-[12%]", title: "status" },
    { width: "w-[18%]", title: "createDate" },
    { width: "w-[18%]", title: "updateDate" },
    ...actions,
  ];

  return (
    <TableHeader>
      <TableRow className="border-b hover:bg-transparent">
        {headerData.map((header) => (
          <TableHead
            key={header.title}
            className={cn("h-12 px-4 text-left font-medium", header.width)}
          >
            {t(header.title)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
