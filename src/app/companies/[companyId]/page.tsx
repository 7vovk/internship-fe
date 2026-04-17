import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { getCurrentCompanyAction } from "@/components/companies/company.server-action";
import { redirect } from "next/navigation";
import { getCurrentUserCached } from "@/lib/utils";
import { BackButton } from "@/components/shared/ui";
import { ItemTemplate } from "@/components/shared/item-template";
import { parseCompanyData } from "@/lib/companies/parse-company-data";
import { Routes } from "@/config/site.enums";
import { GetCompanyActions } from "@/components/companies/action-buttons/company-action-buttons";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";
import { getAllInvitations } from "@/lib/api/invitations";
import { InvitationType } from "@/lib/enums/invitation.enums";
import { InvitationTable } from "@/components/invitations/invitation-table/invitation-table";
import { MembersTable } from "@/components/invitations/members-table/members-table";
import { AdminsTable } from "@/components/invitations/admins-table/admins-table";

export default async function CompanyPage({
  params,
}: {
  params?: Promise<{ companyId: string }>;
}) {
  const companyId = (await params)!.companyId;
  const tCompany = await getTranslations(siteConfig.pages.company.translation);
  const companyResult = await getCurrentCompanyAction(companyId);

  if (!companyResult.ok) {
    redirect(Routes.COMPANIES);
  }

  const selectedCompany = companyResult.company;
  const tGeneral = await getTranslations("General");
  const currentUser = await getCurrentUserCached();
  const isOwner = selectedCompany.ownerId === currentUser?.id;
  const [userRequests, companyInvitation] = isOwner
    ? await Promise.all([
        getAllInvitations(companyId, InvitationType.USER_REQUEST),
        getAllInvitations(companyId, InvitationType.OWNER_INVITE),
      ])
    : [null, null];

  const companyDataMap = parseCompanyData(
    selectedCompany,
    currentUser,
    tGeneral,
  );

  return (
    <PageTemplate
      translator={tCompany}
      title={tCompany("title", { name: selectedCompany.name })}
    >
      <div className="flex justify-start">
        <BackButton />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companyDataMap.map((field) => (
          <ItemTemplate
            key={field.key}
            title={field.key}
            description={field.value}
          />
        ))}
      </ul>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <GetCompanyActions
          showActions={[ActionButtons.ALL]}
          company={selectedCompany}
          variant="panel"
          wrapperClassName="justify-end sm:col-start-2 lg:col-start-3 xl:col-start-4"
        />
      </div>
      {isOwner && (
        <div className="grid grid-cols-1 gap-6">
          <InvitationTable
            isCompany
            showActions
            title={tCompany("invitedUsers")}
            rows={companyInvitation?.data || []}
          />
          <InvitationTable
            isCompany
            showActions
            title={tCompany("userRequests")}
            rows={userRequests?.data || []}
          />

          <MembersTable
            companyId={selectedCompany.id}
            ownerId={selectedCompany.ownerId}
          />
          <AdminsTable
            companyId={selectedCompany.id}
            ownerId={selectedCompany.ownerId}
          />
        </div>
      )}
    </PageTemplate>
  );
}
