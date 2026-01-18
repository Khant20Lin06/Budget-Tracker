// src/lib/auth/auth-context.jsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints"; // ✅ absolute import သုံးပါ
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/auth/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  const isAuthed = !!getAccessToken();

  const authHeader = () => {
    const token = getAccessToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    async function boot() {
      try {
        const token = getAccessToken?.();
        if (!token) return;

        const me = await axios.get(EndPoint.PROFILE, { headers: authHeader() });
        setUser(me.data);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setBooting(false);
      }
    }
    boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ LOGIN (axios flow)
  const login = async ({ username, password }) => {
    const res = await axios.post(
      EndPoint.LOGIN,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = res.data;

    const access = data?.tokens?.access;
    const refresh = data?.tokens?.refresh;

    // ✅ storage သင့် signature ကိုက်အောင် (အများဆုံးက setTokens(access, refresh) OR setTokens({access, refresh}))
    try {
      setTokens(access, refresh); // ✅ first try
    } catch {
      setTokens({ access, refresh }); // ✅ fallback
    }

    // load profile
    try {
      const me = await axios.get(EndPoint.PROFILE, { headers: authHeader() });
      setUser(me.data);
    } catch {
      setUser(data?.user || null);
    }

    router.replace("/dashboard");
  };

  const register = async ({ username, email, phone, password, confirm_password }) => {
  await axios.post(
    EndPoint.REGISTER,
    {
      username,
      email,
      phone,
      password,
      confirm_password,
      password2: confirm_password,     // ✅ fallback
      re_password: confirm_password,   // ✅ fallback
    },
    { headers: { "Content-Type": "application/json" } }
  );

  router.replace("/login");
};


  // ✅ LOGOUT
  const logout = async () => {
    try {
      const refresh = getRefreshToken?.();
      if (refresh) {
        await axios.post(
          EndPoint.LOGOUT,
          { refresh },
          { headers: { ...authHeader(), "Content-Type": "application/json" } }
        );
      }
    } catch {
      // ignore
    } finally {
      clearTokens();
      setUser(null);
      router.replace("/login");
    }
  };

  const value = useMemo(
    () => ({
      user,
      booting,
      isAuthed: isAuthed && !booting,
      login,
      register,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, booting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
