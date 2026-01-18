"use client";

import * as Icons from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const Icon = Icons[category.icon] || Icons.Tag;

  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center ring-1 ring-slate-200 transition group-hover:scale-[1.02] dark:bg-slate-900 dark:ring-slate-800">
            <Icon className="h-5 w-5  text-slate-900 dark:text-white" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-600">
              {category.name}
            </p>
            <p className="truncate text-xs text-slate-600">
              Icon: {category.icon || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl"
            onClick={() => onEdit(category)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl"
            onClick={() => onDelete(category.id)}
          >
            <Trash2 className="h-4 w-4 text-rose-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
