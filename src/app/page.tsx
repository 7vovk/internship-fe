import { ConfirmationModal } from "@/app/components";
import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

export default function Home() {
  const homePage = useTranslations(siteConfig.pages.home.translation);

  return (
    <PageTemplate
      title={homePage("title")}
      description={homePage("description")}
      actions={siteConfig.pages.home.actions}
      extraActions={
        <ConfirmationModal buttonName="open_modal" title="Confirm action?" />
      }
      translator={homePage}
      footerText={homePage(siteConfig.greeting)}
    />
  );
}
