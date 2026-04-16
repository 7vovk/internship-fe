import {
  ApiResult,
  Invitation,
  OwnerInvitationFormData,
  PaginationData,
} from "@/lib/interfaces";
import { api, ApiError } from "@/lib/api/client";
import { InvitationType } from "@/lib/enums/invitation.enums";

export async function handleUserInvitation(
  companyId: string,
  body: OwnerInvitationFormData,
): Promise<ApiResult<Invitation>> {
  try {
    return await api.post<ApiResult<Invitation>>(`/invitation/${companyId}`, {
      ...body,
      type: "owner-to-user",
    });
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getAllInvitations(
  companyId: string,
  type: InvitationType,
): Promise<PaginationData<Invitation[]>> {
  try {
    const apiRes = await api.get<ApiResult<PaginationData<Invitation[]>>>(
      `/invitations/${companyId}/invites/${type}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getCurrentUserInvitations(
  type: InvitationType,
): Promise<PaginationData<Invitation[]>> {
  try {
    const apiRes = await api.get<ApiResult<PaginationData<Invitation[]>>>(
      `/invitations/user/${type}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function cancelInvitation(
  inviteId: string,
  reason = "Cancelled by company owner",
): Promise<Invitation> {
  try {
    const apiRes = await api.put<ApiResult<Invitation>>(
      `/invitation/${inviteId}/cancel`,
      { reason },
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function acceptInvitation(inviteId: string): Promise<Invitation> {
  try {
    const apiRes = await api.put<ApiResult<Invitation>>(
      `/invitation/${inviteId}/accept`,
      {},
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function declineInvitation(inviteId: string): Promise<Invitation> {
  try {
    const apiRes = await api.put<ApiResult<Invitation>>(
      `/invitation/${inviteId}/decline`,
      {},
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}
