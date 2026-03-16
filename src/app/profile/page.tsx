import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site";

export default function UserProfile() {
  return (
    <PageTemplate
      title={siteConfig.pages.profile.title}
      description={siteConfig.pages.profile.description}
    />
  );
}
