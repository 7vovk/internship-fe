import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/shared/ui/index";
import { JSX } from "react";
import { getTranslations } from "next-intl/server";

export async function BackButton({
  href,
}: {
  href: string;
}): Promise<JSX.Element> {
  const t = await getTranslations("Buttons");
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "outline",
        size: "default",
        className: "mb-4 inline-flex w-fit",
      })}
      aria-label={t("back")}
    >
      <ArrowLeft className="size-4" />
    </Link>
  );
}
