"use client";

import CategoryCard from "./category-card";

export default function CategoryList({ categories, onEdit, onDelete }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p className="text-muted-foreground">No categories yet</p>;
  }

  return (
    <div className="space-y-2">
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
