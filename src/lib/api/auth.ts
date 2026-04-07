import { api, ApiError } from "./client";
import { ApiResult } from "@/lib/api/interfaces/api.interface";
import { User } from "@/lib/api/interfaces/user.interface";

export async function handleLogin(body: {
  email: string;
  password: string;
}): Promise<ApiResult<{ user: User }>> {
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

export async function handleAccountCreate(body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<ApiResult<{ user: User }>> {
  try {
    return await api.post<ApiResult<{ user: User }>>("/user", body);
  } catch (error) {
    throw error as ApiError;
  }
}
