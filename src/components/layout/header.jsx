// src/components/layout/header.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Sun, Moon, User, LogIn, LogOut, X } from "lucide-react";

import { useAuth } from "@/lib/store/auth-store";
import { getAccessToken } from "@/lib/auth/storage"; // ✅ IMPORTANT (token check)

const NAV = [
  { href: "/dashboard", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/transactions", label: "Transactions" },
  { href: "/analytics", label: "Analytics" },
];

function isActive(pathname, href) {
  if (!pathname) return false;
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function useThemeMode() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bf-theme");
    const initial = saved || "dark";
    setMode(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("bf-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { mounted, mode, toggle };
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { mounted, mode, toggle } = useThemeMode();

  const user = useAuth((s) => s.user);
  const boot = useAuth((s) => s.boot);
  const logout = useAuth((s) => s.logout);

  // ✅ refresh/load မှာ user preload
  useEffect(() => {
    boot?.();
  }, [boot]);

  // ✅ FIX: authed boolean (no function call)
  const authed = !!getAccessToken?.();

  // profile dropdown
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  // mobile menu
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // close menus on route change
  useEffect(() => {
    setOpenMobile(false);
    setOpenProfile(false);
  }, [pathname]);

  const activeLabel = useMemo(() => {
    const found = NAV.find((n) => isActive(pathname, n.href));
    return found?.label || "Home";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-b from-[#070a14] to-[#0b1020] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          {/* ✅ Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpenMobile(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Brand */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 min-w-[160px]"
            onClick={(e) => {
              // client side only guard (optional)
              if (typeof window !== "undefined") {
                const token = localStorage.getItem("access_token");
                if (!token) {
                  e.preventDefault();
                  router.push("/login");
                }
              }
            }}
          >
            <div className="h-10 w-10 rounded-xl bg-blue-600/90 flex items-center justify-center">
              <span className="font-extrabold">B</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-bold tracking-wide">BudgetFlow</div>
              <div className="text-[11px] text-white/60">Finance Manager</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
              <div className="flex items-center gap-1">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "px-4 py-2 rounded-xl text-sm font-semibold transition",
                        active
                          ? "bg-white/12 text-white shadow-inner"
                          : "text-white/70 hover:text-white hover:bg-white/8",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {mounted && mode === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Profile menu */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setOpenProfile((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Profile menu"
              >
                <User className="h-5 w-5" />
              </button>

              {openProfile ? (
                <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/95 backdrop-blur shadow-2xl">
                  <div className="px-4 py-4 border-b border-white/10">
                    <div className="text-base font-bold">
                      {authed ? (user?.username || "User") : "Guest"}
                    </div>
                    <div className="text-sm text-white/70">
                      {authed ? (user?.email || "—") : "Please login to continue"}
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    {!authed ? (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setOpenProfile(false)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 transition px-4 py-3 text-sm font-semibold"
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </Link>

                        <Link
                          href="/register"
                          onClick={() => setOpenProfile(false)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 transition px-4 py-3 text-sm font-semibold text-white"
                        >
                          Register
                        </Link>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 transition px-4 py-3 text-sm font-semibold"
                        onClick={async () => {
                          setOpenProfile(false);
                          await logout?.(router); // ✅ your store expects router
                          router.replace("/login");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile drawer */}
      {openMobile ? (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenMobile(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm bg-[#0b1020] border-r border-white/10 shadow-2xl">
            <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
              <div className="text-sm font-bold">
                {activeLabel}
                <span className="ml-2 text-[11px] text-white/60">Menu</span>
              </div>
              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 space-y-2">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "block rounded-2xl px-4 py-3 text-sm font-semibold transition border",
                      active
                        ? "bg-white/10 border-white/10 text-white"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="p-3 mt-2 border-t border-white/10 space-y-2">
              {!authed ? (
                <>
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 transition px-4 py-3 text-sm font-semibold"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600/90 hover:bg-blue-600 transition px-4 py-3 text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600/90 hover:bg-rose-600 transition px-4 py-3 text-sm font-semibold"
                  onClick={async () => {
                    setOpenMobile(false);
                    await logout?.(router);
                    router.replace("/login");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
