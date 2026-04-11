"use server";

import {
  handleCurrentUserDelete,
  handleCurrentUserUpdate,
  handleUserPictureUpdate,
} from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { UserActionResult, UserUpdatePayload } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";

export async function updateCurrentUserAction(
  payload: UserUpdatePayload,
): Promise<UserActionResult> {
  try {
    await handleCurrentUserUpdate(payload);
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    return { ok: true, message: "Account has been updated successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to update account."),
    };
  }
}

export async function updateCurrentUserImageAction(
  payload: FormData,
): Promise<UserActionResult> {
  try {
    await handleUserPictureUpdate(payload);
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    return { ok: true, message: "Profile image has been updated successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to update profile image."),
    };
  }
}

export async function deleteCurrentUserAction(): Promise<UserActionResult> {
  try {
    await handleCurrentUserDelete();
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    return { ok: true, message: "Account has been deleted successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to delete account."),
    };
  }
}
