const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const DEFAULT_TIMEOUT_MS = 10_000;
const AUTH_COOKIE_NAME = "Authentication";

export interface ApiError {
  status: number;
  message: string;
}

type FetchOptions = RequestInit & {
  timeout?: number;
};

function extractAuthToken(cookieHeader: string): string | null {
  const tokenCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!tokenCookie) {
    return null;
  }

  const [, token = ""] = tokenCookie.split("=");
  return token ? decodeURIComponent(token) : null;
}

export async function resolveAuthToken(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return extractAuthToken(document.cookie ?? "");
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  } catch {
    return null;
  }
}

async function resolveAuth0AccessToken(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const { auth0 } = await import("@/lib/auth0");
    const tokenRes = await auth0.getAccessToken({
      audience: process.env.AUTH0_AUDIENCE,
    });
    return tokenRes.token ?? null;
  } catch {
    return null;
  }
}

async function resolveCookieHeader(): Promise<string | null> {
  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const entries = cookieStore.getAll();

    if (!entries.length) {
      return null;
    }

    return entries.map(({ name, value }) => `${name}=${value}`).join("; ");
  } catch {
    return null;
  }
}

async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;
  const jwtToken = await resolveAuthToken();
  const auth0Token = jwtToken ? null : await resolveAuth0AccessToken();
  const bearerToken = jwtToken ?? auth0Token;
  const serverCookieHeader = await resolveCookieHeader();
  const hasBody = fetchOptions.body !== undefined && fetchOptions.body !== null;

  const headers = new Headers({
    Accept: "application/json",
    ...fetchOptions.headers,
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
  });

  if (serverCookieHeader && !headers.has("Cookie")) {
    headers.set("Cookie", serverCookieHeader);
  }

  const timeoutSignal: AbortSignal = AbortSignal.timeout(timeout);
  const signal = fetchOptions.signal
    ? AbortSignal.any([fetchOptions.signal, timeoutSignal])
    : timeoutSignal;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: "include",
      signal,
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: await response.text(),
      };
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw { status: 408, message: "Request timed out" } satisfies ApiError;
    }
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
