import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { getCurrentCompanyAction } from "@/components/companies/company.server-action";
import { redirect } from "next/navigation";
import { cn, getCurrentUserCached } from "@/lib/utils";
import { BackButton } from "@/components/shared/ui";
import { ItemTemplate } from "@/components/shared/item-template";
import { parseCompanyData } from "@/lib/companies/parse-company-data";
import { Routes } from "@/config/site.enums";
import { resolveBackHref } from "@/app/utils/route.utils";
import { GetCompanyActions } from "@/components/companies/company-action-buttons";

export default async function CompanyPage({
  params,
  searchParams,
}: {
  params?: Promise<{ companyId: string }>;
  searchParams?: Promise<{ back?: string }>;
}) {
  const companyId = (await params)!.companyId;
  const resolvedSearchParams = await searchParams;
  const tCompany = await getTranslations(siteConfig.pages.company.translation);
  const companyResult = await getCurrentCompanyAction(companyId);
  const backHref = resolveBackHref(
    Routes.COMPANIES,
    resolvedSearchParams?.back,
  );

  if (!companyResult.ok) {
    redirect(Routes.COMPANIES);
  }

  const selectedCompany = companyResult.company;
  const tResponse = await getTranslations("General");
  const currentUser = await getCurrentUserCached();
  const membershipCompanyIds = new Set([
    ...(currentUser?.invitedTo?.map((company) => company.id) ?? []),
    ...(currentUser?.companyAdministration?.map((company) => company.id) ?? []),
  ]);
  const detailsActions =
    selectedCompany.ownerId === currentUser?.id
      ? { all: true }
      : membershipCompanyIds.has(selectedCompany.id)
        ? { leave: true }
        : {};
  const companyDataMap = parseCompanyData(
    selectedCompany,
    currentUser,
    tResponse,
  );

  return (
    <PageTemplate
      translator={tCompany}
      title={tCompany("title", { name: selectedCompany.name })}
    >
      <div className={cn("flex justify-start")}>
        <BackButton href={backHref} />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companyDataMap.map((field) => {
          return (
            <ItemTemplate
              key={field.key}
              title={field.key}
              description={field.value}
            />
          );
        })}
      </ul>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <GetCompanyActions
          display={detailsActions}
          company={selectedCompany}
          variant="panel"
          wrapperClassName="justify-end sm:col-start-2 lg:col-start-3 xl:col-start-4"
        />
      </div>
    </PageTemplate>
  );
}
