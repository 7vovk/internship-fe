import { headers } from "next/headers";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { auth0 } from "@/lib/auth0";
import { getTranslations } from "next-intl/server";
import { LoggedIn } from "./logged-in";

export async function AuthButtons() {
  const auth = await getTranslations("Auth");
  const requestHeaders = await headers();
  const isJwtAuthenticated =
    requestHeaders.get(AuthHeader.AUTHENTICATED)?.toLowerCase() === "true";

  const session = await auth0.getSession();
  const auth0User = session?.user;

  return (
    <div className="flex items-center gap-3">
      {isJwtAuthenticated || auth0User ? (
        <LoggedIn
          authType={auth0User ? "auth0" : "jwt"}
          auth0User={auth0User}
          logoutLabel={auth("logout")}
        />
      ) : (
        <a
          href={"/login"}
          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          {auth("sign_in")}
        </a>
      )}
    </div>
  );
}
