"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import IconPicker from "@/components/icon-picker/icon-picker";
import IconPreview from "@/components/icon-picker/icon-preview";
import { getIconByName } from "@/lib/icons";

export default function CategoryIconField({ value = "", onChange = () => {} }) {
  const [open, setOpen] = useState(false);
  const Icon = getIconByName(value);

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="flex gap-2 items-center">
            <IconPreview icon={Icon} name={value} className="h-4 w-4" />
            {value ? value : "Choose Icon"}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg">
          <DialogTitle className="text-base font-semibold">
            Choose an icon
          </DialogTitle>

          <IconPicker
            value={value}
            onChange={(iconName) => {
              onChange(iconName || "");
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
