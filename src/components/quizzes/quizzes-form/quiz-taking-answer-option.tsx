import { cn } from "@/lib/utils";

type QuizTakingAnswerOptionProps = {
  answer: string;
  isSelected: boolean;
  isDisabled: boolean;
  onChange: (isChecked: boolean) => void;
};

export function QuizTakingAnswerOption({
  answer,
  isSelected,
  isDisabled,
  onChange,
}: QuizTakingAnswerOptionProps) {
  return (
    <label
      className={cn(
        "flex items-center p-3 border rounded cursor-pointer transition-colors hover:bg-accent",
        isSelected && "border-primary",
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(event) => onChange(event.target.checked)}
        className={cn(
          "mr-3 size-4 cursor-pointer accent-primary",
          isSelected && "accent-primary-foreground",
        )}
        disabled={isDisabled}
      />
      <span className="flex-1">{answer}</span>
    </label>
  );
}
