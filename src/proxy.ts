import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "./config/site.config";
import { CfgNavigation, Routes } from "./config/site.interface";
import { AuthHeader } from "@/lib/enums/auth.enums";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const AUTH_CHECK_PATH = "/me";

// 1. Specify protected and public routes
const routes: Routes = siteConfig.navigation.reduce(
  (acc: Routes, curr: CfgNavigation) => {
    if (curr.public) {
      return { public: [...acc.public, curr.href], protected: acc.protected };
    }
    return { public: acc.public, protected: [...acc.protected, curr.href] };
  },
  { public: [], protected: [] },
);

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = routes.protected.includes(path);
  const isPublicRoute = routes.public.includes(path);

  // 3. Verify auth against backend by forwarding incoming cookies
  const cookieHeader = req.headers.get("cookie") ?? "";
  let isAuthenticated = false;
  let userId: string | null = null;
  let userRoles: string[] = [];

  if (cookieHeader) {
    try {
      const authResponse = await fetch(`${API_URL}${AUTH_CHECK_PATH}`, {
        method: "GET",
        headers: {
          cookie: cookieHeader,
          accept: "application/json",
        },
      });
      isAuthenticated = authResponse.ok;
      if (authResponse.ok) {
        const authData = await authResponse.json();
        userId = authData?.result?.id ?? "";
        userRoles = authData?.result?.roles ?? [];
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect authenticated users away from public auth pages
  if (
    (isPublicRoute && isAuthenticated && req.nextUrl.pathname === "/login") ||
    (isAuthenticated && req.nextUrl.pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(AuthHeader.AUTHENTICATED, String(isAuthenticated));

  if (userId) {
    requestHeaders.set(AuthHeader.USER_ID, userId);
  } else {
    requestHeaders.delete(AuthHeader.USER_ID);
  }

  if (userRoles) {
    requestHeaders.set(AuthHeader.USER_ROLES, userRoles.join(", "));
  } else {
    requestHeaders.delete(AuthHeader.USER_ROLES);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
