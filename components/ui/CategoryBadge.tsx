// components/ui/CategoryBadge.tsx
// Coloured pill badge for project categories (ML / NLP / Systems).

import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<ProjectCategory, { bg: string; color: string; border: string }> = {
  ml: {
    bg:     "rgba(108,127,255,0.12)",
    color:  "var(--accent)",
    border: "rgba(108,127,255,0.25)",
  },
  nlp: {
    bg:     "rgba(167,139,250,0.12)",
    color:  "var(--accent2)",
    border: "rgba(167,139,250,0.25)",
  },
  systems: {
    bg:     "rgba(52,211,153,0.10)",
    color:  "var(--accent3)",
    border: "rgba(52,211,153,0.20)",
  },
};

const labels: Record<ProjectCategory, string> = {
  ml:      "ML",
  nlp:     "NLP",
  systems: "Systems",
};

interface CategoryBadgeProps {
  category: ProjectCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const s = styles[category];
  return (
    <span
      className={cn("font-mono text-[0.65rem] px-2 py-0.5 rounded-full border tracking-wider", className)}
      style={{
        background:   s.bg,
        color:        s.color,
        borderColor:  s.border,
      }}
    >
      {labels[category]}
    </span>
  );
}
