import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { env } from "@/app/utils/env.utils";

export const auth0 = new Auth0Client({
  appBaseUrl: env.NEXT_PUBLIC_APP_URL,
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email",
  },
});
