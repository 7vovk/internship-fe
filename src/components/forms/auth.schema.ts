import * as z from "zod";
import { _Translator } from "next-intl";

function withConfirmPassword(
  schema: z.ZodObject<z.ZodRawShape>,
  translator: _Translator<Record<string, string>>,
) {
  return schema
    .extend({
      confirmPassword: z.string().min(6, translator("passwordError")),
    })
    .superRefine((data: Record<string, unknown>, ctx) => {
      const confirmPassword = String(data.confirmPassword ?? "");
      const password = String(data.password ?? "");
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: translator("confirmPasswordError"),
          path: ["confirmPassword"],
        });
      }
    });
}

export function getLoginSchema(
  translator: _Translator<Record<string, string>>,
) {
  return z.object({
    email: z.string().email(translator("emailError")),
    password: z.string().min(6, translator("passwordError")),
  });
}

export function getRegisterPayloadSchema(
  translator: _Translator<Record<string, string>>,
) {
  return z.object({
    firstName: z.string().min(1, translator("required")).max(100).trim(),
    lastName: z.string().min(1, translator("required")).max(100).trim(),
    email: z.string().email(translator("emailError")),
    password: z.string().min(6, translator("passwordError")),
  });
}

export function getRegisterSchema(
  translator: _Translator<Record<string, string>>,
) {
  return withConfirmPassword(getRegisterPayloadSchema(translator), translator);
}

export function getEditSchema(translator: _Translator<Record<string, string>>) {
  return getRegisterPayloadSchema(translator)
    .omit({
      email: true,
      password: true,
    })
    .extend({
      description: z.string().max(300).trim(),
    });
}

export function getEditPasswordSchema(
  translator: _Translator<Record<string, string>>,
) {
  return withConfirmPassword(
    getLoginSchema(translator).omit({ email: true }),
    translator,
  );
}

export function getEditPasswordPayloadSchema(
  translator: _Translator<Record<string, string>>,
) {
  return getLoginSchema(translator).omit({ email: true });
}
