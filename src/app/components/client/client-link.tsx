"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { CfgNavigation } from "@/config/site.interface";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { useTranslations } from "next-intl";

type ClientLinkProps = {
  item: CfgNavigation;
};

export function ClientLink({ item }: ClientLinkProps) {
  const pathname = usePathname();
  const tLayout = useTranslations("Layout");

  return (
    <Link
      className={cn(
        buttonVariants({
          variant:
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "outline"
              : "ghost",
          size: "sm",
        }),
        "text-sm",
      )}
      href={item.href}
    >
      {tLayout(item.label)}
    </Link>
  );
}
