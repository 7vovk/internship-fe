import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <PageTemplate
      title={siteConfig.pages.about.title}
      description={siteConfig.pages.about.description}
    />
  );
}
