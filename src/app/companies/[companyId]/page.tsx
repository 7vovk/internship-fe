import { PageTemplate } from "@/components/shared/page-template";

export default async function Company({
  params,
}: {
  params?: Promise<{ companyId: string }>;
}) {
  const companyId = (await params)!.companyId;

  return (
    <PageTemplate
      title={`Company ID: ${companyId}`}
      description="This dynamic route also reuses the same shared page template."
    />
  );
}
