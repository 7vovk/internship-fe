import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "use-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("language")?.value;

  const locale =
    (cookieLocale &&
      hasLocale(routing.locales, cookieLocale) &&
      cookieLocale) ||
    routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
