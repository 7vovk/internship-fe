"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/shared/ui";
import { Language } from "@/lib/enums/app.enums";

export const LanguageSelect = () => {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("General");
  const languageOptions = [
    { value: Language.UK, label: t(Language.UK) },
    { value: Language.EN, label: t(Language.EN) },
  ];

  const handleLanguageChange = (value: string | null) => {
    const expires = new Date(Date.now() + 31536000 * 1000).toUTCString();
    const secureFlag = window.location.protocol === "https:" ? "; secure" : "";
    const cookieOptions = `path=/; expires=${expires}; max-age=31536000; samesite=lax${secureFlag}`;

    document.cookie = `language=${encodeURIComponent(value!)}; ${cookieOptions}`;
    router.refresh();
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <span>{t(currentLocale)}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languageOptions.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
