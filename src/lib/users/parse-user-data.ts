import type { User } from "@/lib/interfaces";
import { _Translator } from "next-intl";
import { DataField, parseDataFields } from "@/lib/common/parse-data-fields";

export type UserDataField = DataField;

const hiddenKeys: string[] = [
  "password",
  "tempPass",
  "profilePictureUrl",
  "invitedTo",
  "companies",
  "companyAdministration",
];

export function parseUserData(
  user: User | null,
  translator: _Translator<Record<string, string>>,
): UserDataField[] {
  return parseDataFields(user as Record<string, unknown> | null, translator, {
    hiddenKeys,
  });
}
