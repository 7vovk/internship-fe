"use client";

import { useRouter } from "next/navigation";
import { handleLogin, handleLogout } from "@/lib/api/auth";
import { Routes } from "@/config/site.enums";
import { update } from "@/lib/features/auth/auth-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { LoginRequest } from "@/lib/api/interfaces";
import { parseErrorMessage } from "@/lib/errors";
import { toast } from "sonner";

export type AuthType = "auth0" | "jwt";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function logout(authType: AuthType): Promise<void> {
    await handleLogout();

    if (authType === "auth0") {
      const returnTo = `${window.location.origin}${Routes.HOME}`;
      window.location.href = `${Routes.AUTH0_LOGOUT}?returnTo=${encodeURIComponent(returnTo)}`;
      return;
    }

    router.replace(Routes.HOME);
    router.refresh();
  }

  function navigateToHome(): void {
    router.replace(Routes.HOME);
    router.refresh();
  }

  async function submitLogin({
    email,
    password,
    showCreateToast,
  }: LoginRequest & { showCreateToast?: boolean }): Promise<void> {
    try {
      const result = await handleLogin({ email, password });
      if (result.statusCode === 200) {
        const user = result.result?.user;

        if (user) {
          dispatch(
            update({
              isAuthenticated: true,
              userId: user.id,
              userRoles: user.roles?.length ? user.roles.join(", ") : null,
            }),
          );
        }
        if (showCreateToast) {
          toast.success("Account has been created successfully.", {
            position: "top-center",
            onDismiss: navigateToHome,
            onAutoClose: navigateToHome,
            action: {
              label: "Ok",
              onClick: navigateToHome,
            },
          });
        } else {
          navigateToHome();
        }
      }
    } catch (error) {
      const message = parseErrorMessage(error);
      toast.error(message, { position: "top-right" });
    }
  }

  return {
    logout,
    submitLogin,
  };
}
