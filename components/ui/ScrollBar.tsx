// components/ui/ScrollBar.tsx
// Fixed 2 px line at the top of the viewport indicating scroll progress.

"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollBar() {
  const progress = useScrollProgress();

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-[998] h-[2px] transition-all duration-100"
      style={{
        width:      `${progress}%`,
        background: "var(--accent)",
      }}
    />
  );
}
