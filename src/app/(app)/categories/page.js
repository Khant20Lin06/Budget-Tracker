"use client";

import { useState } from "react";
import CategoryList from "@/components/categories/category-list";
import CategoryForm from "@/components/categories/category-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSave = (data) => {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editing.id ? data : c))
      );
    } else {
      setCategories((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (category) => {
    setEditing(category);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>

          <DialogContent>
            <CategoryForm
              initialData={editing}
              onSubmit={handleSave}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
