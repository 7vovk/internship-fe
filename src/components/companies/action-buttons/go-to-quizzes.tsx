"use client";

import { Button } from "@/components/shared/ui";
import { checkCompanyAccessAction } from "@/components/companies/company.server-action";
import { errorToaster } from "@/app/utils";
import { Routes } from "@/config/site.enums";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface GoToQuizzesProps {
  companyId: string;
}

export function GoToQuizzes({ companyId }: GoToQuizzesProps) {
  const router = useRouter();
  const tButton = useTranslations("Buttons");

  const handleQuizzesClick = async () => {
    const accessResult = await checkCompanyAccessAction(companyId);

    if (!accessResult.ok) {
      errorToaster(accessResult.message);
      return;
    }

    router.push(`${`${Routes.COMPANIES}/${companyId}/quizzes`}`);
  };
  return (
    <Button
      className="text-black hover:bg-blue-500 hover:text-white"
      variant="outline"
      onClick={handleQuizzesClick}
    >
      {tButton("goToQuizzes")}
    </Button>
  );
}
