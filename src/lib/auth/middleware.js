// middleware.js
import { NextResponse } from "next/server";

const PROTECTED_PREFIX = [
  "/dashboard",
  "/categories",
  "/transactions",
  "/analytics",
  "/goals",
];

const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// onboarding ကို public လုပ်မယ်
const ONBOARDING_PATH = "/onboarding";

export function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;

  // allow next internal + static
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // ✅ cookie token check (clean)
  const token = req.cookies.get("access_token")?.value;
  const hasAccess = !!token;

  const isProtected = PROTECTED_PREFIX.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));
  const isOnboarding = pathname.startsWith(ONBOARDING_PATH);

  // 1) token မရှိ + protected => /login
  if (!hasAccess && isProtected) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 2) token ရှိ + auth page => onboarding step=1 (categories step)
  if (hasAccess && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/onboarding";
    url.searchParams.set("step", "1");
    return NextResponse.redirect(url);
  }

  // 3) onboarding page => public (token မလို) (no redirect)
  //    ဒါပေမယ့် token ရှိပြီး onboarding ကို step=0 နဲ့ပြန်ဝင်ရင် step=1 သို့ပို့ချင်လို့ optional rule ထည့်မယ်
  if (hasAccess && isOnboarding) {
    const step = searchParams.get("step");
    // step မပါတဲ့ onboarding (default step 0) ကို login user မကြည့်စေချင်ရင်
    if (!step || step === "0") {
      const url = req.nextUrl.clone();
      url.pathname = "/onboarding";
      url.searchParams.set("step", "1");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
