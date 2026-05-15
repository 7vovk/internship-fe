import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageTemplate } from "@/components/shared/page-template";
import { BackButton } from "@/components/shared/ui";
import { QuizPageClient } from "@/components/quizzes/quiz-page-client";
import { type QuizForTaking, toQuizForTaking } from "@/lib/utils/quiz.utils";
import { getCompanyById } from "@/lib/api/companies";
import { getCompanyQuiz } from "@/lib/api/quizzes";
import { getCompanyAccess } from "@/lib/companies/company-access";
import { getCurrentUserCached } from "@/lib/utils";

type QuizPageProps = {
  params: Promise<{
    companyId: string;
    quizId: string;
  }>;
};

async function loadQuizForTaking(
  companyId: string,
  quizId: string,
): Promise<QuizForTaking | null> {
  try {
    const quiz = await getCompanyQuiz(companyId, quizId);
    return toQuizForTaking(quiz);
  } catch {
    return null;
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { companyId, quizId } = await params;
  const tQuizzes = await getTranslations("Quizzes");

  const company = await getCompanyById(companyId);
  const currentUser = await getCurrentUserCached();
  const { canView } = getCompanyAccess(company, currentUser?.id);

  if (!canView) {
    redirect(`/companies/${companyId}`);
  }

  const quiz = await loadQuizForTaking(companyId, quizId);

  if (!quiz) {
    return (
      <PageTemplate translator={tQuizzes} title={tQuizzes("takingQuiz")}>
        <div className="space-y-4">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <p className="text-red-500 text-center">{tQuizzes("loadError")}</p>
        </div>
      </PageTemplate>
    );
  }

  return <QuizPageClient companyId={companyId} quizId={quizId} quiz={quiz} />;
}
