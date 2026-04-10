import type { User } from "@/lib/interfaces";
import { _Translator } from "next-intl";

export type UserDataField = {
  key: string;
  value: string;
};

function formatUserDate(value: string): string {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString();
}

export function parseUserData(
  user: User | null,
  translator: _Translator<Record<string, string>>,
): UserDataField[] {
  if (!user) {
    return [];
  }

  return Object.entries(user).reduce<UserDataField[]>((acc, [key, value]) => {
    if (
      typeof value === "boolean" ||
      (Array.isArray(value) && value.length === 0) ||
      key === "password" ||
      key === "tempPass" ||
      key === "profilePictureUrl"
    ) {
      return acc;
    }

    if (Array.isArray(value)) {
      return [...acc, { key: translator(key), value: value.join(", ") }];
    }

    if (typeof value === "string") {
      if (key === "createDate" || key === "updateDate") {
        return [...acc, { key: translator(key), value: formatUserDate(value) }];
      }

      return [...acc, { key: translator(key), value }];
    }

    return [...acc, { key: translator(key), value: JSON.stringify(value) }];
  }, []);
}
