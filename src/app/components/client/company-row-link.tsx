"use client";

import { useRouter } from "next/navigation";
import { errorToaster } from "@/app/utils";
import { checkCompanyAccessAction } from "@/components/companies/company.server-action";
import { Routes } from "@/config/site.enums";
import { Button } from "@/components/shared/ui";

type CompanyRowLinkProps = {
  companyId: string;
  ariaLabel: string;
};

export function CompanyRowLink({ companyId, ariaLabel }: CompanyRowLinkProps) {
  const router = useRouter();

  const handleClick = async () => {
    const accessResult = await checkCompanyAccessAction(companyId);

    if (!accessResult.ok) {
      errorToaster(accessResult.message);
      return;
    }

    router.push(`${Routes.COMPANIES}/${companyId}`);
  };

  return (
    <Button
      onClick={handleClick}
      className="absolute inset-0 z-10 cursor-pointer h-full bg-transparent"
      aria-label={ariaLabel}
    />
  );
}
