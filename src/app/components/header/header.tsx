import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/container";
import { ClientLink } from "@/app/components/client/client-link";
import { CfgNavigation } from "@/config/site.interface";
import { getTranslations } from "next-intl/server";
import { LanguageSelect } from "@/app/components/client/language-select";
import { AuthButtons } from "@/app/components/header/auth-buttons";

export async function Header() {
  const layout = await getTranslations("Layout");

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex items-center justify-between py-4">
        <Link className="text-lg font-semibold" href="/">
          {layout(siteConfig.title)}
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          {siteConfig.navigation.map((item: CfgNavigation) => (
            <ClientLink item={item} key={item.href} />
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-end gap-5">
          <LanguageSelect />
          <AuthButtons />
        </div>
      </Container>
    </header>
  );
}
