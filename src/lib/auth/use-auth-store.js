// "use client";

// import { create } from "zustand";
// import { apiFetch } from "@/lib/api/client";

// export const useAuth = create((set, get) => ({
//   user: null,
//   loading: false,
//   error: "",

//   // ✅ app refresh ပြီးလည်း user ပြန်တင်
//   me: async () => {
//     const token =
//       typeof window !== "undefined" && localStorage.getItem("access_token");

//     if (!token) {
//       set({ user: null });
//       return null;
//     }

//     try {
//       const data = await apiFetch("/profile/", { method: "GET" });
//       set({ user: data || null });
//       return data;
//     } catch (e) {
//       // token invalid -> logout
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//       set({ user: null });
//       return null;
//     }
//   },

//   register: async (payload) => {
//     set({ loading: true, error: "" });
//     try {
//       const data = await apiFetch("/register/", {
//         method: "POST",
//         body: payload,
//       });

//       set({ loading: false, user: data?.user || null });
//       return data;
//     } catch (e) {
//       set({ loading: false, error: e.message || "Register failed" });
//       return null;
//     }
//   },

//   login: async ({ username, password }) => {
//     set({ loading: true, error: "" });
//     try {
//       const data = await apiFetch("/login/", {
//         method: "POST",
//         body: { username, password },
//       });

//       const access = data?.tokens?.access;
//       const refresh = data?.tokens?.refresh;

//       if (access) localStorage.setItem("access_token", access);
//       if (refresh) localStorage.setItem("refresh_token", refresh);

//       // ✅ login success ဖြစ်ပြီး user profile ကို set
//       set({ loading: false, user: data?.user || null });

//       // ✅ some backends don't return user; so call me()
//       if (!data?.user) await get().me();

//       return data;
//     } catch (e) {
//       set({ loading: false, error: e.message || "Login failed" });
//       return null;
//     }
//   },

//   logout: async () => {
//     try {
//       const refresh = localStorage.getItem("refresh_token");
//       if (refresh) {
//         await apiFetch("/logout/", {
//           method: "POST",
//           body: { refresh },
//         });
//       }
//     } catch (_) {}

//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     set({ user: null, error: "" });
//   },
// }));
