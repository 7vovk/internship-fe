import * as z from "zod";
import { _Translator } from "next-intl";

export function getLoginSchema(
  translator: _Translator<Record<string, string>>,
) {
  return z.object({
    email: z.string().email(translator("email_error")),
    password: z.string().min(6, translator("password_error")),
  });
}

export function getRegisterPayloadSchema(
  translator: _Translator<Record<string, string>>,
) {
  return z.object({
    firstName: z.string().min(1, translator("required")).max(100).trim(),
    lastName: z.string().min(1, translator("required")).max(100).trim(),
    email: z.string().email(translator("email_error")),
    password: z.string().min(6, translator("password_error")),
  });
}

export function getRegisterSchema(
  translator: _Translator<Record<string, string>>,
) {
  return getRegisterPayloadSchema(translator)
    .extend({
      confirmPassword: z.string().min(6, translator("password_error")),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: translator("confirm_password_error"),
          path: ["confirmPassword"],
        });
      }
    });
}
