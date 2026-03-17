"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { CfgNavigation } from "@/config/site.interface";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

type ClientLinkProps = {
  item: CfgNavigation;
};

export function ClientLink({ item }: ClientLinkProps) {
  const pathname = usePathname();

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
      {item.label}
    </Link>
  );
}
