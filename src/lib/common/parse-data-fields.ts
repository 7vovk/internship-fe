import { _Translator } from "next-intl";

export type DataField = {
  key: string;
  value: string;
};

type ParseDataFieldsOptions = {
  hiddenKeys?: string[];
  keyFormatters?: Partial<
    Record<string, (value: unknown, key: string) => string | null | undefined>
  >;
};

function formatDate(value: string): string {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString();
}

function mapArrayValue(value: unknown[]): string {
  if (!value.length) {
    return "";
  }

  if (typeof value[0] === "object" && value[0] !== null) {
    return value
      .map((item) => {
        const entity = item as Record<string, unknown>;

        if (typeof entity.name === "string") {
          return entity.name;
        }

        const firstName =
          typeof entity.firstName === "string" ? entity.firstName : "";
        const lastName =
          typeof entity.lastName === "string" ? entity.lastName : "";
        const fullName = `${firstName} ${lastName}`.trim();

        return fullName || JSON.stringify(item);
      })
      .join(", ");
  }

  return value.map((item) => String(item)).join(", ");
}

export function parseDataFields<T extends Record<string, unknown>>(
  data: T | null,
  translator: _Translator<Record<string, string>>,
  options?: ParseDataFieldsOptions,
): DataField[] {
  if (!data) {
    return [];
  }

  const hiddenKeys = options?.hiddenKeys ?? [];
  const keyFormatters = options?.keyFormatters ?? {};
  return Object.entries(data).reduce<DataField[]>((acc, [key, value]) => {
    if (
      typeof value === "boolean" ||
      (Array.isArray(value) && value.length === 0) ||
      hiddenKeys.includes(key)
    ) {
      return acc;
    }

    const formatter = keyFormatters[key];
    if (formatter) {
      const formattedValue = formatter(value, key);
      return formattedValue
        ? [...acc, { key: translator(key), value: formattedValue }]
        : acc;
    }

    if (Array.isArray(value)) {
      const parsedArray = mapArrayValue(value);
      return parsedArray
        ? [...acc, { key: translator(key), value: parsedArray }]
        : acc;
    }

    if (typeof value === "string") {
      if (key === "createDate" || key === "updateDate") {
        return [...acc, { key: translator(key), value: formatDate(value) }];
      }
      return [...acc, { key: translator(key), value }];
    }

    if (typeof value === "number") {
      return [...acc, { key: translator(key), value: String(value) }];
    }

    return [...acc, { key: translator(key), value: JSON.stringify(value) }];
  }, []);
}
