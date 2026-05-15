import { getTranslations } from "next-intl/server";

import { Table } from "@/components/shared/ui";
import { PaginationData, Quiz } from "@/lib/interfaces";
import TablePagination from "@/components/shared/table-pagination";
import { QuizzesTableHeader } from "@/components/quizzes/quizzes-table/quizzes-table-header";
import { QuizzesTableBody } from "@/components/quizzes/quizzes-table/quizzes-table-body";

type QuizzesTableProps = {
  companyId: string;
  data: PaginationData<Quiz[]>;
  route: string;
  canManage: boolean;
};

export async function QuizzesTable({
  companyId,
  data,
  route,
  canManage,
}: QuizzesTableProps) {
  const tQuizzes = await getTranslations("Quizzes");
  const quizzes = data.data;

  return (
    <section className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">{tQuizzes("listTitle")}</h2>
      </div>
      <Table className="min-w-[900px]">
        <QuizzesTableHeader />
        <QuizzesTableBody
          quizzes={quizzes}
          companyId={companyId}
          canManage={canManage}
        />
      </Table>
      {quizzes.length > 0 && <TablePagination route={route} data={data} />}
    </section>
  );
}
