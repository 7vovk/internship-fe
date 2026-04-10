import { Tooltip, TooltipContent, TooltipTrigger } from "./ui";
import React, { JSX } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export function TooltipWrapper({
  children,
  text,
}: TooltipPrimitive.Popup.Props & { text: string }): JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="bg-gray-200 text-gray-900 [&>*:last-child]:!bg-gray-200 [&>*:last-child]:!fill-gray-200">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
