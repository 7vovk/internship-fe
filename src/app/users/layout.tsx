import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const tUsers = await getTranslations("Users");
  return {
    title: tUsers("title"),
    description: tUsers("description"),
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
