import { api, ApiError } from "./client";
import { ApiResult, Pagination, User } from "./interfaces";

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

export async function getAllUsers(): Promise<Pagination<User[]>> {
  try {
    const apiRes = await api.get<ApiResult<Pagination<User[]>>>(
      "/users?limit=50&page=1",
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

export async function handleCurrentUserUpdate(body: {
  password: string;
  firstName: string;
  lastName: string;
}): Promise<ApiResult<{ user: User }>> {
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
