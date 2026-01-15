"use client";

import dynamicIconImports from "lucide-react/dynamicIconImports";

export const ICON_NAMES = Object.keys(dynamicIconImports).sort((a, b) =>
  a.localeCompare(b)
);

export function loadLucideIcon(name) {
  const loader = dynamicIconImports[name];
  return loader ? loader : dynamicIconImports["Tag"];
}
