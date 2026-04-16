import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";

type CompaniesTableHeaderProps = {
  showActions?: ActionButtons[];
};

export async function CompaniesTableHeader({
  showActions,
}: CompaniesTableHeaderProps) {
  const tCompanies = await getTranslations(
    siteConfig.pages.companies.translation,
  );
  const tGeneral = await getTranslations("General");
  const headerCompaniesData: string[] = [
    "name",
    "fieldDescription",
    "website",
    "address",
    "phone",
  ];
  const headerGeneralData: string[] = ["createDate", "updateDate"];

  return (
    <TableHeader>
      <TableRow className="border-b hover:bg-transparent">
        {headerCompaniesData.map((name) => (
          <TableHead key={name} className="h-12 px-4 font-medium">
            {tCompanies(name)}
          </TableHead>
        ))}
        {headerGeneralData.map((name) => (
          <TableHead key={name} className="h-12 px-4 font-medium">
            {tGeneral(name)}
          </TableHead>
        ))}
        {!!showActions?.length && (
          <TableHead className="h-12 px-4 text-center font-medium">
            {tGeneral("actions")}
          </TableHead>
        )}
      </TableRow>
    </TableHeader>
  );
}
