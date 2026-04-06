import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "./config/site.config";
import { CfgNavigation, Routes } from "./config/site.interface";
import { AuthHeader } from "@/lib/enums/auth.enums";
import { auth0 } from "@/lib/auth0";

const routes: Routes = siteConfig.navigation.reduce(
  (acc: Routes, curr: CfgNavigation) => {
    if (curr.public) {
      return { public: [...acc.public, curr.href], protected: acc.protected };
    }
    return { public: acc.public, protected: [...acc.protected, curr.href] };
  },
  { public: [], protected: [] },
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function forwardSetCookies(from: Response, to: NextResponse): void {
  const headers = from.headers;
  if (typeof headers.getSetCookie === "function") {
    for (const cookie of headers.getSetCookie()) {
      to.headers.append("set-cookie", cookie);
    }
    return;
  }
  const single = headers.get("set-cookie");
  if (single) {
    to.headers.append("set-cookie", single);
  }
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  let auth0Response: NextResponse | null = null;
  if (path.startsWith("/auth")) {
    auth0Response = await auth0.middleware(req);
    const isRedirect =
      auth0Response.status >= 300 && auth0Response.status < 400;
    if (isRedirect) {
      return auth0Response;
    }
  }

  let isAuth0Authenticated: boolean;
  try {
    const auth0Session = await auth0.getSession(req);
    isAuth0Authenticated = Boolean(auth0Session?.user);
  } catch {
    isAuth0Authenticated = false;
  }

  const isProtectedRoute = routes.protected.includes(path);
  const isPublicRoute = routes.public.includes(path);

  const cookieHeader = req.headers.get("cookie") ?? "";
  const isJwtAuthenticated = /(?:^|;\s*)Authentication=/.test(cookieHeader);

  const isLoggedIn = isJwtAuthenticated || isAuth0Authenticated;

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    (isPublicRoute && isLoggedIn && req.nextUrl.pathname === "/login") ||
    (isLoggedIn && req.nextUrl.pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(AuthHeader.AUTHENTICATED, String(isJwtAuthenticated));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isAuth0Authenticated && !isJwtAuthenticated) {
    const auth = await auth0.getAccessToken(req, response, {
      audience: process.env.AUTH0_AUDIENCE,
    });
    if (auth.token) {
      const meRes = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (meRes.ok) {
        forwardSetCookies(meRes, response);
      }
    }
  }

  const auth0SetCookie = auth0Response?.headers.get("set-cookie");
  if (auth0SetCookie) {
    response.headers.append("set-cookie", auth0SetCookie);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)",
  ],
};
