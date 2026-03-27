import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";

export default function About() {
  const about = useTranslations(siteConfig.pages.about.translation);
  return <PageTemplate translator={about} />;
}
