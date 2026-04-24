export interface QuizQuestion {
  id?: string;
  question: string;
  answers: string[];
  correctAnswers: string[];
}

export interface Quiz {
  id: string;
  createDate: string;
  updateDate: string;
  companyId: string;
  title: string;
  description: string;
  quizCompletionFrequency: number;
  questions: QuizQuestion[];
}

export interface QuizQuestionPayload {
  question: string;
  answers: string[];
  correctAnswers: string[];
}

export interface QuizPayload {
  title: string;
  description: string;
  quizCompletionFrequency: number;
  questions: QuizQuestionPayload[];
}

export type QuizFormQuestionValues = {
  question: string;
  answers: string[];
  correctAnswerIndexes: number[];
};

export type QuizFormValues = {
  title: string;
  description: string;
  quizCompletionFrequency: number;
  questions: QuizFormQuestionValues[];
};

export type QuizFieldConfig = {
  name: "title" | "description" | "quizCompletionFrequency";
  labelKey: string;
  placeholderKey: string;
  type: "text" | "textarea" | "number";
};
