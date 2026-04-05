// hooks/useScrollProgress.ts
// Returns a 0–100 progress value tracking how far the user has scrolled.

"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollY  = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
