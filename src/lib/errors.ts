type ErrorLikeWithMessage = {
  message?: unknown;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseStringMessage(rawMessage: string): string {
  try {
    const parsed = JSON.parse(rawMessage) as unknown;

    if (typeof parsed === "string") {
      return parsed;
    }

    if (isObject(parsed) && typeof parsed.message === "string") {
      return parsed.message;
    }

    return rawMessage;
  } catch {
    return rawMessage;
  }
}

export function parseErrorMessage(
  error: unknown,
  fallback = "Something went wrong.",
): string {
  if (typeof error === "string") {
    return parseStringMessage(error);
  }

  if (isObject(error)) {
    const maybeError = error as ErrorLikeWithMessage;
    if (typeof maybeError.message === "string") {
      return parseStringMessage(maybeError.message);
    }
  }

  return fallback;
}
