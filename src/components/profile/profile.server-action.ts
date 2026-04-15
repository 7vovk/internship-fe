"use server";

import {
  handleCurrentUserDelete,
  handleCurrentUserUpdate,
  handleUserPictureUpdate,
} from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { ServerActionResult, UserUpdatePayload } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Routes } from "@/config/site.enums";

export async function updateCurrentUserAction(
  payload: UserUpdatePayload,
): Promise<ServerActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleCurrentUserUpdate(payload);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: t("accUpdated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantUpdateAcc")),
    };
  }
}

export async function updateCurrentUserImageAction(
  payload: FormData,
): Promise<ServerActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleUserPictureUpdate(payload);
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: t("imageUpdated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantUpdateImage")),
    };
  }
}

export async function deleteCurrentUserAction(): Promise<ServerActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleCurrentUserDelete();
    revalidatePath(Routes.HOME, "layout");
    revalidatePath(Routes.PROFILE);
    return { ok: true, message: t("accDeleted") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantDeleteAcc")),
    };
  }
}
