// components/ui/SectionWrapper.tsx
// Shared layout wrapper for every content section.
// Handles max-width, horizontal padding, and vertical rhythm.

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?:       string;
  className?: string;
  children:  React.ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 max-w-[900px] mx-auto px-6 py-24",
        className
      )}
    >
      {children}
    </section>
  );
}
