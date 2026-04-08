import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { auth0 } from "@/lib/auth0";
import { getTranslations } from "next-intl/server";
import { LoggedIn } from "./logged-in";
import { getMeInfo } from "@/lib/api/users";
import type { ApiError } from "@/lib/api/client";
import type { User } from "@/lib/api/interfaces";
import { toast } from "sonner";

export async function AuthButtons() {
  const tAuth = await getTranslations("Auth");
  const requestHeaders = await headers();
  const isJwtAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";

  const session = await auth0.getSession();
  const auth0User = session?.user;

  let userData: User | null = null;
  if (isJwtAuthenticated || auth0User) {
    try {
      userData = await getMeInfo();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message, { position: "top-right" });
    }
  }

  return (
    <div className="flex items-center gap-3">
      {isJwtAuthenticated || auth0User ? (
        <LoggedIn
          authType={auth0User ? "auth0" : "jwt"}
          auth0User={auth0User}
          currentUser={userData}
          logoutLabel={tAuth("logout")}
        />
      ) : (
        <a
          href={"/login"}
          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          {tAuth("sign_in")}
        </a>
      )}
    </div>
  );
}
