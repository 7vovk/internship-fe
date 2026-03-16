import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { PageTemplate } from "@/components/shared/page-template";

export default async function User({
  params,
}: {
  params?: Promise<{ userId: string }>;
}) {
  const userId = (await params)!.userId;

  return (
    <PageTemplate
      title={`User ID: ${userId}`}
      description="Dynamic user pages now share the same layout and can still inject custom actions."
      extraActions={
        <ConfirmationModal
          buttonName="Open modal"
          description={`Some detailed information about the current user - ${userId}`}
        />
      }
    />
  );
}
