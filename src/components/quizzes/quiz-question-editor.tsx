"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/shared/ui";
import { QuizFormValues } from "@/lib/interfaces";
import { _Translator } from "next-intl";

type QuizQuestionEditorProps = {
  form: UseFormReturn<QuizFormValues>;
  fieldId: string;
  questionIndex: number;
  answers: string[];
  correctAnswerIndex: number;
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
  correctAnswerIndex,
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
        name={`questions.${questionIndex}.correctAnswerIndex`}
        render={({ field: correctField, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{translator("correctAnswerField")}</FieldLabel>
            <Select
              value={String(correctField.value ?? 0)}
              onValueChange={(value) => correctField.onChange(Number(value))}
            >
              <SelectTrigger>
                <span>
                  {answers[correctAnswerIndex]?.trim() ||
                    translator("answerNumber", {
                      number: (correctAnswerIndex ?? 0) + 1,
                    })}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {answers.map((answer, answerIndex) => (
                    <SelectItem
                      key={`${fieldId}-correct-${answerIndex}`}
                      value={String(answerIndex)}
                    >
                      {answer.trim() ||
                        translator("answerNumber", {
                          number: answerIndex + 1,
                        })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </article>
  );
}
