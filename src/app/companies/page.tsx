import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import CompaniesTable from "@/components/companies/table/companies-table";
import { CompanyDataModal } from "@/components/companies/company-data-modal";
import { parsePaginationParams } from "@/app/utils/pagination.utils";

type CompaniesPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const tCompanies = await getTranslations(
    siteConfig.pages.companies.translation,
  );
  const resolvedSearchParams = await searchParams;
  const { page, limit } = parsePaginationParams(resolvedSearchParams);

  return (
    <PageTemplate translator={tCompanies}>
      <CompanyDataModal />
      <CompaniesTable page={page} limit={limit} />
    </PageTemplate>
  );
}
