// src/components/layout/header.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Sun, Moon, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/store/auth-store";

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

  const isAuthed = useAuth((s) => s.isAuthed);
  const user = useAuth((s) => s.user);
  const boot = useAuth((s) => s.boot);
  const logout = useAuth((s) => s.logout);

  // ✅ refresh/load မှာ user preload
  useEffect(() => {
    boot?.();
  }, [boot]);

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
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-b from-[#070a14] to-[#0b1020] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-[180px]">
            <div className="h-10 w-10 rounded-xl bg-blue-600/90 flex items-center justify-center">
              <span className="font-extrabold">B</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide">BudgetFlow</div>
              <div className="text-[11px] text-white/60">Finance Manager</div>
            </div>
          </Link>

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

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {mounted && mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                        onClick={async () => {
                          setOpenProfile(false);
                          await logout?.();
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
    </header>
  );
}
