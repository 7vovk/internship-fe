import { useTranslations } from "next-intl";
import { Button } from "@/components/shared/ui";

type QuizTakingSubmitProps = {
  isLoading: boolean;
};

export function QuizTakingSubmit({ isLoading }: QuizTakingSubmitProps) {
  const t = useTranslations("Quizzes");

  return (
    <div className="flex justify-center gap-4">
      <Button
        type="submit"
        disabled={isLoading}
        className="hover:bg-blue-500 hover:text-white"
      >
        {isLoading ? t("submitting") : t("submit")}
      </Button>
    </div>
  );
}
