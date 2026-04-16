import { TableCell, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";

interface NoRecordsRowProps {
  colSpan: number;
}

export async function NoRecordsRow({ colSpan }: NoRecordsRowProps) {
  const t = await getTranslations("General");
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-20 px-4 text-center text-muted-foreground hover:bg-transparent"
      >
        {t("noRecords")}
      </TableCell>
    </TableRow>
  );
}
