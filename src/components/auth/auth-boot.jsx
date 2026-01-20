// src/components/auth/auth-boot.jsx
"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/store/auth-store";

export default function AuthBoot({ children }) {
  const boot = useAuth((s) => s.boot);

  useEffect(() => {
    boot?.();
  }, []);

  return children;
}
