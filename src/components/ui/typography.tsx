import * as React from "react";

import { cn } from "@/lib/utils";

type TypographyProps = React.ComponentProps<"p">;
type HeadingProps = React.ComponentProps<"h1">;

export function TypographyH1({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyLead({ className, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyMuted({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}
