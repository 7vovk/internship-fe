"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { errorToaster, successToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { deleteQuizAction } from "@/components/quizzes/quizzes.server-action";

type QuizDeleteProps = {
  companyId: string;
  quizId: string;
};

export function QuizDelete({ companyId, quizId }: QuizDeleteProps) {
  const router = useRouter();
  const tQuizzes = useTranslations("Quizzes");

  async function handleDeleteQuiz() {
    try {
      const result = await deleteQuizAction(companyId, quizId);
      if (!result.ok) {
        errorToaster(result.message);
        return false;
      }
      successToaster(result.message);
      router.refresh();
    } catch (error) {
      errorToaster(parseErrorMessage(error));
      return false;
    }
  }

  return (
    <ConfirmationModal
      buttonName="delete"
      title="sure"
      description={tQuizzes("remove")}
      btnClasses="hover:bg-red-500 hover:text-white"
      btnOkClasses="text-black bg-red-300 hover:bg-red-500 hover:text-white"
      onConfirm={handleDeleteQuiz}
    />
  );
}
