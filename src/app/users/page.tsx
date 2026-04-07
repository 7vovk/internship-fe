import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";

export default function Users() {
  const users = useTranslations(siteConfig.pages.users.translation);

  return <PageTemplate translator={users} />;
}
