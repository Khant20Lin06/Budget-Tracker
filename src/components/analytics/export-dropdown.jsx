"use client";

import { useState, useRef, useEffect } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ExportDropdown({ onCSV, onExcel, onPrint }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // ✅ click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        className="rounded-2xl gap-2 bg-white/70 backdrop-blur
                   border-slate-200 hover:bg-slate-100
                   dark:bg-slate-900/40 dark:border-slate-800
                   dark:hover:bg-slate-800"
        onClick={() => setOpen((v) => !v)}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-3 w-48 z-50
            rounded-2xl border border-slate-200
            bg-white/90 backdrop-blur-xl shadow-xl
            dark:border-slate-800 dark:bg-slate-950/90
            animate-in fade-in zoom-in-95
          "
        >
          <div className="p-2 space-y-1">
            <MenuItem
              icon={File}
              label="Export CSV"
              onClick={() => {
                setOpen(false);
                onCSV?.();
              }}
            />

            <MenuItem
              icon={FileSpreadsheet}
              label="Export Excel"
              onClick={() => {
                setOpen(false);
                onExcel?.();
              }}
            />

            {/* <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

            <MenuItem
              icon={FileText}
              label="Export PDF"
              sub="Print / Save as PDF"
              accent
              onClick={() => {
                setOpen(false);
                onPrint?.(); // ✅ print-to-pdf
              }}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Menu Item */
/* ---------------------------------- */
function MenuItem({ icon: Icon, label, sub, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 rounded-xl px-3 py-2 text-left transition",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        accent && "bg-slate-50 dark:bg-slate-900"
      )}
    >
      <div
        className={cn(
          "mt-0.5 h-8 w-8 rounded-xl flex items-center justify-center",
          accent
            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
            : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </p>
        {sub && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {sub}
          </p>
        )}
      </div>
    </button>
  );
}
