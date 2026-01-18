"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/lib/store/categories-store";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";


export default function AnalyticsFilterDialog({
  value,
  onChange,
  triggerLabel = "Filters",
}) {
  const { categories } = useCategories();

  const allCats = useMemo(() => categories || [], [categories]);

  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(value);

  const toggleCat = (id) => {
    setLocal((prev) => {
      const set = new Set(prev.categoryIds || []);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...prev, categoryIds: Array.from(set) };
    });
  };

  const apply = () => {
    onChange?.(local);
    setOpen(false);
  };

  const reset = () => {
    const next = {
      categoryIds: [],
      min: "",
      max: "",
    };
    setLocal(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (setOpen(v), setLocal(value))}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogTitle className="text-base font-semibold">
          Filters
        </DialogTitle>

        <div className="space-y-6">
          {/* Amount range */}
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Amount Range
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min amount"
                value={local?.min ?? ""}
                onChange={(e) =>
                  setLocal((p) => ({ ...p, min: e.target.value }))
                }
                className="rounded-2xl"
              />
              <Input
                type="number"
                placeholder="Max amount"
                value={local?.max ?? ""}
                onChange={(e) =>
                  setLocal((p) => ({ ...p, max: e.target.value }))
                }
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Category multi-select */}
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Categories
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Select one or more categories.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {allCats.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No categories yet.
                </p>
              ) : (
                allCats.map((c) => {
                  const active = (local?.categoryIds || []).includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCat(c.id)}
                      className={cn(
                        "px-3 py-2 rounded-2xl border text-sm font-semibold transition",
                        active
                          ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
                      )}
                    >
                      {c.name}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" className="rounded-2xl" onClick={reset}>
              Reset
            </Button>
            <Button className="rounded-2xl" onClick={apply}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
