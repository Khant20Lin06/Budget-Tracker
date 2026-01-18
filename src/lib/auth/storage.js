// src/lib/auth/storage.js
const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export function setTokens({ access, refresh }) {
  if (typeof window === "undefined") return;

  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);

  // middleware server-side guard needs cookie
  if (access) document.cookie = `access_token=${access}; path=/; samesite=lax`;
  if (refresh) document.cookie = `refresh_token=${refresh}; path=/; samesite=lax`;
}

export function getAccessToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ACCESS_KEY) || "";
}

export function getRefreshToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(REFRESH_KEY) || "";
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);

  document.cookie = "access_token=; Max-Age=0; path=/";
  document.cookie = "refresh_token=; Max-Age=0; path=/";
}

export function hasTokenCookie(cookieHeader = "") {
  return cookieHeader.includes("access_token=");
}
