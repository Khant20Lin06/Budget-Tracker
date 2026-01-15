// src/lib/icons.js
import * as Icons from "lucide-react";

// lucide icons are often React.forwardRef objects (typeof === "object")
// so we must allow function OR object
function isIconExport(name, Comp) {
  // block known non-icon exports
  const blocked = new Set([
    "createLucideIcon",
    "LucideIcon",
    "Icon",
    "default",
  ]);
  if (blocked.has(name)) return false;

  // most icons are PascalCase
  if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) return false;

  // allow React components: function OR forwardRef object
  const t = typeof Comp;
  if (t !== "function" && t !== "object") return false;

  // some exports may be null
  if (!Comp) return false;

  return true;
}

export const ALL_ICONS = Object.entries(Icons)
  .filter(([name, Comp]) => isIconExport(name, Comp))
  .map(([name, Icon]) => ({ name, Icon }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getIconByName(name) {
  const found = ALL_ICONS.find((x) => x.name === name);
  // fallback to Tag icon
  return found?.Icon || Icons.Tag;
}
