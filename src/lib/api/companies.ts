import { api, ApiError } from "./client";
import {
  ApiResult,
  Company,
  CompanyFormData,
  PaginationData,
} from "../interfaces";

export async function handleCompanyCreate(
  body: CompanyFormData,
): Promise<ApiResult<Company>> {
  try {
    return await api.post<ApiResult<Company>>("/company", body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getAllCompanies(params?: {
  page?: number;
  limit?: number;
}): Promise<PaginationData<Company[]>> {
  try {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const apiRes = await api.get<ApiResult<PaginationData<Company[]>>>(
      `/companies?limit=${limit}&page=${page}`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCompanyUpdate(
  companyId: string,
  body: CompanyFormData,
): Promise<ApiResult<Company>> {
  try {
    return await api.patch<ApiResult<Company>>(`/company/${companyId}`, body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function handleCompanyDelete(
  companyId: string,
): Promise<ApiResult<Company>> {
  try {
    return await api.delete<ApiResult<Company>>(`/company/${companyId}`);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getCompanyById(companyId: string): Promise<Company> {
  try {
    const apiRes = await api.get<ApiResult<Company>>(`/company/${companyId}`);
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function leaveSpecificCompany(
  companyId: string,
): Promise<Company> {
  try {
    const apiRes = await api.delete<ApiResult<Company>>(
      `/company/${companyId}/leave`,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}
