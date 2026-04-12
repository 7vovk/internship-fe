"use server";

import {
  handleCurrentUserDelete,
  handleCurrentUserUpdate,
  handleUserPictureUpdate,
} from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { UserActionResult, UserUpdatePayload } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export async function updateCurrentUserAction(
  payload: UserUpdatePayload,
): Promise<UserActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleCurrentUserUpdate(payload);
    revalidatePath("/", "layout");
    revalidatePath("/profile");
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
): Promise<UserActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleUserPictureUpdate(payload);
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    return { ok: true, message: t("imageUpdated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantUpdateImage")),
    };
  }
}

export async function deleteCurrentUserAction(): Promise<UserActionResult> {
  const t = await getTranslations("Auth");
  try {
    await handleCurrentUserDelete();
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    return { ok: true, message: t("accDeleted") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantDeleteAcc")),
    };
  }
}
