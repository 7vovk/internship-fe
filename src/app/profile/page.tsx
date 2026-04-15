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
import { ProfileCompanyData, User } from "@/lib/interfaces";

function buildProfileCompaniesData(
  currentUser: User | null,
): ProfileCompanyData[] {
  if (!currentUser) {
    return [];
  }

  const companyMap = new Map<string, ProfileCompanyData>();

  const upsertCompany = (
    company: Omit<ProfileCompanyData, "roles">,
    role: "owner" | "admin" | "user",
  ) => {
    const existing = companyMap.get(company.id);

    if (existing) {
      if (!existing.roles.includes(role)) {
        existing.roles.push(role);
      }
      return;
    }

    companyMap.set(company.id, {
      ...company,
      roles: [role],
    });
  };

  for (const company of currentUser.companies ?? []) {
    upsertCompany(company, "owner");
  }

  for (const company of currentUser.invitedTo ?? []) {
    upsertCompany(company, "user");
  }

  for (const company of currentUser.companyAdministration ?? []) {
    upsertCompany(company, "admin");
  }

  return Array.from(companyMap.values());
}

export default async function UserProfilePage() {
  const tProfile = await getTranslations(siteConfig.pages.profile.translation);
  const tResponse = await getTranslations("General");
  const requestHeaders = await headers();
  const isJwtAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";
  const session = await auth0.getSession();
  const authType = session?.user && !isJwtAuthenticated ? "auth0" : "jwt";
  const currentUser = await getCurrentUserCached();
  const profileCompaniesData = buildProfileCompaniesData(currentUser);

  const userDataMap = parseUserData(currentUser, tResponse);

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
      {profileCompaniesData.length > 0 && (
        <CompaniesTable
          isLeaveDisplayed
          showRoleBadges
          profileCompanies={profileCompaniesData}
        />
      )}
    </PageTemplate>
  );
}
