"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/shared/ui";
import type { QuizResult as QuizResultData } from "@/lib/interfaces";
import { convertDate } from "@/app/utils/date.utils";
import { cn } from "@/lib/utils";
import {
  formatQuizScore,
  getQuizScorePercentage,
} from "@/lib/utils/quiz.utils";

type QuizResultProps = {
  result: QuizResultData;
  companyId: string;
};

export function QuizResult({ result, companyId }: QuizResultProps) {
  const t = useTranslations("Quizzes");
  const QUIZ_PASSING_SCORE_PERCENT = 50;

  const totalQuestions = result.data.length;
  const scorePercentage = getQuizScorePercentage(result.score, totalQuestions);
  const isPassing = scorePercentage >= QUIZ_PASSING_SCORE_PERCENT;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div
        className={cn(
          "rounded-lg border p-8 text-center bg-green-50 border-green-200",
          !isPassing && "bg-red-50 border-red-200",
        )}
      >
        <h2 className="text-3xl font-bold mb-4">{t("resultTitle")}</h2>

        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground text-sm mb-2">
                {t("yourScore")}
              </p>
              <p
                className={cn(
                  "text-4xl font-bold text-green-600",
                  !isPassing && "text-red-600",
                )}
              >
                {scorePercentage}%
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-muted-foreground text-sm mb-2">
                {t("correctAnswers")}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {formatQuizScore(result.score)} / {totalQuestions}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-muted-foreground text-sm mb-2">
                {t("totalQuestions")}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {totalQuestions}
              </p>
            </div>
          </div>
        </div>

        <p
          className={cn(
            "text-lg font-semibold mb-4",
            isPassing ? "text-green-600" : "text-red-600",
          )}
        >
          {isPassing ? t("passMessage") : t("failMessage")}
        </p>
      </div>

      <div className="bg-card rounded-lg border p-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">{t("quizLabel")}</span>{" "}
          {result.quizTitle}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">{t("companyLabel")}</span>{" "}
          {result.companyName}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">{t("completedLabel")}</span>{" "}
          {convertDate(result.createDate, "dd/mm/yyyy, HH:MM:ss")}
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          href={`/companies/${companyId}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "hover:bg-blue-500 hover:text-white",
          )}
        >
          {t("backToCompany")}
        </Link>
      </div>
    </div>
  );
}
