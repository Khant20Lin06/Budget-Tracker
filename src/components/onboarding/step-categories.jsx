"use client";

import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/store/categories-store";
import { useOnboarding } from "@/lib/store/onboarding-store";
import CategoryForm from "@/components/categories/category-form";
import CategoryList from "@/components/categories/category-list";
import { ArrowLeft, ArrowRight, Tags } from "lucide-react";

export default function StepCategories() {
  const { categories, addCategory, deleteCategory } = useCategories();
  const { next, back } = useOnboarding();

  const handleAdd = (data) => {
    addCategory({
      id: crypto.randomUUID(),
      ...data,
    });
  };

  return (
    <div className="relative">
      {/* ✅ Premium background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-7">
        {/* ✅ Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
              <Tags className="h-4 w-4" />
              Step 2 of 3
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
              Create your categories
            </h2>

            <p className="text-sm text-slate-600">
              Example: Food, Salary, Transport… <span className="text-blue-600 font-medium">(you can add more later)</span>
            </p>

          </div>

          {/* ✅ Count pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {categories.length}
            </span>
            categories added
          </div>
        </div>

        {/* ✅ Cards grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Form */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-950">Add Category</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Type a name and choose an icon. Suggestions will appear automatically.
                </p>

              </div>

              {/* subtle badge */}
              <div className="hidden sm:inline-flex rounded-2xl border border-slate-200/70 bg-white/60 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                Smart icon picker
              </div>
            </div>

            <div className="mt-5">
              <CategoryForm onSubmit={handleAdd} />
            </div>
          </div>

          {/* Right: List */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-950">Your Categories</h3>
              <span className="text-xs text-slate-600">
                {categories.length === 0 ? "No items yet" : "Tap delete to remove"}
              </span>

            </div>

            <div className="mt-5">
              <CategoryList
                categories={categories}
                onEdit={() => { }}
                onDelete={(id) => deleteCategory(id)}
              />
            </div>
          </div>
        </div>

        {/* ✅ Bottom actions bar (premium) */}
        <div className="sticky bottom-4 z-10">
          <div className="flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
            <Button variant="ghost" onClick={back} className="rounded-2xl gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={next}
              disabled={categories.length === 0}
              className="rounded-2xl gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
