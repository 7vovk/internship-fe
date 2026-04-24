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
      correctAnswerIndex: z.number().int().min(0),
    })
    .superRefine((value, ctx) => {
      if (value.correctAnswerIndex >= value.answers.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["correctAnswerIndex"],
          message: translator("correctAnswerRequired"),
        });
      }
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
    { question: "", answers: ["", ""], correctAnswerIndex: 0 },
    { question: "", answers: ["", ""], correctAnswerIndex: 0 },
  ],
} as const;

export function getQuizFormDefaultValues(quiz?: Quiz) {
  if (quiz) {
    return {
      title: quiz.title,
      description: quiz.description ?? "",
      quizCompletionFrequency: quiz.quizCompletionFrequency,
      questions: quiz.questions.map((question) => {
        const fallbackCorrectAnswer = question.answers[0] ?? "";
        const selectedCorrectAnswer =
          question.correctAnswers[0] ?? fallbackCorrectAnswer;
        const selectedIndex = Math.max(
          question.answers.findIndex(
            (answer) => answer === selectedCorrectAnswer,
          ),
          0,
        );

        return {
          question: question.question,
          answers: question.answers.length >= 2 ? question.answers : ["", ""],
          correctAnswerIndex: selectedIndex,
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
      correctAnswerIndex: question.correctAnswerIndex,
    })),
  };
}
