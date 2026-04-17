import { _Translator } from "next-intl";
import { Company, User } from "@/lib/interfaces";
import { DataField, parseDataFields } from "@/lib/common/parse-data-fields";

export type CompanyDataField = DataField;

const hiddenKeys: string[] = ["id", "ownerId"];

function isUserNameObject(value: unknown): value is {
  firstName?: string;
  lastName?: string;
} {
  return typeof value === "object" && value !== null;
}

export function parseCompanyData(
  company: Company | null,
  user: User | null,
  translator: _Translator<Record<string, string>>,
): CompanyDataField[] {
  return parseDataFields(
    company as Record<string, unknown> | null,
    translator,
    {
      hiddenKeys,
      keyFormatters: {
        owner: (value) => {
          if (!isUserNameObject(value)) {
            return null;
          }

          const fullName =
            company?.ownerId === user?.id
              ? translator("you")
              : `${value.firstName} ${value.lastName}`.trim();

          return fullName || null;
        },
      },
    },
  );
}
