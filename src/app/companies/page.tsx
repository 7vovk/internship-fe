import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export default function Companies() {
  const companies = useTranslations(siteConfig.pages.companies.translation);

  return (
    <PageTemplate
      title={companies("title")}
      description={companies("description")}
    />
  );
}
