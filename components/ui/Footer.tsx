// components/ui/Footer.tsx

import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer
      className="border-t py-8 text-center font-mono text-[0.72rem]"
      style={{ borderColor: "var(--border)", color: "var(--text3)" }}
    >
      <span className="font-head font-bold text-sm" style={{ color: "var(--text)" }}>
        {profile.name}
      </span>{" "}
      · Built with purpose ·{" "}
      <a
        href={`mailto:${profile.email}`}
        style={{ color: "var(--accent)" }}
        className="hover:underline transition-colors"
      >
        {profile.email}
      </a>
    </footer>
  );
}
