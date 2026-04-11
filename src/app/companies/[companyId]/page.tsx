import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";

export default async function CompanyPage({
  params,
}: {
  params?: Promise<{ companyId: string }>;
}) {
  const companyId = (await params)!.companyId;
  const tCompany = await getTranslations(siteConfig.pages.company.translation);

  return (
    <PageTemplate
      translator={tCompany}
      title={`${tCompany("title")} ${companyId}`}
    />
  );
}
