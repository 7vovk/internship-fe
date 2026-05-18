import LineChartComponent from "@/components/companies/charts/line-chart";
import type { LineChartData } from "@/components/companies/charts/chart.types";
import { convertDate } from "@/app/utils/date.utils";
import { getUserInfoById } from "@/lib/api/users";
import type { QuizScoreDynamicsItem } from "@/lib/interfaces/user.interface";

export default async function UserAllQuizzesScoreChart({
  userId,
}: {
  userId: string;
}) {
  const { quizScoreDynamics } = await getUserInfoById(userId);
  if (!quizScoreDynamics.length) {
    return;
  }

  const initialChartData: LineChartData = {
    labels: [],
    datasets: [
      {
        label: "Score %",
        data: [],
        borderColor: "#ffdf20aa",
        backgroundColor: "#ffdf20",
      },
    ],
  };

  const info = quizScoreDynamics.reduce<LineChartData>(
    (acc: LineChartData, curr: QuizScoreDynamicsItem) => {
      if (!curr.lastCompletedAt || !curr.averageScore) {
        return acc;
      }

      return {
        ...acc,
        labels: [
          ...(acc.labels ?? []),
          convertDate(curr.lastCompletedAt.toString(), "dd/mm/yyyy"),
        ],
        datasets: [
          {
            ...acc.datasets[0],
            data: [...(acc.datasets[0]?.data ?? []), curr.averageScore * 10],
          },
        ],
      };
    },
    initialChartData,
  );

  return (
    <LineChartComponent
      data={info}
      title={"Your average scores for each quiz across all companies"}
    />
  );
}
