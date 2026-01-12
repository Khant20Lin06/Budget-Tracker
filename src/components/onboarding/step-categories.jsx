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
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-slate-900">{categories.length}</span>
          categories added
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Add Category</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Type a name and pick a suggested icon (if you already implemented suggestions).
          </p>

          <div className="mt-4">
            <CategoryForm onSubmit={handleAdd} />
          </div>
        </div>

        {/* Right: List */}
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
              onEdit={() => {}}
              onDelete={(id) => deleteCategory(id)}
            />
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
