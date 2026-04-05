// hooks/useActiveSection.ts
// Tracks which section ID is currently in the viewport so the
// navbar can highlight the matching nav link.

"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // Trigger when the section top enters the upper 40% of the viewport
        { rootMargin: "-20% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}
