// src/components/categories/category-select.jsx
"use client";

import { useMemo } from "react";
import { useCategories } from "@/lib/store/categories-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategorySelect({ value, onChange }) {
  const { categories } = useCategories();

  const items = useMemo(() => {
    return (categories || []).map((c) => ({
      id: c.id,
      name: c.name,
    }));
  }, [categories]);

  // value is object OR string -> normalize to id
  const selectedId =
    typeof value === "string" ? value : value?.id || "";

  return (
    <Select
      value={selectedId}
      onValueChange={(id) => {
        const cat = items.find((x) => x.id === id) || null;
        onChange?.(cat);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>

      <SelectContent>
        {items.length === 0 ? (
          <SelectItem value="__empty" disabled>
            No categories yet
          </SelectItem>
        ) : (
          items.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
