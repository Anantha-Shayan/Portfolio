// components/ui/Navbar.tsx
// Sticky navigation with active-section highlighting and theme toggle.

"use client";

import { useEffect, useState } from "react";
import { useTheme }         from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn }               from "@/lib/utils";

const NAV_LINKS = [
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Projects",   id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education",  id: "education" },
  { label: "Contact",    id: "contact" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[60px] px-6 flex items-center justify-between transition-all duration-300",
        scrolled && "border-b backdrop-blur-xl"
      )}
      style={{
        borderColor: scrolled ? "var(--border)" : "transparent",
        // Use a CSS variable trick so the nav bg adapts to dark/light
        // without color-mix (still Safari 15 patchy). We rely on a
        // semi-transparent bg-token defined per theme in globals.css.
        background:  scrolled ? "var(--nav-bg)" : "transparent",
      }}
    >
      {/* Logo — full name, not an abbreviation */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-head text-[0.95rem] font-semibold tracking-tight"
        style={{ color: "var(--text)" }}
        aria-label="Scroll to top"
      >
        Anantha<span style={{ color: "var(--accent)" }}> Shayan</span>
      </button>

      {/* Nav links — hidden on small screens */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={cn(
                "font-mono text-[0.72rem] uppercase tracking-widest transition-colors duration-200",
                active === id
                  ? "text-[var(--accent)]"
                  : "text-[var(--text3)] hover:text-[var(--accent)]"
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        style={{
          borderColor: "var(--border)",
          color:       "var(--text2)",
          background:  "transparent",
        }}
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </nav>
  );
}
