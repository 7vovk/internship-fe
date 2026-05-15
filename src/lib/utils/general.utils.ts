import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cache } from "react";
import type { User } from "@/lib/interfaces";
import { getMeInfo } from "@/lib/api/users";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentUserCached = cache(async (): Promise<User | null> => {
  try {
    return await getMeInfo();
  } catch {
    return null;
  }
});
