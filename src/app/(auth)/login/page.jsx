"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EndPoint } from "@/lib/api/endpoints";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const response = await axios.post(EndPoint.LOGIN, {
        username,
        password,
      });

      // backend returns: { tokens: { access, refresh }, user: {...} }
      const access = response.data?.tokens?.access;
      const refresh = response.data?.tokens?.refresh;

      if (!access) throw new Error("No access token returned from API");

      localStorage.setItem("access", access);
      if (refresh) localStorage.setItem("refresh", refresh);

      // optional user cache
      localStorage.setItem("user", JSON.stringify(response.data?.user || {}));

      router.push("/categories"); // ✅ login ပြီးရင် ဒီကိုပို့ (လိုသလိုပြောင်း)
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border bg-white/80 backdrop-blur p-6 shadow-sm space-y-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to continue
          </p>
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
