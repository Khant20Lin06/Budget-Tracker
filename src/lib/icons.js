"use client";

import * as LucideIconsImport from "lucide-react";

const LucideIcons = LucideIconsImport || {};

export const ICONS = Array.isArray(Object.entries(LucideIcons))
  ? Object.entries(LucideIcons).map(([name, Icon]) => ({ name, Icon }))
  : [];
