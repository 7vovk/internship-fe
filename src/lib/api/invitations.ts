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
