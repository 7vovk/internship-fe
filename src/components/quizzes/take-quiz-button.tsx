import Link from "next/link";
import { buttonVariants } from "@/components/shared/ui";
import { cn } from "@/lib/utils";

type TakeQuizButtonProps = {
  companyId: string;
  quizId: string;
  label: string;
};

export function TakeQuizButton({
  companyId,
  quizId,
  label,
}: TakeQuizButtonProps) {
  return (
    <Link
      href={`/companies/${companyId}/quizzes/${quizId}`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "hover:bg-green-500 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}
