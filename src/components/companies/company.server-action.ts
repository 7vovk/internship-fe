"use server";

import { parseErrorMessage } from "@/lib/errors";
import { Company, CompanyFormData, ServerActionResult } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Routes } from "@/config/site.enums";
import {
  addCompanyAdmin,
  getCompanyAdmins,
  getCompanyById,
  handleCompanyCreate,
  handleCompanyDelete,
  handleCompanyUpdate,
  leaveSpecificCompany,
  removeCompanyAdmin,
  removeCompanyMember,
} from "@/lib/api/companies";
import {
  acceptInvitation,
  cancelInvitation,
  declineInvitation,
  handleCompanyJoinRequest,
} from "@/lib/api/invitations";

export async function createCompanyAction(
  payload: CompanyFormData,
): Promise<ServerActionResult> {
  const t = await getTranslations("Company");
  try {
    await handleCompanyCreate(payload);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: t("created") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantCreate")),
    };
  }
}

export async function updateCompanyAction(
  companyId: string,
  payload: CompanyFormData,
): Promise<ServerActionResult> {
  const t = await getTranslations("Company");
  try {
    await handleCompanyUpdate(companyId, payload);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: t("updated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantUpdate")),
    };
  }
}

export async function deleteCurrentCompanyAction(
  companyId: string,
): Promise<ServerActionResult> {
  const t = await getTranslations("Company");
  try {
    await handleCompanyDelete(companyId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: t("deleted") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantDelete")),
    };
  }
}

export async function getCurrentCompanyAction(
  companyId: string,
): Promise<
  | { ok: true; message: string; company: Company }
  | { ok: false; message: string }
> {
  try {
    const company = await getCompanyById(companyId);
    return { ok: true, message: "", company };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function checkCompanyAccessAction(
  companyId: string,
): Promise<ServerActionResult> {
  try {
    await getCompanyById(companyId);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function leaveCurrentCompanyAction(
  companyId: string,
): Promise<ServerActionResult> {
  const t = await getTranslations("Company");
  try {
    await leaveSpecificCompany(companyId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: t("deleted") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantDelete")),
    };
  }
}

export async function cancelCompanyInvitationAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await cancelInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function acceptCompanyJoinRequestAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await acceptInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function rejectCompanyJoinRequestAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await declineInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function excludeCompanyMemberAction(
  companyId: string,
  memberId: string,
): Promise<ServerActionResult> {
  try {
    await removeCompanyMember(companyId, memberId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function addCompanyAdminAction(
  companyId: string,
  memberId: string,
): Promise<ServerActionResult> {
  try {
    const admins = await getCompanyAdmins(companyId);
    const alreadyAdmin = admins.some((admin) => admin.id === memberId);
    if (alreadyAdmin) {
      return { ok: false, message: "User is already an administrator." };
    }

    await addCompanyAdmin(companyId, memberId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function removeCompanyAdminAction(
  companyId: string,
  memberId: string,
): Promise<ServerActionResult> {
  try {
    const admins = await getCompanyAdmins(companyId);
    const isAdmin = admins.some((admin) => admin.id === memberId);
    if (!isAdmin) {
      return { ok: false, message: "User is not an administrator." };
    }

    await removeCompanyAdmin(companyId, memberId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function createCompanyJoinRequestAction(
  companyId: string,
): Promise<ServerActionResult> {
  try {
    await handleCompanyJoinRequest(companyId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function acceptUserInvitationAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await acceptInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function declineUserInvitationAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await declineInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}

export async function cancelUserJoinRequestAction(
  inviteId: string,
): Promise<ServerActionResult> {
  try {
    await cancelInvitation(inviteId);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.COMPANIES);
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: "" };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error),
    };
  }
}
