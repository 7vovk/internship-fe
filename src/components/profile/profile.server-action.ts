"use server";

import {
  handleCurrentUserDelete,
  handleCurrentUserUpdate,
} from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { UserActionResult, UserUpdatePayload } from "@/lib/interfaces";

export async function updateCurrentUserAction(
  payload: UserUpdatePayload,
): Promise<UserActionResult> {
  try {
    await handleCurrentUserUpdate(payload);
    return { ok: true, message: "Account has been updated successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to update account."),
    };
  }
}

export async function deleteCurrentUserAction(): Promise<UserActionResult> {
  try {
    await handleCurrentUserDelete();
    return { ok: true, message: "Account has been deleted successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to delete account."),
    };
  }
}
