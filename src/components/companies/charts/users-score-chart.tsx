import BarChartComponent from "@/components/companies/charts/bar-chart";
import { getAllUsersRating, getAverageUserRating } from "@/lib/api/quizzes";
import { UsersScore } from "@/lib/interfaces";

async function getUsersAverageScore(): Promise<UsersScore | null> {
  const user = await getAverageUserRating();
  const allUsers = await getAllUsersRating();
  return user.score
    ? { user: user.score * 10, allUsers: allUsers.score * 10 }
    : null;
}

export default async function UsersScoreChart() {
  const score = await getUsersAverageScore();
  if (!score) {
    return;
  }

  const info = {
    labels: ["Score %"],
    datasets: [
      {
        label: "All users average rating",
        data: [score.allUsers],
        backgroundColor: "#2b7fffaa",
      },
      {
        label: "Your rating",
        data: [score.user],
        backgroundColor: "#ffdf20aa",
      },
    ],
  };

  return <BarChartComponent data={info} title={"General quiz rating"} />;
}
