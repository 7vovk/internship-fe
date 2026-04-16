"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster } from "@/app/utils";
import { InvitationType } from "@/lib/enums/invitation.enums";
import { useRouter } from "next/navigation";
import {
  acceptCompanyJoinRequestAction,
  cancelCompanyInvitationAction,
  rejectCompanyJoinRequestAction,
} from "@/components/companies/company.server-action";
import { useTranslations } from "next-intl";

type CompanyInvitationActionsProps = {
  inviteId: string;
  type: string;
  status: string;
};

function isPending(status: string) {
  return status.trim().toLowerCase() === "pending";
}

export function CompanyInvitationActions({
  inviteId,
  type,
  status,
}: CompanyInvitationActionsProps) {
  const router = useRouter();
  const t = useTranslations("Company");
  const pending = isPending(status);
  const isOwnerInvite = type === InvitationType.OWNER_INVITE;
  const isUserRequest = type === InvitationType.USER_REQUEST;

  async function handleCancelInvite() {
    const cancelled = await cancelCompanyInvitationAction(inviteId);
    if (!cancelled.ok) {
      errorToaster(cancelled.message);
      return false;
    }
    router.refresh();
    return true;
  }

  async function handleAcceptRequest() {
    const accepted = await acceptCompanyJoinRequestAction(inviteId);
    if (!accepted.ok) {
      errorToaster(accepted.message);
      return false;
    }
    router.refresh();
    return true;
  }

  async function handleRejectRequest() {
    const rejected = await rejectCompanyJoinRequestAction(inviteId);
    if (!rejected.ok) {
      errorToaster(rejected.message);
      return false;
    }
    router.refresh();
    return true;
  }

  return (
    <div className="flex items-center gap-2">
      {isOwnerInvite && (
        <ConfirmationModal
          buttonName="cancelInvite"
          isDisabled={!pending}
          btnClasses="hover:bg-red-500 hover:text-white"
          btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
          title="sure"
          description={t("cancelInvite")}
          icon="alert"
          onConfirm={handleCancelInvite}
        />
      )}
      {isUserRequest && (
        <>
          <ConfirmationModal
            buttonName="acceptRequest"
            isDisabled={!pending}
            btnClasses="hover:bg-green-600 hover:text-white"
            btnOkClasses="text-black bg-green-300 hover:bg-green-500 hover:text-white"
            title="confirmAction"
            description={t("acceptRequest")}
            icon="check"
            onConfirm={handleAcceptRequest}
          />
          <ConfirmationModal
            buttonName="rejectRequest"
            isDisabled={!pending}
            btnClasses="hover:bg-red-500 hover:text-white"
            btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
            title="sure"
            description={t("rejectRequest")}
            icon="alert"
            onConfirm={handleRejectRequest}
          />
        </>
      )}
    </div>
  );
}
