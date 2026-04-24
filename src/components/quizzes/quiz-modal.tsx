"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import {
  errorToaster,
  successToaster,
  validateFormBeforeSubmit,
} from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { Quiz, QuizFormValues, QuizPayload } from "@/lib/interfaces";
import {
  createQuizAction,
  updateQuizAction,
} from "@/components/quizzes/quizzes.server-action";
import {
  getQuizFormDefaultValues,
  getQuizSchema,
} from "@/components/forms/quiz.schema";
import { cn } from "@/lib/utils";
import { QuizFormContent } from "@/components/quizzes/quiz-form-content";

type QuizModalProps = {
  companyId: string;
  quiz?: Quiz;
  buttonClassName?: string;
};

export function QuizModal({
  companyId,
  quiz,
  buttonClassName,
}: QuizModalProps) {
  const router = useRouter();
  const tQuizzes = useTranslations("Quizzes");
  const tGeneral = useTranslations("General");
  const quizSchema = getQuizSchema(tQuizzes);
  const defaultValues: QuizFormValues = getQuizFormDefaultValues(quiz);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleSubmitQuiz = async () => {
    const isValid = await validateFormBeforeSubmit(form, tGeneral("required"));
    if (!isValid) return false;

    try {
      const data = quizSchema.parse(form.getValues());
      const payload: QuizPayload = {
        title: data.title,
        description: data.description,
        quizCompletionFrequency: data.quizCompletionFrequency,
        questions: data.questions.map((question) => ({
          question: question.question,
          answers: question.answers,
          correctAnswers: [question.answers[question.correctAnswerIndex]],
        })),
      };

      const response = quiz
        ? await updateQuizAction(companyId, quiz.id, payload)
        : await createQuizAction(companyId, payload);

      if (!response.ok) {
        errorToaster(response.message);
        return false;
      }

      successToaster(response.message);
      router.refresh();
    } catch (error) {
      errorToaster(parseErrorMessage(error));
      return false;
    }
  };

  const buttonName = quiz ? "updateQuiz" : "createQuiz";
  const okBtn = quiz ? "update" : "create";

  return (
    <ConfirmationModal
      buttonName={buttonName}
      title={buttonName}
      okBtn={okBtn}
      modalSize="lg"
      modalContentClassName="h-[92vh] w-[96vw] max-w-[96vw]"
      btnClasses={cn("hover:bg-yellow-500 hover:text-white", buttonClassName)}
      btnOkClasses="text-black bg-yellow-300 hover:bg-yellow-500 hover:text-white"
      onConfirm={handleSubmitQuiz}
      onCancel={() => form.clearErrors()}
    >
      <QuizFormContent form={form} />
    </ConfirmationModal>
  );
}
