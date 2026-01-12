import * as Icons from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}) {
  const Icon = Icons[transaction.category?.icon] || Icons.Circle;

  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </div>

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {transaction.category?.name || "Uncategorized"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {transaction.note || transaction.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={[
              "font-semibold",
              transaction.type === "expense"
                ? "text-rose-500"
                : "text-emerald-500",
            ].join(" ")}
          >
            {transaction.type === "expense" ? "-" : "+"}
            {transaction.amount}
          </span>

          <Button size="icon" variant="ghost" className="rounded-xl" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-xl" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-rose-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
