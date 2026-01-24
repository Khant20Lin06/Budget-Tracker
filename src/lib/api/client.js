// src/lib/api/client.js
"use client";

const API_BASE = "https://buget-tracker-api.vercel.app/api";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function setTokens({ access, refresh }) {
  if (typeof window === "undefined") return;
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function apiFetch(
  urlOrFull,
  { method = "GET", body, headers, requireAuth = false } = {} // ✅ add this
) {
  const url = urlOrFull.startsWith("http") ? urlOrFull : `${API_BASE}${urlOrFull}`;
  const token = getAccessToken();

  // ✅ only enforce when requireAuth=true
  if (requireAuth && !token) {
    throw new Error("AUTH_REQUIRED");
  }

  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {}

  if (!res.ok) {
    const msg =
      data?.detail ||
      data?.message ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}
