import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ClientLink } from "@/app/components/client/client-link";
import { CfgNavigation } from "@/config/site.interface";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex items-center justify-between py-4">
        <Link className="text-lg font-semibold" href="/">
          {siteConfig.name}
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          {siteConfig.navigation.map((item: CfgNavigation) => (
            <ClientLink item={item} key={item.href} />
          ))}
        </nav>
      </Container>
    </header>
  );
}
