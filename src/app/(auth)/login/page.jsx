// src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const loading = useAuth((s) => s.loading);
  const errorStore = useAuth((s) => s.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    const res = await login({ username, password });

    if (!res) {
      setErr(errorStore || "Login failed");
      return;
    }

    // ✅ login success => onboarding first
    router.replace("/onboarding?step=1");
  };

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border bg-white/80 backdrop-blur p-6 shadow-sm space-y-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue</p>
        </div>

        {err ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {err}
          </div>
        ) : null}

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Username</p>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your username"
            className="h-11 rounded-2xl"
            autoComplete="username"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Password</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-2xl"
            autoComplete="current-password"
          />
        </div>

        <Button disabled={loading} className="w-full rounded-2xl h-11">
          {loading ? "Signing in..." : "Login"}
        </Button>

        <p className="text-sm text-slate-500 text-center">
          No account?{" "}
          <a className="font-semibold text-slate-900 underline" href="/register">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
