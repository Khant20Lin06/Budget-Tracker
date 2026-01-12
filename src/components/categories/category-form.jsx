"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suggestIconsFromName } from "@/lib/category-icon-suggest";

export default function CategoryForm({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData?.name || "");
  const [icon, setIcon] = useState(initialData?.icon || "");

  const suggested = useMemo(() => suggestIconsFromName(name), [name]);

  useEffect(() => {
    if (!icon && suggested.length) setIcon(suggested[0].name);
  }, [suggested, icon]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({
      ...initialData,
      name,
      icon,
    });
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Category name
        </label>
        <Input
          className="h-11 rounded-xl"
          placeholder="Food, Salary, Rent..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We’ll suggest icons based on your text.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Suggested icons
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected: <span className="font-semibold">{icon || "—"}</span>
          </p>
        </div>

        {!suggested?.length ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Start typing a name to see icon suggestions.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {suggested.map(({ name: iconName, Icon }) => {
              const active = icon === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setIcon(iconName)}
                  className={[
                    "group flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
                    "bg-white/70 hover:bg-slate-50 dark:bg-slate-950/40 dark:hover:bg-slate-900/40",
                    active
                      ? "border-blue-500/70 ring-2 ring-blue-500/20"
                      : "border-slate-200/70 dark:border-slate-800",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-8 w-8 rounded-xl flex items-center justify-center ring-1",
                      active
                        ? "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                        : "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 truncate font-medium text-slate-900 dark:text-slate-100">
                    {iconName}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="submit" className="rounded-xl px-5">
          {initialData ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </form>
  );
}
