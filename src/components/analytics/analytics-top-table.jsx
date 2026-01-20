"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function withinRange(date, from, to) {
  const d = new Date(date);
  const a = from ? new Date(from) : null;
  const b = to ? new Date(to) : null;
  if (a && d < a) return false;
  if (b && d > b) return false;
  return true;
}

function applyFilters(t, filters) {
  if (!withinRange(t.date, filters?.from, filters?.to)) return false;
  if (filters?.tab !== "all" && t.type !== filters?.tab) return false;

  const s = (filters?.search || "").trim().toLowerCase();
  if (s) {
    const hay = `${t.categoryName || ""} ${t.note || ""}`.toLowerCase();
    if (!hay.includes(s)) return false;
  }

  const min = filters?.min ? Number(filters.min) : null;
  const max = filters?.max ? Number(filters.max) : null;
  const amt = Number(t.amount || 0);
  if (min != null && amt < min) return false;
  if (max != null && amt > max) return false;

  const ids = filters?.categoryIds || [];
  if (ids.length && !ids.includes(t.categoryId)) return false;

  return true;
}

function topAgg(list, pickKey, n = 8) {
  const map = new Map();
  for (const t of list) {
    const key = pickKey(t);
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + Number(t.amount || 0));
  }
  return Array.from(map.entries())
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, n);
}

export default function AnalyticsTopTable({ filters, transactions = [] }) {
  const filtered = useMemo(() => {
    return (transactions || []).filter((t) => applyFilters(t, filters));
  }, [transactions, filters]);

  const topNotes = useMemo(() => topAgg(filtered, (t) => (t.note || "").trim(), 8), [filtered]);
  const topCategories = useMemo(() => topAgg(filtered, (t) => t.categoryName || "Unknown", 8), [filtered]);

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm dark:border-slate-800 dark:bg-slate-950/40 overflow-hidden">
      <CardHeader className="border-b border-slate-200/70 bg-white/60 dark:border-slate-800 dark:bg-slate-950/20">
        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">Top merchants / notes</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Biggest spend labels in this period</p>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/40">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Top notes</p>
            </div>
            <div className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {topNotes.length ? (
                topNotes.map((x) => (
                  <div key={x.name} className="px-4 py-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{x.name}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">${Math.round(x.total).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">No notes yet.</div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/40">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Top categories</p>
            </div>
            <div className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {topCategories.length ? (
                topCategories.map((x) => (
                  <div key={x.name} className="px-4 py-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{x.name}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">${Math.round(x.total).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">No category totals yet.</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
