import React from "react";
import StoreProvider from "@/lib/store/store-provider";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/app/components/header/header";
import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { Toaster, TooltipProvider } from "@/components/shared/ui";

export default async function AppProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const requestHeaders = await headers();
  const isAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";
  const userId = requestHeaders.get(AuthHeader.USER_ID);
  const userRoles = requestHeaders.get(AuthHeader.USER_ROLES);

  return (
    <StoreProvider
      preloadedState={{
        auth: {
          isAuthenticated,
          userId,
          userRoles,
        },
      }}
    >
      <NextIntlClientProvider locale={locale}>
        <TooltipProvider>
          <Header />
          {children}
          <Toaster />
        </TooltipProvider>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
