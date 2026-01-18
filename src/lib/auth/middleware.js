// middleware.js
import { NextResponse } from "next/server";

const PROTECTED_PREFIX = ["/dashboard", "/categories", "/transactions", "/analytics", "/goals"];
const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookie = req.headers.get("cookie") || "";
  const hasAccess = cookie.includes("access_token=");

  const isProtected = PROTECTED_PREFIX.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  // Not logged in → protected route blocked
  if (isProtected && !hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Logged in → prevent going back to login/register
  if (isAuthPage && hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|api).*)"],
};
