"use client";

import { useState } from "react";
import CategoryList from "@/components/categories/category-list";
import CategoryForm from "@/components/categories/category-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSave = (data) => {
    if (editing) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...data },
      ]);
    }

    setEditing(null);
    setOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Categories
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Organize your income & expense categories with smart icon suggestions.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl rounded-3xl bg-slate-950/95 border-white/10 text-white p-6 sm:p-8">
            <DialogTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>

            <CategoryForm initialData={editing} onSubmit={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="mt-8">
        <CategoryList
          categories={categories}
          onEdit={(cat) => {
            setEditing(cat);
            setOpen(true);
          }}
          onDelete={(id) =>
            setCategories((prev) => prev.filter((c) => c.id !== id))
          }
        />
      </div>
    </div>
  );
}
