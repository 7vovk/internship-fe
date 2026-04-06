import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/container";
import { ClientLink } from "@/app/components/client/client-link";
import { CfgNavigation } from "@/config/site.interface";
import { getTranslations } from "next-intl/server";
import { LanguageSelect } from "@/app/components/client/language-select";
import { AuthButtons } from "@/app/components/header/auth-buttons";
import { Logo } from "@/components/ui/logo";

export async function Header() {
  const layout = await getTranslations("Layout");

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex items-center justify-between py-4">
        <Link className="text-lg font-semibold" href="/">
          <div className="flex items-center justify-between">
            <Logo className="mr-2" height={20} width={20} />
            {layout(siteConfig.title)}
          </div>
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
