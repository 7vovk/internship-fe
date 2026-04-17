"use server";

import { handleAccountCreate } from "@/lib/api/users";
import { parseErrorMessage } from "@/lib/errors";
import { _Translator } from "next-intl";

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
  translator: _Translator<Record<string, string>>,
): Promise<CreateAccountActionResult> {
  try {
    await handleAccountCreate(payload);
    return { ok: true, message: translator("accCreated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, translator("cantCreateAcc")),
    };
  }
}
