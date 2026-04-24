"use server";

import { parseErrorMessage } from "@/lib/errors";
import { QuizPayload, ServerActionResult } from "@/lib/interfaces";
import {
  createCompanyQuiz,
  deleteCompanyQuiz,
  updateCompanyQuiz,
} from "@/lib/api/quizzes";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export async function createQuizAction(
  companyId: string,
  payload: QuizPayload,
): Promise<ServerActionResult> {
  const t = await getTranslations("Quizzes");
  try {
    await createCompanyQuiz(companyId, payload);
    revalidatePath(`/companies/${companyId}`);
    revalidatePath(`/companies/${companyId}/quizzes`);
    return { ok: true, message: t("created") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantCreate")),
    };
  }
}

export async function updateQuizAction(
  companyId: string,
  quizId: string,
  payload: QuizPayload,
): Promise<ServerActionResult> {
  const t = await getTranslations("Quizzes");
  try {
    await updateCompanyQuiz(companyId, quizId, payload);
    revalidatePath(`/companies/${companyId}`);
    revalidatePath(`/companies/${companyId}/quizzes`);
    return { ok: true, message: t("updated") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantUpdate")),
    };
  }
}

export async function deleteQuizAction(
  companyId: string,
  quizId: string,
): Promise<ServerActionResult> {
  const t = await getTranslations("Quizzes");
  try {
    await deleteCompanyQuiz(companyId, quizId);
    revalidatePath(`/companies/${companyId}`);
    revalidatePath(`/companies/${companyId}/quizzes`);
    return { ok: true, message: t("deleted") };
  } catch (error) {
    return {
      ok: false,
      message: parseErrorMessage(error, t("cantDelete")),
    };
  }
}
