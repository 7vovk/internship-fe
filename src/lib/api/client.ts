const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const DEFAULT_TIMEOUT_MS = 10_000;

export interface ApiError {
  status: number;
  message: string;
}

type FetchOptions = RequestInit & {
  timeout?: number;
};

// Centralized fetch instance
async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT_MS, ...fetchOptions } = options;

  // Global headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...fetchOptions.headers,
  };

  // Request cancellation via AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    // Global response interceptor — handle non-2xx uniformly
    if (!response.ok) {
      throw {
        status: response.status,
        message: await response.text(),
      };
    }

    // Handle empty responses (e.g. 204 No Content)
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw { status: 408, message: "Request timed out" } satisfies ApiError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Convenience methods
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
