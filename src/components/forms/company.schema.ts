import * as z from "zod";
import { _Translator } from "next-intl";

export function getCompanyDataSchema(
  translator: _Translator<Record<string, string>>,
) {
  const websiteRegex =
    /^(https?:\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/.*)?$/;

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, translator("chars", { amount: 2 }))
      .max(100),
    description: z.string().trim().max(300),
    website: z
      .string()
      .optional()
      .transform((value) => value?.trim())
      .refine(
        (value) => !value || websiteRegex.test(value),
        translator("websiteError"),
      ),
    address: z.string().trim().max(300),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{7,14}$/, translator("phoneError")),
    isVisibleForAll: z.boolean().optional(),
  });
}

export function getInviteUserSchema(
  translator: _Translator<Record<string, string>>,
) {
  return z.object({
    users: z
      .array(
        z.object({
          email: z.string().trim().email(translator("emailError")),
        }),
      )
      .min(1)
      .superRefine((users, ctx) => {
        const seenEmails = new Map<string, number>();

        users.forEach((user, index) => {
          const normalizedEmail = user.email.toLowerCase();
          const firstIndex = seenEmails.get(normalizedEmail);

          if (firstIndex !== undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index, "email"],
              message: translator("duplicateEmailError"),
            });
            return;
          }

          seenEmails.set(normalizedEmail, index);
        });
      }),
  });
}
