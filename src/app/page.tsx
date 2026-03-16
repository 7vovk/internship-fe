import { ConfirmationModal } from "@/app/components";
import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <PageTemplate
      title={siteConfig.pages.home.title}
      description={siteConfig.pages.home.description}
      actions={siteConfig.pages.home.actions}
      extraActions={
        <ConfirmationModal buttonName="Open modal" title="Confirm action?" />
      }
      footerText={`Greeting: ${siteConfig.greeting}`}
    />
  );
}
