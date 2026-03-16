import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
