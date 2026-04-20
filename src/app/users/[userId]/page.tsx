import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { getUserById } from "@/lib/api/users";
import { ItemTemplate } from "@/components/shared/item-template";
import { parseUserData } from "@/lib/users/parse-user-data";
import { BackButton } from "@/components/shared/ui/back-button";
import { User } from "@/lib/interfaces";

export default async function UserPage({
  params,
}: {
  params?: Promise<{ userId: string }>;
}) {
  const userId = (await params)!.userId;
  const tUser = await getTranslations(siteConfig.pages.user.translation);
  const selectedUser: User = await getUserById(userId);
  const tGeneral = await getTranslations("General");

  const userDataMap = parseUserData(selectedUser, tGeneral);

  return (
    <PageTemplate
      translator={tUser}
      title={tUser("title", { email: selectedUser.email })}
    >
      <div className="flex justify-start">
        <BackButton />
      </div>
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
      </ul>
    </PageTemplate>
  );
}
