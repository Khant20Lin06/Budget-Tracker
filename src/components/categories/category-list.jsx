"use client";

import CategoryCard from "./category-card";

export default function CategoryList({ categories = [], onEdit, onDelete }) {
  if (!categories.length) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-10 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
        <p className="text-sm font-medium">No categories yet</p>
        <p className="mt-1 text-xs">
          Click <span className="font-semibold">Add Category</span> to create your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          onEdit={() => onEdit(cat)}
          onDelete={() => onDelete(cat.id)}
        />
      ))}
    </div>
  );
}
