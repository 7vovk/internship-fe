import type { Quiz, QuizQuestion } from "@/lib/interfaces";

export type QuizQuestionForTaking = Omit<QuizQuestion, "correctAnswers">;
export type QuizForTaking = Omit<Quiz, "questions"> & {
  questions: QuizQuestionForTaking[];
};

/** Removes correct answers before sending quiz data to the client. */
export function toQuizForTaking(quiz: Quiz): QuizForTaking {
  return {
    ...quiz,
    questions: quiz.questions.map(
      ({ correctAnswers: _correct, ...question }) => question,
    ),
  };
}
/**
 * Stable key for answer state and submission.
 * Prefer API `id`; fall back to index when the backend omits it.
 */
export function getQuizQuestionKey(
  question: Pick<QuizQuestion, "id">,
  index: number,
): string {
  return question.id ?? `question-${index}`;
}

/** Assumes `score` is total points earned (max one per question). */
export function getQuizScorePercentage(
  score: number,
  totalQuestions: number,
): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((score / totalQuestions) * 100);
}

/** Formats fractional scores (e.g. partial credit per question). */
export function formatQuizScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(2);
}
