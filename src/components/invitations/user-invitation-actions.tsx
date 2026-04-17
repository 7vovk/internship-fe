"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster } from "@/app/utils";
import { InvitationType } from "@/lib/enums/invitation.enums";
import { useRouter } from "next/navigation";
import {
  acceptUserInvitationAction,
  cancelUserJoinRequestAction,
  declineUserInvitationAction,
} from "@/components/companies/company.server-action";
import { useTranslations } from "next-intl";

type UserInvitationActionsProps = {
  inviteId: string;
  type: string;
  status: string;
};

function isPending(status: string) {
  return status.trim().toLowerCase() === "pending";
}

export function UserInvitationActions({
  inviteId,
  type,
  status,
}: UserInvitationActionsProps) {
  const router = useRouter();
  const t = useTranslations("Company");
  const pending = isPending(status);
  const isOwnerInvite = type === InvitationType.OWNER_INVITE;
  const isUserRequest = type === InvitationType.USER_REQUEST;

  async function handleAcceptInvite() {
    const accepted = await acceptUserInvitationAction(inviteId);
    if (!accepted.ok) {
      errorToaster(accepted.message);
    }
    router.refresh();
  }

  async function handleDeclineInvite() {
    const declined = await declineUserInvitationAction(inviteId);
    if (!declined.ok) {
      errorToaster(declined.message);
    }
    router.refresh();
  }

  async function handleCancelRequest() {
    const cancelled = await cancelUserJoinRequestAction(inviteId);
    if (!cancelled.ok) {
      errorToaster(cancelled.message);
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {isOwnerInvite && (
        <>
          <ConfirmationModal
            buttonName="acceptInvite"
            isDisabled={!pending}
            btnClasses="hover:bg-green-600 hover:text-white"
            btnOkClasses="text-black bg-green-300 hover:bg-green-500 hover:text-white"
            title="confirmAction"
            description={t("acceptInvite")}
            icon="check"
            onConfirm={handleAcceptInvite}
          />
          <ConfirmationModal
            buttonName="declineInvite"
            isDisabled={!pending}
            btnClasses="hover:bg-red-500 hover:text-white"
            btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
            title="sure"
            description={t("declineInvite")}
            icon="alert"
            onConfirm={handleDeclineInvite}
          />
        </>
      )}
      {isUserRequest && (
        <ConfirmationModal
          buttonName="cancelRequest"
          isDisabled={!pending}
          btnClasses="hover:bg-red-500 hover:text-white"
          btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
          title="sure"
          description={t("cancelRequest")}
          icon="alert"
          onConfirm={handleCancelRequest}
        />
      )}
    </div>
  );
}
