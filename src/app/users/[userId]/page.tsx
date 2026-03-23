import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";

export default async function User({
  params,
}: {
  params?: Promise<{ userId: string }>;
}) {
  const userId = (await params)!.userId;
  const user = await getTranslations(siteConfig.pages.user.translation);

  return (
    <PageTemplate
      title={`${user("title")} ${userId}`}
      description={user("description")}
      extraActions={
        <ConfirmationModal
          buttonName={"modal_btn"}
          description={`${user("modal_description")} ${userId}`}
        />
      }
    />
  );
}
