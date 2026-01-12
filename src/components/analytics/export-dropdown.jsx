"use client";

import { Download, FileSpreadsheet, FileText, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function ExportDropdown({
  onCSV,
  onExcel,
  onPDF,
  pdfDisabled = false,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-2xl gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Download as</DropdownMenuLabel>

        <DropdownMenuItem onClick={onCSV} className="gap-2">
          <FileDown className="h-4 w-4" />
          CSV
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onExcel} className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Excel (XLSX)
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onPDF}
          disabled={pdfDisabled}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          PDF
          {pdfDisabled ? (
            <span className="ml-auto text-xs text-slate-400">Install</span>
          ) : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
