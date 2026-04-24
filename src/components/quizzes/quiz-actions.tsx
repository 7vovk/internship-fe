"use client";

import { Button } from "@/components/shared/ui";

type QuizActionsProps = {
  title: string;
  addQuestionLabel: string;
  onAddQuestion: () => void;
};

export function QuizActions({
  title,
  addQuestionLabel,
  onAddQuestion,
}: QuizActionsProps) {
  return (
    <header className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      <Button type="button" variant="outline" size="sm" onClick={onAddQuestion}>
        {addQuestionLabel}
      </Button>
    </header>
  );
}
