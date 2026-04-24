import * as z from "zod";
import { _Translator } from "next-intl";
import { Quiz } from "@/lib/interfaces";

const MIN_QUESTIONS = 2;
const MIN_ANSWERS = 2;

export function getQuizSchema(translator: _Translator<Record<string, string>>) {
  const questionSchema = z
    .object({
      question: z
        .string()
        .trim()
        .min(1, translator("questionRequired"))
        .max(500),
      answers: z
        .array(z.string().trim().min(1, translator("answerRequired")).max(300))
        .min(MIN_ANSWERS, translator("minAnswers", { amount: MIN_ANSWERS })),
      correctAnswerIndexes: z
        .array(z.number().int().min(0))
        .min(1, translator("correctAnswersRequired")),
    })
    .superRefine((value, ctx) => {
      value.correctAnswerIndexes.forEach((index, idx) => {
        if (index >= value.answers.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["correctAnswerIndexes", idx],
            message: translator("correctAnswersRequired"),
          });
        }
      });
    });

  return z.object({
    title: z.string().trim().min(1, translator("titleRequired")).max(255),
    description: z
      .string()
      .trim()
      .min(1, translator("descriptionRequired"))
      .max(2000),
    quizCompletionFrequency: z
      .number()
      .int()
      .min(1, translator("frequencyMin")),
    questions: z
      .array(questionSchema)
      .min(
        MIN_QUESTIONS,
        translator("minQuestions", { amount: MIN_QUESTIONS }),
      ),
  });
}

export const quizFormDefaults = {
  title: "",
  description: "",
  quizCompletionFrequency: 7,
  questions: [
    { question: "", answers: ["", ""], correctAnswerIndexes: [0] },
    { question: "", answers: ["", ""], correctAnswerIndexes: [0] },
  ],
} as const;

export function getQuizFormDefaultValues(quiz?: Quiz) {
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description ?? "",
      quizCompletionFrequency: quiz.quizCompletionFrequency,
      questions: quiz.questions.map((question) => {
        const selectedIndexes = Array.from(
          new Set(
            question.correctAnswers
              .map((correctAnswer) =>
                question.answers.findIndex((answer) => answer === correctAnswer),
              )
              .filter((index) => index >= 0),
          ),
        );

        return {
          question: question.question,
          answers: question.answers.length >= 2 ? question.answers : ["", ""],
          correctAnswerIndexes:
            selectedIndexes.length > 0 ? selectedIndexes : [0],
        };
      }),
    };
  }

  return {
    title: quizFormDefaults.title,
    description: quizFormDefaults.description,
    quizCompletionFrequency: quizFormDefaults.quizCompletionFrequency,
    questions: quizFormDefaults.questions.map((question) => ({
      question: question.question,
      answers: [...question.answers],
      correctAnswerIndexes: [...question.correctAnswerIndexes],
    })),
  };
}
