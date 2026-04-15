"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { errorToaster } from "@/app/utils";
import { checkCompanyAccessAction } from "@/components/companies/company.server-action";
import { Routes } from "@/config/site.enums";

type CompanyRowLinkProps = {
  companyId: string;
  ariaLabel: string;
  backHref?: string;
};

export function CompanyRowLink({
  companyId,
  ariaLabel,
  backHref,
}: CompanyRowLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = async () => {
    const accessResult = await checkCompanyAccessAction(companyId);

    if (!accessResult.ok) {
      errorToaster(accessResult.message);
      return;
    }

    const currentQuery = searchParams.toString();
    const currentPath = `${pathname}${currentQuery ? `?${currentQuery}` : ""}`;
    const back = encodeURIComponent(backHref ?? currentPath);
    router.push(`${Routes.COMPANIES}/${companyId}?back=${back}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={ariaLabel}
    />
  );
}
