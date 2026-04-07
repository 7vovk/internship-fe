"use client";

import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";

type SessionLogoutButtonProps = {
  label: string;
  authType: "auth0" | "jwt";
};

export function SessionLogoutButton({
  label,
  authType,
}: SessionLogoutButtonProps) {
  const router = useRouter();

  async function onLogout() {
    await handleLogout();

    if (authType === "auth0") {
      const returnTo = `${window.location.origin}/`;
      window.location.href = `/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={onLogout}
    >
      {label}
    </Button>
  );
}
