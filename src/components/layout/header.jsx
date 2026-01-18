// src/components/layout/header.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

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

// --- Theme (no hydration mismatch) ---
function useThemeMode() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("dark"); // default dark like premium

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
  const { mounted, mode, toggle } = useThemeMode();
  const { isAuthed, user, logout } = useAuth();

  // Mobile drawer
  const [openMenu, setOpenMenu] = useState(false);

  // Profile menu
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setOpenProfile(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const activeLabel = useMemo(() => {
    const found = NAV.find((n) => isActive(pathname, n.href));
    return found?.label || "Home";
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Premium bar */}
        <div className="bg-gradient-to-b from-[#070a14] to-[#0b1020] text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 min-w-[180px]">
              <div className="h-10 w-10 rounded-xl bg-blue-600/90 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="font-extrabold">B</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-wide">BudgetFlow</div>
                <div className="text-[11px] text-white/60">Finance Manager</div>
              </div>
            </Link>

            {/* Center nav (desktop) */}
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
              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggle}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {/* mounted မဖြစ်သေးခင် icon မပြောင်းဘဲ stable ထား */}
                {mounted && mode === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Profile */}
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
                        {isAuthed ? (user?.username || "User") : "Guest"}
                      </div>
                      <div className="text-sm text-white/70">
                        {isAuthed ? (user?.email || "—") : "Please login to continue"}
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      {!isAuthed ? (
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
                          onClick={() => {
                            setOpenProfile(false);
                            logout?.();
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

      </header>

      {/* Mobile drawer */}
      {openMenu ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenMenu(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white dark:bg-[#0b1020] border-r border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold">
                  B
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold">BudgetFlow</div>
                  <div className="text-[11px] text-slate-500 dark:text-white/60">
                    Finance Manager
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="h-10 w-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 inline-flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-3 space-y-2">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className={[
                      "block px-4 py-3 rounded-xl text-sm font-semibold transition",
                      active
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-100 text-slate-700 dark:text-white/80 dark:hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto p-4 border-t border-slate-200 dark:border-white/10">
              <div className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4">
                <div className="text-sm font-bold">Alex Morgan</div>
                <div className="text-xs text-slate-500 dark:text-white/60">
                  admin@budgetflow.app
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
