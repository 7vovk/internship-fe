import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { useTranslations } from "next-intl";
import UsersTable from "@/components/users-table";

export default function UsersPage() {
  const tUsers = useTranslations(siteConfig.pages.users.translation);

  return <PageTemplate translator={tUsers} extraActions={<UsersTable />} />;
}
