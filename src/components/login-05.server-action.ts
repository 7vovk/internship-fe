"use server";

import { handleAccountCreate } from "@/lib/api/auth";
import { parseErrorMessage } from "@/lib/errors";

type CreateAccountPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type CreateAccountActionResult = {
  ok: boolean;
  message: string;
};

export async function createAccountAction(
  payload: CreateAccountPayload,
): Promise<CreateAccountActionResult> {
  try {
    await handleAccountCreate(payload);
    return { ok: true, message: "Account has been created successfully." };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, "Unable to create account."),
    };
  }
}
