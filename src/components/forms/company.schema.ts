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
