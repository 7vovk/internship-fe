import React from "react";
import StoreProvider from "@/lib/store/store-provider";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/app/components";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";

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
        <Header />
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
