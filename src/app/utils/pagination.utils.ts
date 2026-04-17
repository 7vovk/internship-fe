type PaginationQuery = {
  page?: string;
  limit?: string;
};

type ParsePaginationOptions = {
  defaultPage?: number;
  defaultLimit?: number;
  allowedLimits?: number[];
};

export function parsePaginationParams(
  params?: PaginationQuery,
  options?: ParsePaginationOptions,
) {
  const defaultPage = options?.defaultPage ?? 1;
  const defaultLimit = options?.defaultLimit ?? 10;
  const allowedLimits = options?.allowedLimits ?? [10, 25, 50];

  const rawPage = Number(params?.page ?? String(defaultPage));
  const rawLimit = Number(params?.limit ?? String(defaultLimit));

  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : defaultPage;
  const limit =
    Number.isFinite(rawLimit) && allowedLimits.includes(rawLimit)
      ? Math.floor(rawLimit)
      : defaultLimit;

  return { page, limit };
}
