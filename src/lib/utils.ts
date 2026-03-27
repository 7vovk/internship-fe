import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { _Translator } from "next-intl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(
  translator: _Translator<Record<string, string>>,
  text: string,
): string {
  return translator(text);
}
