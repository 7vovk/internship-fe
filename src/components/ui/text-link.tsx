import * as React from "react";

import { cn } from "@/lib/utils";

export function TextLink({
  className,
  link,
  linkText,
  text,
  ...props
}: React.ComponentProps<"a"> & {
  link: string;
  linkText: string;
  text: string;
}) {
  return (
    <p className="mt-4 text-sm leading-6 flex items-center justify-center">
      {text}
      <a
        href={link}
        className={cn(
          "ml-1 text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 hover:underline",
          className,
        )}
        {...props}
      >
        {linkText}
      </a>
    </p>
  );
}
