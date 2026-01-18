// src/lib/api/client.js
import { getAccessToken } from "@/lib/auth/storage";

export async function apiFetch(url, options = {}) {
  const method = options.method || "GET";
  const headers = new Headers(options.headers || {});

  // JSON default
  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Attach JWT (Django SimpleJWT expects: Authorization: Bearer <token>)
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url, {
    ...options,
    method,
    headers,
    body: isFormData
      ? options.body
      : options.body
      ? JSON.stringify(options.body)
      : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "");

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.detail ||
      (typeof data === "string" ? data : "API Error");
    throw new Error(msg);
  }

  return data;
}
