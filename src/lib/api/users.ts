import { api, ApiError } from "./client";
import {
  ApiResult,
  PaginationData,
  User,
  UserInfoResponse,
  UserUpdatePayload,
} from "../interfaces";

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
}): Promise<PaginationData<User[]>> {
  try {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const apiRes = await api.get<ApiResult<PaginationData<User[]>>>(
      `/users?limit=${limit}&page=${page}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const apiRes = await api.get<ApiResult<User>>(`/user/${id}`);
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getUserInfoById(id: string): Promise<UserInfoResponse> {
  try {
    const apiRes = await api.get<ApiResult<UserInfoResponse>>(
      `/user/personal-info/${id}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCurrentUserUpdate(
  body: UserUpdatePayload,
): Promise<ApiResult<User>> {
  try {
    return await api.put<ApiResult<User>>("/user", body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCurrentUserDelete(): Promise<ApiResult<User>> {
  try {
    return await api.delete<ApiResult<User>>("/user");
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleUserPictureUpdate(
  body: FormData,
): Promise<ApiResult<User>> {
  try {
    return await api.put<ApiResult<User>>("/user/profile-picture", body);
  } catch (error) {
    throw error as ApiError;
  }
}
