"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export const LanguageSelect = () => {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("General");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLocale = event.target.value;
    const expires = new Date(Date.now() + 31536000 * 1000).toUTCString();
    const secureFlag = window.location.protocol === "https:" ? "; secure" : "";
    const cookieOptions = `path=/; expires=${expires}; max-age=31536000; samesite=lax${secureFlag}`;

    document.cookie = `language=${encodeURIComponent(newLocale)}; ${cookieOptions}`;
    router.refresh();
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={currentLocale}
      className="cursor-pointer"
    >
      <option value="uk">{t("uk")}</option>
      <option value="en">{t("en")}</option>
    </select>
  );
};
