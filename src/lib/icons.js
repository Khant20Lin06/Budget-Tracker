"use client";

import * as LucideIcons from "lucide-react";

// lucide-react exports object { IconName: Component }
export const ICONS_OBJECT = LucideIcons;

// array version (for map / filter)
export const ALL_ICONS = Object.keys(ICONS_OBJECT).map((name) => ({
  name,
  Icon: ICONS_OBJECT[name],
}));

export function getIconByName(name) {
  return ICONS_OBJECT[name] || ICONS_OBJECT.Circle;
}
