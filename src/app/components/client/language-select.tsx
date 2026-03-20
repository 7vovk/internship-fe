"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export const LanguageSelect = () => {
  const router = useRouter();
  const currentLocale = useLocale();

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
    <select onChange={handleLanguageChange} defaultValue={currentLocale}>
      <option value="uk">Ukrainian</option>
      <option value="en">English</option>
    </select>
  );
};
