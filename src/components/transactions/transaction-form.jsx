"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, StickyNote, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TransactionForm({ initialData, onSubmit, onCancel }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const authHeader = () => {
    const token = getAccessToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ✅ categories fetch (for select)
  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCats(true);
      try {
        const res = await axios.get(EndPoint.CATEGORYLIST, { headers: authHeader() });
        const list = Array.isArray(res.data) ? res.data : res.data?.results || [];
        setCategories(list);
      } catch (e) {
        // keep silent (optional)
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ sync initialData -> state
  useEffect(() => {
    setErr("");

    if (!initialData) {
      setType("expense");
      setAmount("");
      setDate("");
      setNote("");
      setCategoryId("");
      return;
    }

    setType(initialData.type || "expense");
    setAmount(initialData.amount != null ? String(initialData.amount) : "");
    setDate(initialData.date || "");
    setNote(initialData.note || "");
    setCategoryId(initialData.categoryId || initialData.category || "");
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!amount || Number(amount) <= 0) {
      setErr("Amount must be greater than 0.");
      return;
    }
    if (!date) {
      setErr("Please select a date.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit?.({
        type,
        amount,
        date,
        note,
        categoryId,
      });
    } catch (e) {
      setErr(e?.message || "Failed to save transaction.");
    } finally {
      setSaving(false);
    }
  };

  const isEdit = Boolean(initialData?.id);

  return (
    <div className="relative">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500/20 via-sky-500/15 to-emerald-500/20 blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative rounded-[28px] border border-slate-200/70 bg-white/80 backdrop-blur-md shadow-sm p-5 sm:p-6 dark:border-white/10 dark:bg-slate-950/40"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              {isEdit ? "Edit Transaction" : "New Transaction"}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {isEdit ? "Update your record" : "Add income or expense quickly"}
            </p>
          </div>

          <div
            className={[
              "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold ring-1",
              type === "expense"
                ? "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-300"
                : "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-300",
            ].join(" ")}
          >
            {type === "expense" ? (
              <ArrowDownCircle className="h-4 w-4" />
            ) : (
              <ArrowUpCircle className="h-4 w-4" />
            )}
            {type === "expense" ? "Expense" : "Income"}
          </div>
        </div>

        {/* error */}
        {err ? (
          <div className="mt-4 rounded-2xl border border-rose-200/60 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
            {err}
          </div>
        ) : null}

        {/* grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Type
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50 dark:border-white/10 dark:bg-slate-900/30 dark:text-white dark:focus:ring-white/10"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <Wallet className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* amount */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Amount
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50 dark:border-white/10 dark:bg-slate-900/30 dark:text-white dark:focus:ring-white/10"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Wallet className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* date */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Date
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50 dark:border-white/10 dark:bg-slate-900/30 dark:text-white dark:focus:ring-white/10"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Category
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50 disabled:opacity-60 dark:border-white/10 dark:bg-slate-900/30 dark:text-white dark:focus:ring-white/10"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={loadingCats}
              >
                <option value="">
                  {loadingCats ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                <Tag className="h-4 w-4 text-slate-400" />
              </div>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </div>
            </div>
          </div>
        </div>

        {/* note */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Note
          </label>
          <div className="relative">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/50 dark:border-white/10 dark:bg-slate-900/30 dark:text-white dark:focus:ring-white/10"
              placeholder="Optional note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <StickyNote className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          {isEdit ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl"
              onClick={() => onCancel?.()}
              disabled={saving}
            >
              Cancel
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="submit"
            className="rounded-2xl px-5"
            disabled={saving}
          >
            {saving ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
