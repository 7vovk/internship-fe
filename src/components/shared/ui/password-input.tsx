"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const resolvedType = isPasswordVisible ? "text" : "password";

  return (
    <div className="relative">
      <InputPrimitive
        {...props}
        type={resolvedType}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 pr-8",
          className,
        )}
      />

      <button
        type="button"
        tabIndex={-1}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        aria-pressed={isPasswordVisible}
        className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsPasswordVisible((previous) => !previous)}
      >
        {isPasswordVisible ? (
          <EyeOffIcon className="size-4 cursor-pointer" />
        ) : (
          <EyeIcon className="size-4 cursor-pointer" />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
