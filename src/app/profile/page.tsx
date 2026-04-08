import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";

export default function UserProfilePage() {
  const tProfile = useTranslations(siteConfig.pages.profile.translation);

  return <PageTemplate translator={tProfile} />;
}
