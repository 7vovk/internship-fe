import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const tCompanies = await getTranslations("Companies");
  return {
    title: tCompanies("title"),
    description: tCompanies("description"),
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
