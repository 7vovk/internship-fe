import { api, ApiError } from "./client";
import {
  ApiResult,
  PaginationData,
  Quiz,
  QuizPayload,
  QuizResult,
  QuizSubmission,
} from "../interfaces";

export async function getCompanyQuizzes(
  companyId: string,
  params?: { page?: number; limit?: number },
): Promise<PaginationData<Quiz[]>> {
  try {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const apiRes = await api.get<ApiResult<PaginationData<Quiz[]>>>(
      `/quizzes/${companyId}?limit=${limit}&page=${page}`,
      { cache: "no-store" },
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function getCompanyQuiz(
  companyId: string,
  quizId: string,
): Promise<Quiz> {
  try {
    const apiRes = await api.get<ApiResult<Quiz>>(
      `/quizzes/${companyId}/${quizId}`,
      { cache: "no-store" },
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}

export async function createCompanyQuiz(
  companyId: string,
  body: QuizPayload,
): Promise<ApiResult<Quiz>> {
  try {
    return await api.post<ApiResult<Quiz>>(`/quiz/${companyId}`, body);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function updateCompanyQuiz(
  companyId: string,
  quizId: string,
  body: QuizPayload,
): Promise<ApiResult<Quiz>> {
  try {
    return await api.patch<ApiResult<Quiz>>(
      `/quiz/${companyId}/${quizId}`,
      body,
    );
  } catch (error) {
    throw error as ApiError;
  }
}

export async function deleteCompanyQuiz(
  companyId: string,
  quizId: string,
): Promise<ApiResult<Quiz>> {
  try {
    return await api.delete<ApiResult<Quiz>>(`/quiz/${companyId}/${quizId}`);
  } catch (error) {
    throw error as ApiError;
  }
}

export async function submitQuiz(
  companyId: string,
  quizId: string,
  submission: QuizSubmission,
): Promise<QuizResult> {
  try {
    const apiRes = await api.post<ApiResult<QuizResult>>(
      `/quiz/${companyId}/${quizId}`,
      submission,
    );
    return apiRes.result;
  } catch (error) {
    throw error as ApiError;
  }
}
