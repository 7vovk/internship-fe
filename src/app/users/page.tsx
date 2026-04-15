import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import UsersTable from "@/components/profile/users-table";
import { parsePaginationParams } from "@/app/utils/pagination.utils";

type UsersPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const tUsers = await getTranslations(siteConfig.pages.users.translation);
  const resolvedSearchParams = await searchParams;
  const { page, limit } = parsePaginationParams(resolvedSearchParams);

  return (
    <PageTemplate translator={tUsers}>
      <UsersTable page={page} limit={limit} />
    </PageTemplate>
  );
}
