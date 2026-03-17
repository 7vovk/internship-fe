import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";

export default function Users() {
  return (
    <PageTemplate
      title={siteConfig.pages.users.title}
      description={siteConfig.pages.users.description}
    />
  );
}
