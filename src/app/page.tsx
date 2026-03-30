import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { HomeConfirm } from "@/app/components/client";

export default async function Home() {
  const homePage = await getTranslations(siteConfig.pages.home.translation);

  return (
    <PageTemplate
      title={homePage("title")}
      description={homePage("description")}
      actions={siteConfig.pages.home.actions}
      extraActions={<HomeConfirm />}
      translator={homePage}
      footerText={homePage(siteConfig.greeting)}
    />
  );
}
