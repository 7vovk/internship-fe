import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import UsersTable from "@/components/profile/users-table";

type UsersPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const tUsers = await getTranslations(siteConfig.pages.users.translation);
  const resolvedSearchParams = await searchParams;

  const rawPage = Number(resolvedSearchParams?.page ?? "1");
  const rawLimit = Number(resolvedSearchParams?.limit ?? "10");

  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const limit =
    Number.isFinite(rawLimit) && [10, 25, 50].includes(rawLimit)
      ? Math.floor(rawLimit)
      : 10;

  return (
    <PageTemplate translator={tUsers}>
      <UsersTable page={page} limit={limit} />
    </PageTemplate>
  );
}
