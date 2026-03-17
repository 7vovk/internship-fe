import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "users list",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
