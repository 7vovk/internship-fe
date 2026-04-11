import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { HomeConfirm } from "@/app/components/client/home-confirm";

export default async function HomePage() {
  const tHomePage = await getTranslations(siteConfig.pages.home.translation);

  return (
    <PageTemplate
      title={tHomePage("title")}
      actions={siteConfig.pages.home.actions}
      extraActions={<HomeConfirm />}
      translator={tHomePage}
      footerText={tHomePage(siteConfig.greeting)}
    />
  );
}
