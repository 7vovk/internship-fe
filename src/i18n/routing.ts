import { defineRouting } from "next-intl/routing";
import { Language } from "@/lib/enums/app.enums";

export const routing = defineRouting({
  locales: [Language.EN, Language.UK],
  defaultLocale: Language.EN,
});
