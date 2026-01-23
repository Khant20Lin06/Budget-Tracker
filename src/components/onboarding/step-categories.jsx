"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/categories/category-form";
import CategoryList from "@/components/categories/category-list";

import { EndPoint } from "@/lib/api/endpoints";
import { getAccessToken } from "@/lib/auth/storage";
import { useOnboarding } from "@/lib/store/onboarding-store";

import { ArrowLeft, ArrowRight, Tags } from "lucide-react";

export default function StepCategories() {
  const { next, back } = useOnboarding();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const authHeader = () => {
    const token = getAccessToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(EndPoint.CATEGORYLIST, { headers: authHeader() });
      const list = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setCategories(list);
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (data) => {
    setSaving(true);
    setError("");
    try {
      const payload = { name: data.name, icon: data.icon };
      const res = await axios.post(EndPoint.CATEGORYCREATE, payload, {
        headers: authHeader(),
      });

      const created = res.data;
      setCategories((prev) => [created, ...(prev || [])]);
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
          JSON.stringify(e?.response?.data) ||
          e.message ||
          "Create failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    setError("");
    try {
      await axios.delete(EndPoint.CATEGORYDELETE(id), { headers: authHeader() });
      setCategories((prev) => (prev || []).filter((c) => c.id !== id));
    } catch (e) {
      setError(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
            <Tags className="h-4 w-4" />
            Step 2 of 3
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Create your categories
          </h2>

          <p className="text-sm text-white/60">
            Example: Food, Salary, Transport… (you can add more later)
          </p>

          {loading ? <p className="text-xs text-white/50">Loading...</p> : null}
          {error ? (
            <div className="mt-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {error}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur">
            <span className="font-semibold text-white">{categories.length}</span>{" "}
            categories added
          </div>

          <Button
            variant="outline"
            className="rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={fetchCategories}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* STACKED layout (Add on top, List below) */}
      <div className="space-y-6">
        {/* Add Category card */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent)] blur-2xl" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Add Category</h3>
                <p className="mt-1 text-xs text-white/60">
                  Type a name and pick an icon.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/70">
                Quick setup
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-black/10 ring-1 ring-white/10 p-4 sm:p-5">
              <CategoryForm onSubmit={handleAdd} />
              {saving ? <p className="mt-3 text-xs text-white/50">Saving...</p> : null}
            </div>
          </div>
        </div>

        {/* Your Categories card */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)] blur-2xl" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Your Categories</h3>
                <p className="mt-1 text-xs text-white/60">
                  Tap delete to remove
                </p>
              </div>

              <div className="text-right text-[11px] text-white/60">
                {categories.length === 0 ? "No items yet" : "Keep it clean ✨"}
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-black/10 ring-1 ring-white/10 p-4 sm:p-5">
              <CategoryList
                categories={categories}
                onEdit={() => {}}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={back}
          className="rounded-2xl gap-2 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={next}
          disabled={categories.length === 0}
          className="rounded-2xl gap-2 px-5"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
