import { api, ApiError } from "./client";
import { ApiResult, Pagination, User, UserUpdatePayload } from "../interfaces";

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

export async function getMeInfo(): Promise<User> {
  try {
    const apiRes = await api.get<ApiResult<User>>("/me");
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getAllUsers(params?: {
  page?: number;
  limit?: number;
}): Promise<Pagination<User[]>> {
  try {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const apiRes = await api.get<ApiResult<Pagination<User[]>>>(
      `/users?limit=${limit}&page=${page}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getUserById(
  id: string,
): Promise<ApiResult<{ user: User }>> {
  try {
    return await api.get<ApiResult<{ user: User }>>(`/user/${id}`);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getUserInfoById(
  id: string,
): Promise<ApiResult<{ user: User }>> {
  try {
    return await api.get<ApiResult<{ user: User }>>(
      `/user/personal-info/${id}`,
    );
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCurrentUserUpdate(
  body: UserUpdatePayload,
): Promise<ApiResult<{ user: User }>> {
  try {
    return await api.put<ApiResult<{ user: User }>>("/user", body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCurrentUserDelete(): Promise<
  ApiResult<{ user: User }>
> {
  try {
    return await api.delete<ApiResult<{ user: User }>>("/user");
  } catch (error) {
    throw error as ApiError;
  }
}
