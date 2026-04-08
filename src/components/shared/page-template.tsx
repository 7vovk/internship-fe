import Link from "next/link";
import * as React from "react";

import type { TemplateAction } from "@/config/site.interface";
import { buttonVariants } from "@/components/ui/button-variants";
import { Container } from "@/components/ui/container";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { _Translator } from "next-intl";

type PageTemplateProps = {
  translator: _Translator<Record<string, string>>;
  title?: string;
  actions?: TemplateAction[];
  extraActions?: React.ReactNode;
  children?: React.ReactNode;
  footerText?: string;
  className?: string;
};

export function PageTemplate({
  translator,
  title,
  actions = [],
  extraActions,
  children,
  footerText,
  className,
}: PageTemplateProps) {
  return (
    <div className={cn("min-h-1 bg-background pb-16 pt-20", className)}>
      <Container className="flex min-h-[calc(90vh-8rem)] flex-col items-center justify-start text-center">
        <div className="w-full space-y-6">
          <TypographyH1>{title ? title : translator("title")}</TypographyH1>
          {translator.has("description") && (
            <TypographyLead>{translator("description")}</TypographyLead>
          )}

          {(actions.length > 0 || extraActions) && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {actions.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  className={buttonVariants({
                    variant: action.variant ?? "default",
                    size: "lg",
                  })}
                  href={action.href}
                >
                  {translator ? translator(action.label) : action.label}
                </Link>
              ))}
              {extraActions}
            </div>
          )}

          {children}

          {footerText && <TypographyMuted>{footerText}</TypographyMuted>}
        </div>
      </Container>
    </div>
  );
}
