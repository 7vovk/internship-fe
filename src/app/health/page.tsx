import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { checkHealth } from "@/lib/api/health-check";
import { getTranslations } from "next-intl/server";

export default async function HealthPage() {
  const tHealth = await getTranslations(siteConfig.pages.health.translation);
  const healthCheck = await checkHealth();
  const response = JSON.stringify(healthCheck);
  const isSuccess = healthCheck.statusCode === 200;

  return (
    <PageTemplate translator={tHealth}>
      <h3 className={isSuccess ? "text-success" : "text-destructive"}>
        {response}
      </h3>
    </PageTemplate>
  );
}
