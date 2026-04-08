"use client";

import { Button } from "@/components/ui/button";
import { useAuth, type AuthType } from "@/hooks/useAuth.hook";

type SessionLogoutButtonProps = {
  label: string;
  authType: AuthType;
};

export function SessionLogoutButton({
  label,
  authType,
}: SessionLogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button
      type="button"
      variant="outline"
      className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={() => logout(authType)}
    >
      {label}
    </Button>
  );
}
