"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/auth/auth-shell";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2, Mail, Phone, User, Lock } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const set = (k) => (e) => {
    setErr(""); // ✅ typing လုပ်တာနဲ့ error ဖျက်ချင်ရင်
    setForm((p) => ({ ...p, [k]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    // ✅ validation ကို submit ထဲမှာပဲစစ် (render ထဲမစစ်)
    if (form.password !== form.confirm_password) {
      setErr("Password and Confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      await register(form);
    } catch (ex) {
      const data = ex?.response?.data;
      const msg = (data && JSON.stringify(data)) || ex?.message || "Register failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create account" subtitle="Register to start tracking your money.">
      <form onSubmit={submit} className="space-y-4">
        <Field icon={User} label="Username">
          <Input
            className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-600 placeholder:text-slate-500"
            placeholder="e.g. studioverx"
            value={form.username}
            onChange={set("username")}
            autoComplete="username"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field icon={Mail} label="Email">
            <Input
              className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-600 placeholder:text-slate-500"
              placeholder="you@email.com"
              value={form.email}
              onChange={set("email")}
              autoComplete="email"
            />
          </Field>

          <Field icon={Phone} label="Phone">
            <Input
              className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-600 placeholder:text-slate-500"
              placeholder="+95..."
              value={form.phone}
              onChange={set("phone")}
              autoComplete="tel"
            />
          </Field>
        </div>

        <Field icon={Lock} label="Password">
          <Input
            type="password"
            className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-600 placeholder:text-slate-500"
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
            autoComplete="new-password"
          />
        </Field>

        <Field icon={Lock} label="Confirm password">
          <Input
            type="password"
            className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-600 placeholder:text-slate-500"
            placeholder="••••••••"
            value={form.confirm_password}
            onChange={set("confirm_password")}
            autoComplete="new-password"
          />
        </Field>

        {err ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
            {err}
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:opacity-95"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
        </Button>

        <div className="text-sm text-slate-300">
          Already have an account?{" "}
          <Link className="hover:text-white underline-offset-4 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
    </div>
  );
}
