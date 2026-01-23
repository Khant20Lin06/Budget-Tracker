"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { suggestIconsFromName } from "@/lib/category-icon-suggest";
import { ALL_ICONS } from "@/lib/icons";

export default function CategoryForm({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData?.name || "");
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [iconQuery, setIconQuery] = useState("");

  // ✅ Suggest based on category name ONLY (not mixed with iconQuery)
  const suggestedByName = useMemo(() => {
    return suggestIconsFromName(name, 48) || [];
  }, [name]);

  const suggested = useMemo(() => {
  const q = iconQuery.trim().toLowerCase();

  // ✅ iconQuery ရှိရင် ALL 1600 icons ထဲကနေရှာ
  if (q) {
    return ALL_ICONS
      .filter((x) => x.name.toLowerCase().includes(q))
      .slice(0, 60);
  }

  // ✅ iconQuery မရှိရင် category name အပေါ်မူတည်ပြီး suggest
  return suggestIconsFromName(name, 60) || [];
}, [name, iconQuery]);

  useEffect(() => {
    if (!icon && suggestedByName.length) setIcon(suggestedByName[0].name);
  }, [icon, suggestedByName]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({
      ...initialData,
      name: name.trim(),
      icon,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      {/* ✅ SECTION 1: Category Name (standalone, spacious) */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">Category name</p>
          <p className="text-xs text-slate-500 mt-1">
            Type a category name and we’ll suggest icons.
          </p>
        </div>

        <Input
          placeholder="Food, Salary, Rent..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-2xl bg-black/20 border-white/10 text-slate-500 placeholder:text-slate-400"
        />
      </div>

      {/* ✅ divider */}
      <div className="h-px w-full bg-white/10" />

      {/* ✅ SECTION 2: Icon Search (completely separate) */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Choose an icon
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Sparkles className="h-4 w-4" />
              Using all Lucide icons (1600+)
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Selected:{" "}
            <span className="font-semibold text-slate-500">
              {icon || "-"}
            </span>
          </p>
        </div>

        {/* ✅ Icon search input (standalone) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search icon name (Wallet, Coffee, Car...)"
            value={iconQuery}
            onChange={(e) => setIconQuery(e.target.value)}
            className="h-12 pl-10 rounded-2xl bg-white/5 border-white/10 text-slate-500 placeholder:text-slate-400"
          />
        </div>

        {/* ✅ Icon grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[320px] overflow-auto pr-1">
          {suggested.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-700">
              No icons found. Try another search.
            </div>
          ) : (
            suggested.map(({ name: iconName, Icon }) => (
              <button
                key={iconName}
                type="button"
                onClick={() => setIcon(iconName)}
                className={[
                  "group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition",
                  "bg-white/5 border-white/10 hover:bg-white/10",
                  icon === iconName
                    ? "ring-2 ring-blue-500/60 border-blue-500/40"
                    : "",
                ].join(" ")}
                title={iconName}
              >
                <span
                  className={[
                    "h-9 w-9 rounded-xl flex items-center justify-center border",
                    icon === iconName
                      ? "bg-blue-500/15 border-blue-500/30"
                      : "bg-white/5 border-white/10",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5  text-slate-900 dark:text-white" />
                </span>

                <span className="min-w-0 flex-1 text-left text-white/90">
                  <span className="block truncate">{iconName}</span>
                </span>
              </button>
            ))
          )}
        </div>

        {/* ✅ submit */}
        <div className="flex justify-end pt-1">
          <Button type="submit" className="rounded-2xl px-6">
            {initialData ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </div>
    </form>
  );
}
