"use server";

import { handleAccountCreate } from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { getTranslations } from "next-intl/server";

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
  const tAuth = await getTranslations("Auth");
  try {
    await handleAccountCreate(payload);
    return { ok: true, message: tAuth("accCreated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, tAuth("cantCreateAcc")),
    };
  }
}
