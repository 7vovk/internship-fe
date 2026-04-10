import * as React from "react";

import { Textarea } from "./textarea";
import { useTranslations } from "next-intl";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  maxLength?: number;
};

const TextareaCharLeft = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ maxLength = 300, onChange, value, ...props }, ref) => {
    const resolvedValue = typeof value === "string" ? value : "";
    const characterCount = resolvedValue.length;
    const t = useTranslations("General");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-2">
        <Textarea
          ref={ref}
          value={resolvedValue}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        <p className="text-muted-foreground text-xs">
          <span className="tabular-nums">{maxLength - characterCount}</span>{" "}
          {t("charsLeft")}
        </p>
      </div>
    );
  },
);

TextareaCharLeft.displayName = "TextareaCharLeft";

export default TextareaCharLeft;
