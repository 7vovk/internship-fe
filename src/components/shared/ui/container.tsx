import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
