"use client";

import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/store/categories-store";
import { useOnboarding } from "@/lib/store/onboarding-store";
import CategoryForm from "@/components/categories/category-form";
import CategoryList from "@/components/categories/category-list";

export default function StepCategories() {
  const { categories } = useCategories();
  const { next, back } = useOnboarding();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Create your categories
      </h2>

      <CategoryForm />

      <CategoryList />

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={back}>
          Back
        </Button>

        <Button
          onClick={next}
          disabled={categories.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
