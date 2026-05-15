import { TableHead, TableHeader, TableRow } from "@/components/shared/ui";
import { getTranslations } from "next-intl/server";

export async function QuizzesTableHeader() {
  const tGeneral = await getTranslations("General");
  const tQuizzes = await getTranslations("Quizzes");

  return (
    <TableHeader>
      <TableRow className="border-b hover:bg-transparent">
        <TableHead className="h-12 min-w-[170px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tQuizzes("titleField")}
        </TableHead>
        <TableHead className="h-12 min-w-[220px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tQuizzes("descriptionField")}
        </TableHead>
        <TableHead className="h-12 min-w-[160px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tQuizzes("frequencyDaysField")}
        </TableHead>
        <TableHead className="h-12 min-w-[120px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tQuizzes("questionsCount")}
        </TableHead>
        <TableHead className="h-12 min-w-[160px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tGeneral("createDate")}
        </TableHead>
        <TableHead className="h-12 min-w-[160px] px-4 py-3 font-medium whitespace-normal break-words align-top">
          {tGeneral("updateDate")}
        </TableHead>
        {
          <TableHead className="h-12 min-w-[220px] px-4 py-3 text-center font-medium whitespace-normal break-words align-top">
            {tGeneral("actions")}
          </TableHead>
        }
      </TableRow>
    </TableHeader>
  );
}
