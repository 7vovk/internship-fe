"use client";

import {
  Controller,
  useFieldArray,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from "@/components/shared/ui";
import { QuizFieldConfig, QuizFormValues } from "@/lib/interfaces";
import { QuizActions } from "@/components/quizzes/quiz-actions";
import { QuizQuestionEditor } from "@/components/quizzes/quiz-question-editor";
import { errorToaster } from "@/app/utils";

type QuizFormContentProps = {
  form: UseFormReturn<QuizFormValues>;
};

export function QuizFormContent({ form }: QuizFormContentProps) {
  const tQuizzes = useTranslations("Quizzes");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });
  const watchedQuestions = useWatch({
    control: form.control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ question: "", answers: ["", ""], correctAnswerIndex: 0 });
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    if (fields.length <= 2) {
      errorToaster(tQuizzes("minQuestions", { amount: 2 }));
      return;
    }
    remove(questionIndex);
  };

  const handleAddAnswer = (questionIndex: number) => {
    const answers = form.getValues(`questions.${questionIndex}.answers`);
    form.setValue(`questions.${questionIndex}.answers`, [...answers, ""], {
      shouldValidate: true,
    });
  };

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    const answers = form.getValues(`questions.${questionIndex}.answers`);
    if (answers.length <= 2) {
      errorToaster(tQuizzes("minAnswers", { amount: 2 }));
      return;
    }

    const nextAnswers = answers.filter((_, index) => index !== answerIndex);
    form.setValue(`questions.${questionIndex}.answers`, nextAnswers, {
      shouldValidate: true,
    });

    const currentCorrectIndex = form.getValues(
      `questions.${questionIndex}.correctAnswerIndex`,
    );
    const nextCorrectIndex =
      currentCorrectIndex === answerIndex
        ? 0
        : currentCorrectIndex > answerIndex
          ? currentCorrectIndex - 1
          : currentCorrectIndex;

    form.setValue(
      `questions.${questionIndex}.correctAnswerIndex`,
      Math.max(nextCorrectIndex, 0),
      { shouldValidate: true },
    );
  };
  const quizFieldConfigs: QuizFieldConfig[] = [
    {
      name: "title",
      labelKey: "titleField",
      placeholderKey: "titlePlaceholder",
      type: "text",
    },
    {
      name: "description",
      labelKey: "descriptionField",
      placeholderKey: "descriptionPlaceholder",
      type: "textarea",
    },
    {
      name: "quizCompletionFrequency",
      labelKey: "frequencyDaysField",
      placeholderKey: "frequencyDaysPlaceholder",
      type: "number",
    },
  ];

  return (
    <form className="space-y-4 overflow-y-auto pr-1 pl-1">
      {quizFieldConfigs.map((fieldConfig) => (
        <Controller
          key={fieldConfig.name}
          control={form.control}
          name={fieldConfig.name}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {tQuizzes(fieldConfig.labelKey)}
              </FieldLabel>
              {fieldConfig.type === "textarea" ? (
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={tQuizzes(fieldConfig.placeholderKey)}
                />
              ) : (
                <Input
                  {...field}
                  id={field.name}
                  type={fieldConfig.type === "number" ? "number" : "text"}
                  min={fieldConfig.type === "number" ? 1 : undefined}
                  value={field.value}
                  onChange={(event) =>
                    fieldConfig.type === "number"
                      ? field.onChange(Number(event.target.value || 0))
                      : field.onChange(event.target.value)
                  }
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder={tQuizzes(fieldConfig.placeholderKey)}
                />
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}

      <div className="space-y-4">
        <QuizActions
          title={tQuizzes("questionsField")}
          addQuestionLabel={tQuizzes("addQuestion")}
          onAddQuestion={handleAddQuestion}
        />

        {fields.map((field, questionIndex) => (
          <QuizQuestionEditor
            key={field.id}
            form={form}
            fieldId={field.id}
            questionIndex={questionIndex}
            answers={watchedQuestions?.[questionIndex]?.answers ?? []}
            correctAnswerIndex={
              watchedQuestions?.[questionIndex]?.correctAnswerIndex ?? 0
            }
            onRemoveQuestion={handleRemoveQuestion}
            onAddAnswer={handleAddAnswer}
            onRemoveAnswer={handleRemoveAnswer}
            translator={tQuizzes}
          />
        ))}

        <FieldError
          errors={[form.formState.errors.questions as { message?: string }]}
        />
      </div>
    </form>
  );
}
