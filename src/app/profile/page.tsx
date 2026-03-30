import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";

export default function UserProfile() {
  const profile = useTranslations(siteConfig.pages.profile.translation);

  return (
    <PageTemplate
      title={profile("title")}
      description={profile("description")}
    />
  );
}
