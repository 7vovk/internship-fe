import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { parsePaginationParams } from "@/app/utils/pagination.utils";
import { getCompanyById } from "@/lib/api/companies";
import { getCompanyQuizzes } from "@/lib/api/quizzes";
import { BackButton } from "@/components/shared/ui";
import { QuizModal } from "@/components/quizzes/quiz-modal";
import { QuizzesTable } from "@/components/quizzes/quizzes-table/quizzes-table";
import { getCurrentUserCached } from "@/lib/utils";
import { PaginationData, Quiz } from "@/lib/interfaces";
import { redirect } from "next/navigation";

type QuizzesPageProps = {
  params: Promise<{
    companyId: string;
  }>;
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function QuizzesPage({
  params,
  searchParams,
}: QuizzesPageProps) {
  const tQuizzes = await getTranslations(siteConfig.pages.quizzes.translation);
  const resolvedSearchParams = await searchParams;
  const { companyId } = await params;
  const { page, limit } = parsePaginationParams(resolvedSearchParams);
  const company = await getCompanyById(companyId);
  const currentUser = await getCurrentUserCached();
  const isOwner = company.ownerId === currentUser?.id;
  const isAdmin = company.admins.some((admin) => admin.id === currentUser?.id);
  const isMember = company.members.some(
    (member) => member.id === currentUser?.id,
  );
  const canView = isOwner || isAdmin || isMember;
  const canManage = isOwner || isAdmin;

  if (!canView) {
    redirect(`/companies/${companyId}`);
  }

  const quizzesData: PaginationData<Quiz[]> = await getCompanyQuizzes(
    companyId,
    { page, limit },
  );

  return (
    <PageTemplate
      translator={tQuizzes}
      title={`${tQuizzes("title")} - ${company.name}`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BackButton />
          {canManage && (
            <QuizModal
              companyId={companyId}
              buttonClassName="hover:bg-blue-500 hover:text-white"
            />
          )}
        </div>
        <QuizzesTable
          companyId={companyId}
          data={quizzesData}
          route={`/companies/${companyId}/quizzes`}
          canManage={canManage}
        />
      </div>
    </PageTemplate>
  );
}
