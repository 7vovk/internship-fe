import CompaniesTable from "@/components/companies/table/companies-table";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";
import { InvitationTable } from "@/components/invitations/invitation-table/invitation-table";
import { getCurrentUserInvitations } from "@/lib/api/invitations";
import { InvitationType } from "@/lib/enums/invitation.enums";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";

export default async function TablesWrapper() {
  const t = await getTranslations(siteConfig.pages.profile.translation);
  const [userRequests, ownerInvitations] = await Promise.all([
    getCurrentUserInvitations(InvitationType.USER_REQUEST),
    getCurrentUserInvitations(InvitationType.OWNER_INVITE),
  ]);

  return (
    <>
      <CompaniesTable showActions={[ActionButtons.LEAVE]} isProfile />
      <div className="grid grid-cols-1 gap-6 mt-6">
        <InvitationTable
          title={t("userRequests")}
          rows={userRequests?.data ?? []}
          isCompany={false}
          showActions
        />
        <InvitationTable
          title={t("invitedUsers")}
          rows={ownerInvitations?.data ?? []}
          isCompany={false}
          showActions
        />
      </div>
    </>
  );
}
