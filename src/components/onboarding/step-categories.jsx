"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

  // ✅ READ
  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(EndPoint.CATEGORYLIST, {
        headers: authHeader(),
      });

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

  // ✅ CREATE (POST /categories/create/)
  const handleAdd = async (data) => {
    setSaving(true);
    setError("");
    try {
      const payload = { name: data.name, icon: data.icon };

      const res = await axios.post(EndPoint.CATEGORYCREATE, payload, {
        headers: authHeader(),
      });

      const created = res.data; // backend created object
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

  // ✅ DELETE (DELETE /categories/<id>/delete/)
  const handleDelete = async (id) => {
    if (!id) return;
    setError("");
    try {
      await axios.delete(EndPoint.CATEGORYDELETE(id), {
        headers: authHeader(),
      });
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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            <Tags className="h-4 w-4" />
            Step 2 of 3
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Create your categories
          </h2>

          <p className="text-sm text-muted-foreground">
            Example: Food, Salary, Transport… (you can add more later)
          </p>

          {loading ? (
            <p className="text-xs text-slate-500 mt-2">Loading...</p>
          ) : null}
          {error ? (
            <p className="text-xs text-rose-600 mt-2">{error}</p>
          ) : null}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-slate-900">{categories.length}</span>
          categories added
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Add Category</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Type a name and pick an icon.
          </p>

          <div className="mt-4">
            {/* CategoryForm -> onSubmit(data:{name,icon}) */}
            <CategoryForm onSubmit={handleAdd} />

            {saving ? (
              <p className="mt-3 text-xs text-slate-500">Saving...</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Your Categories</h3>
            <span className="text-xs text-muted-foreground">
              {categories.length === 0 ? "No items yet" : "Tap delete to remove"}
            </span>
          </div>

          <div className="mt-4">
            <CategoryList
              categories={categories}
              onEdit={() => { }}
              onDelete={handleDelete}
            />
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={fetchCategories}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <Button variant="ghost" onClick={back} className="rounded-xl gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={next}
          disabled={categories.length === 0}
          className="rounded-xl gap-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
