import { getTranslations } from "next-intl/server";
import { TableBody, TableCell, TableRow } from "@/components/shared/ui";
import { NoRecordsRow } from "@/components/shared/no-records-row";
import { Quiz } from "@/lib/interfaces";
import { convertDate } from "@/app/utils/date.utils";
import { QuizModal } from "@/components/quizzes/quiz-modal";
import { QuizDelete } from "@/components/quizzes/quiz-delete";
import { TakeQuizButton } from "@/components/quizzes/take-quiz-button";

type QuizzesTableBodyProps = {
  quizzes: Quiz[];
  companyId: string;
  canManage: boolean;
};

export async function QuizzesTableBody({
  quizzes,
  companyId,
  canManage,
}: QuizzesTableBodyProps) {
  const t = await getTranslations("Quizzes");
  const QUIZZES_TABLE_COLUMN_COUNT = 8;

  return (
    <TableBody>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell className="h-14 px-4 py-3 font-medium whitespace-normal break-words align-top">
              {quiz.title}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 text-muted-foreground whitespace-normal break-words align-top">
              {quiz.description}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 whitespace-nowrap align-top">
              {quiz.quizCompletionFrequency}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 whitespace-nowrap align-top">
              {quiz.questions.length}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 whitespace-nowrap align-top">
              {convertDate(quiz.createDate, "dd/mm/yyyy, HH:MM:ss")}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 whitespace-nowrap align-top">
              {convertDate(quiz.updateDate, "dd/mm/yyyy, HH:MM:ss")}
            </TableCell>
            <TableCell className="h-14 px-4 py-3 align-top">
              <div className="flex flex-wrap justify-center gap-2">
                <TakeQuizButton
                  companyId={companyId}
                  quizId={quiz.id}
                  label={t("takeQuiz")}
                />
                {canManage && (
                  <>
                    <QuizModal
                      companyId={companyId}
                      quiz={quiz}
                      buttonClassName="hover:bg-yellow-500 hover:text-white"
                    />
                    <QuizDelete companyId={companyId} quizId={quiz.id} />
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <NoRecordsRow colSpan={QUIZZES_TABLE_COLUMN_COUNT} />
      )}
    </TableBody>
  );
}
