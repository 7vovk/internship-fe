"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/components/shared/page-template";
import { BackButton } from "@/components/shared/ui";
import { QuizTakingForm } from "./quizzes-form/quiz-taking-form";
import { QuizResult as QuizResultComponent } from "./quiz-result";
import { QuizResult } from "@/lib/interfaces";
import type { QuizForTaking } from "@/lib/utils/quiz.utils";
import { submitQuizAction } from "./quizzes.server-action";
import { errorToaster, successToaster } from "@/app/utils";

type QuizPageClientProps = {
  companyId: string;
  quizId: string;
  quiz: QuizForTaking;
};

export function QuizPageClient({
  companyId,
  quizId,
  quiz,
}: QuizPageClientProps) {
  const tQuizzes = useTranslations("Quizzes");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (answers: Record<string, string[]>) => {
    setIsSubmitting(true);
    const submission = {
      data: Object.entries(answers).map(([questionId, selectedAnswers]) => ({
        id: questionId,
        answers: selectedAnswers,
      })),
    };

    const response = await submitQuizAction(companyId, quizId, submission);

    if (!response.ok) {
      errorToaster(response.message);
      setIsSubmitting(false);
      return;
    }

    setResult(response.result);
    successToaster(response.message);
    setIsSubmitting(false);
  };

  if (result) {
    return (
      <PageTemplate translator={tQuizzes} title={tQuizzes("resultTitle")}>
        <div className="space-y-4">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <QuizResultComponent result={result} companyId={companyId} />
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      translator={tQuizzes}
      title={tQuizzes("takeQuizTitle", { title: quiz.title })}
    >
      <div className="space-y-4">
        <div className="flex justify-start">
          <BackButton />
        </div>
        <QuizTakingForm
          quiz={quiz}
          onSubmitAction={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </PageTemplate>
  );
}
