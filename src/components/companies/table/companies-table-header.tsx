import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";

type CompaniesTableHeaderProps = {
  showRoleBadges: boolean;
};

export async function CompaniesTableHeader({
  showRoleBadges,
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
  const badgesData: string[] = showRoleBadges ? ["roles"] : [];
  const headerGeneralData: string[] = [
    "createDate",
    "updateDate",
    "actions",
    ...badgesData,
  ];

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
      </TableRow>
    </TableHeader>
  );
}
