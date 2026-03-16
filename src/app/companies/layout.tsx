import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
  description: "Information about companies",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
