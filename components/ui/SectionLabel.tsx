// components/ui/SectionLabel.tsx
// Small mono-spaced eyebrow label rendered above each section heading.

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    // The .section-label class in globals.css adds the leading dash line
    <div className="section-label mb-4">{children}</div>
  );
}
