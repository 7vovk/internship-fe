import { useTranslations } from "next-intl";
import type { QuizQuestionForTaking } from "@/lib/utils/quiz.utils";
import { QuizTakingAnswerOption } from "./quiz-taking-answer-option";

type QuizTakingQuestionProps = {
  question: QuizQuestionForTaking;
  questionIndex: number;
  questionKey: string;
  selectedAnswers: string[];
  isDisabled: boolean;
  onAnswerChange: (answer: string, isChecked: boolean) => void;
};

export function QuizTakingQuestion({
  question,
  questionIndex,
  questionKey,
  selectedAnswers,
  isDisabled,
  onAnswerChange,
}: QuizTakingQuestionProps) {
  const t = useTranslations("Quizzes");

  return (
    <article className="bg-card rounded-lg border p-6">
      <h3 className="text-base font-semibold mb-4">
        {t("questionNumber", { number: questionIndex + 1 })}
      </h3>
      <p className="mb-4 text-foreground">{question.question}</p>
      <div className="space-y-3">
        {question.answers.map((answer, answerIndex) => (
          <QuizTakingAnswerOption
            key={`${questionKey}-${answerIndex}`}
            answer={answer}
            isSelected={selectedAnswers.includes(answer)}
            isDisabled={isDisabled}
            onChange={(isChecked) => onAnswerChange(answer, isChecked)}
          />
        ))}
      </div>
    </article>
  );
}
