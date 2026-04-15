import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { getUserById } from "@/lib/api/users";
import { ItemTemplate } from "@/components/shared/item-template";
import { parseUserData } from "@/lib/users/parse-user-data";
import { BackButton } from "@/components/shared/ui/back-button";
import { cn } from "@/lib/utils";
import { User } from "@/lib/interfaces";
import { resolveBackHref } from "@/app/utils/route.utils";
import { Routes } from "@/config/site.enums";

export default async function UserPage({
  params,
  searchParams,
}: {
  params?: Promise<{ userId: string }>;
  searchParams?: Promise<{ back?: string }>;
}) {
  const userId = (await params)!.userId;
  const resolvedSearchParams = await searchParams;
  const tUser = await getTranslations(siteConfig.pages.user.translation);
  const selectedUser: User = await getUserById(userId);
  const tResponse = await getTranslations("General");
  const backHref = resolveBackHref(Routes.USERS, resolvedSearchParams?.back);

  const userDataMap = parseUserData(selectedUser, tResponse);

  return (
    <PageTemplate
      translator={tUser}
      title={tUser("title", { email: selectedUser.email })}
    >
      <div className={cn("flex justify-start")}>
        <BackButton href={backHref} />
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
