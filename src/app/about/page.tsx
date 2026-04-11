import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const tAbout = useTranslations(siteConfig.pages.about.translation);
  return <PageTemplate translator={tAbout} />;
}
