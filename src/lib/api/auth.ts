import { api, ApiError } from "./client";
import { ApiResult, LoginRequest, User } from "../interfaces";

export async function handleLogin(
  body: LoginRequest,
): Promise<ApiResult<{ user: User }>> {
  try {
    return await api.post<ApiResult<{ user: User }>>("/auth/login", body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleLogout(): Promise<void> {
  try {
    await api.post<void>("/auth/logout", {});
  } catch (error) {
    throw error as ApiError;
  }
}
