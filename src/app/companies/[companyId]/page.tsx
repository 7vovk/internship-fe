import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";

export default async function Company({
  params,
}: {
  params?: Promise<{ companyId: string }>;
}) {
  const companyId = (await params)!.companyId;
  const company = await getTranslations(siteConfig.pages.company.translation);

  return (
    <PageTemplate
      translator={company}
      title={`${company("title")} ${companyId}`}
    />
  );
}
