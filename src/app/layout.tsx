import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/header/header";
import { siteConfig } from "@/config/site.config";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import StoreProvider from "@/lib/store/store-provider";
import React from "react";
import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const layout = await getTranslations("Layout");
  return {
    title: layout(siteConfig.title),
    description: layout("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const requestHeaders = await headers();
  const isAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";
  const userId = requestHeaders.get(AuthHeader.USER_ID);
  const userRoles = requestHeaders.get(AuthHeader.USER_ROLES);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
          </NextIntlClientProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
