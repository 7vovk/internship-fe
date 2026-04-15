import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import ProfileEdit from "@/components/profile/profile-edit";
import { getTranslations } from "next-intl/server";
import { ItemTemplate } from "@/components/shared/item-template";
import { getCurrentUserCached } from "@/lib/utils";
import { parseUserData } from "@/lib/users/parse-user-data";
import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { auth0 } from "@/lib/auth0";
import CompaniesTable from "@/components/companies/table/companies-table";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";

export default async function UserProfilePage() {
  const tProfile = await getTranslations(siteConfig.pages.profile.translation);
  const tGeneral = await getTranslations("General");
  const requestHeaders = await headers();
  const isJwtAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";
  const session = await auth0.getSession();
  const authType = session?.user && !isJwtAuthenticated ? "auth0" : "jwt";
  const currentUser = await getCurrentUserCached();
  const userDataMap = parseUserData(currentUser, tGeneral);

  return (
    <PageTemplate translator={tProfile}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userDataMap.map((field) => {
          return (
            <ItemTemplate
              key={field.key}
              title={field.key}
              description={field.value}
            />
          );
        })}
        <div className="xl:col-start-4">
          <ProfileEdit authType={authType} currentUser={currentUser} />
        </div>
      </ul>
      <CompaniesTable showActions={[ActionButtons.INVITE]} isProfile />
    </PageTemplate>
  );
}
