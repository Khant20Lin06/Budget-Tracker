// src/lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  // categories
  listCategories: () => request("/categories/"),
  createCategory: (data) => request("/categories/", { method: "POST", body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/categories/${id}/`, { method: "DELETE" }),

  // transactions
  listTransactions: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/transactions/${qs ? `?${qs}` : ""}`);
  },
  createTransaction: (data) => request("/transactions/", { method: "POST", body: JSON.stringify(data) }),
  updateTransaction: (id, data) =>
    request(`/transactions/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTransaction: (id) => request(`/transactions/${id}/`, { method: "DELETE" }),

  // goals
  getGoals: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/goals/${qs ? `?${qs}` : ""}`);
  },
  upsertGoal: (data) => request("/goals/", { method: "POST", body: JSON.stringify(data) }),
};
