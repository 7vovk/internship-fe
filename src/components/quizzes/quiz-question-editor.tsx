"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
} from "@/components/shared/ui";
import { QuizFormValues } from "@/lib/interfaces";
import { _Translator } from "next-intl";

type QuizQuestionEditorProps = {
  form: UseFormReturn<QuizFormValues>;
  fieldId: string;
  questionIndex: number;
  answers: string[];
  correctAnswerIndexes: number[];
  translator: _Translator<Record<string, string>>;
  onRemoveQuestion: (questionIndex: number) => void;
  onAddAnswer: (questionIndex: number) => void;
  onRemoveAnswer: (questionIndex: number, answerIndex: number) => void;
};

export function QuizQuestionEditor({
  form,
  fieldId,
  questionIndex,
  answers,
  correctAnswerIndexes,
  translator,
  onRemoveQuestion,
  onAddAnswer,
  onRemoveAnswer,
}: QuizQuestionEditorProps) {
  return (
    <article className="rounded-lg border p-3 space-y-3 bg-card">
      <header className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium">
          {translator("questionNumber", { number: questionIndex + 1 })}
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRemoveQuestion(questionIndex)}
        >
          {translator("removeQuestion")}
        </Button>
      </header>

      <Controller
        control={form.control}
        name={`questions.${questionIndex}.question`}
        render={({ field: questionField, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={questionField.name}>
              {translator("questionField")}
            </FieldLabel>
            <Input
              {...questionField}
              id={questionField.name}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              placeholder={translator("questionPlaceholder")}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <fieldset className="space-y-2">
        <legend className="sr-only">{translator("answersField")}</legend>
        <div className="flex items-center justify-between">
          <FieldLabel>{translator("answersField")}</FieldLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddAnswer(questionIndex)}
          >
            {translator("addAnswer")}
          </Button>
        </div>

        <ul className="space-y-2">
          {answers.map((_, answerIndex) => (
            <li key={`${fieldId}-${answerIndex}`} className="flex gap-2">
              <Controller
                control={form.control}
                name={`questions.${questionIndex}.answers.${answerIndex}`}
                render={({ field: answerField, fieldState }) => (
                  <div className="w-full">
                    <Input
                      {...answerField}
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      placeholder={translator("answerPlaceholder", {
                        number: answerIndex + 1,
                      })}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveAnswer(questionIndex, answerIndex)}
              >
                {translator("removeAnswer")}
              </Button>
            </li>
          ))}
        </ul>

        <FieldError
          errors={[
            form.formState.errors.questions?.[questionIndex]?.answers as
              | { message?: string }
              | undefined,
          ]}
        />
      </fieldset>

      <Controller
        control={form.control}
        name={`questions.${questionIndex}.correctAnswerIndexes`}
        render={({ field: correctField, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              {correctAnswerIndexes.length > 1
                ? translator("correctAnswersField")
                : translator("correctAnswerField")}
            </FieldLabel>
            <ul className="flex flex-wrap gap-2">
              {answers.map((answer, answerIndex) => {
                const selected = correctField.value?.includes(answerIndex);
                return (
                  <li key={`${fieldId}-correct-${answerIndex}`}>
                    <Button
                      type="button"
                      variant={selected ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        const current = correctField.value ?? [];
                        const next = selected
                          ? current.filter((index) => index !== answerIndex)
                          : [...current, answerIndex];
                        correctField.onChange(next);
                      }}
                    >
                      {answer.trim() ||
                        translator("answerNumber", {
                          number: answerIndex + 1,
                        })}
                    </Button>
                  </li>
                );
              })}
            </ul>
            <ul className="text-sm text-muted-foreground">
              {(correctField.value ?? []).map((index, selectedIndex, all) => (
                <li key={`${fieldId}-selected-${index}`} className="inline">
                  {answers[index]?.trim() ||
                    translator("answerNumber", { number: index + 1 })}
                  {selectedIndex < all.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </article>
  );
}
