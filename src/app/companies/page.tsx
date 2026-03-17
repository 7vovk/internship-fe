import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";

export default function Companies() {
  return (
    <PageTemplate
      title={siteConfig.pages.companies.title}
      description={siteConfig.pages.companies.description}
    />
  );
}
