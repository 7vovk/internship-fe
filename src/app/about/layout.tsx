import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Information about the project",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
