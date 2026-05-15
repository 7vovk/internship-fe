"use client";

import { type SubmitEventHandler, useState } from "react";
import { useTranslations } from "next-intl";
import { QuizTakingQuestion } from "./quiz-taking-question";
import { QuizTakingSubmit } from "./quiz-taking-submit";
import type { QuizForTaking } from "@/lib/utils/quiz.utils";
import { getQuizQuestionKey } from "@/lib/utils/quiz.utils";
import { errorToaster } from "@/app/utils";

type QuizTakingFormProps = {
  quiz: QuizForTaking;
  onSubmitAction: (answers: Record<string, string[]>) => Promise<void>;
  isLoading: boolean;
};

export function QuizTakingForm({
  quiz,
  onSubmitAction,
  isLoading,
}: QuizTakingFormProps) {
  const tQuizzes = useTranslations("Quizzes");
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleAnswerChange = (
    questionKey: string,
    answer: string,
    isChecked: boolean,
  ) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionKey] || [];
      if (isChecked) {
        return {
          ...prev,
          [questionKey]: [...currentAnswers, answer],
        };
      }
      return {
        ...prev,
        [questionKey]: currentAnswers.filter((a) => a !== answer),
      };
    });
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const allAnswered = quiz.questions.every((question, index) => {
      const questionKey = getQuizQuestionKey(question, index);
      return (answers[questionKey]?.length ?? 0) > 0;
    });

    if (!allAnswered) {
      errorToaster(tQuizzes("selectAnswer"));
      return;
    }

    await onSubmitAction(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-card rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>
        <p className="text-muted-foreground">{quiz.description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {tQuizzes("multipleAnswersNote")}
        </p>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => {
          const questionKey = getQuizQuestionKey(question, index);

          return (
            <QuizTakingQuestion
              key={questionKey}
              question={question}
              questionIndex={index}
              questionKey={questionKey}
              selectedAnswers={answers[questionKey] ?? []}
              isDisabled={isLoading}
              onAnswerChange={(answer, isChecked) =>
                handleAnswerChange(questionKey, answer, isChecked)
              }
            />
          );
        })}
      </div>

      <QuizTakingSubmit isLoading={isLoading} />
    </form>
  );
}
