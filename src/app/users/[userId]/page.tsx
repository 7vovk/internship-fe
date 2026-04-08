import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";

export default async function UserPage({
  params,
}: {
  params?: Promise<{ userId: string }>;
}) {
  const userId = (await params)!.userId;
  const tUser = await getTranslations(siteConfig.pages.user.translation);

  return (
    <PageTemplate
      translator={tUser}
      title={`${tUser("title")} ${userId}`}
      extraActions={
        <ConfirmationModal
          buttonName={"open_modal"}
          description={`${tUser("modal_description")} ${userId}`}
        />
      }
    />
  );
}
