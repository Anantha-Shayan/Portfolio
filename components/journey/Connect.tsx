"use client";
// The landing screen: a short "ssh" login before the hero. It plays once per
// session, can be skipped at any time, and is static for reduced-motion and
// data-saver visitors. Choosing a route hands control back to the journey.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { trackEvent } from "@/lib/analytics";
import { DOMAIN } from "./stopsData";
import { TerminalPanel, type Item } from "./TerminalStop";

export type Choice = "tour" | "summary" | "contact";

function greeting(now: Date) {
  const h = now.getHours();
  const part = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const when = now.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  return [`${part}. Session opened ${when}.`];
}

export function Connect({ onChoose, onSkip }: { onChoose: (c: Choice) => void; onSkip: () => void }) {
  // Rendered only after mount, so reading the clock and media queries here is safe.
  const [lines] = useState(() => [`Connecting to ${DOMAIN} ...`, "Host key accepted.", "Authenticated as guest (read-only).", ...greeting(new Date())]);
  const [instant] = useState(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return !!conn?.saveData;
  });

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (open) setOpen(false); else onSkip(); }
      if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement) && !(e.target instanceof HTMLAnchorElement)) onChoose("tour");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChoose, onSkip, open]);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard unavailable: the mailto link still works */ }
  }

  const connect = (
    <button className="pl-chip" aria-expanded={open} aria-controls="connect-menu" onClick={() => { trackEvent("connect_open"); setOpen(!open); }}>
      Connect {open ? "▴" : "▾"}
    </button>
  );

  const items: Item[] = [
    { lines, ui: null },
    {
      lines: [],
      ui: (
        <div>
          <p className="text-lg">{profile.title}</p>
          <p className="pl-term mt-2 flex items-center gap-2 opacity-80">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#2f7a4a" }} />
            {profile.status}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button className="pl-btn pl-btn-solid" autoFocus onClick={() => onChoose("tour")}>Take the tour</button>
            <button className="pl-btn" onClick={() => onChoose("summary")}>Just the highlights</button>
            <span className="pl-term opacity-50">press Enter to start</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center px-5"
      style={{ background: "color-mix(in srgb, var(--pl-base) 94%, transparent)", backdropFilter: "blur(2px)" }}
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      role="dialog" aria-modal="true" aria-label="Welcome"
    >
      <button className="pl-btn absolute right-4 top-4 md:right-8 md:top-6" onClick={onSkip}>Skip intro</button>
      <div className="relative w-full max-w-xl" onMouseDown={(e) => { if (open && !menu.current?.contains(e.target as Node) && !(e.target as HTMLElement).closest("[aria-controls='connect-menu']")) setOpen(false); }}>
        <TerminalPanel command={`ssh guest@${DOMAIN}`} items={items} heading={profile.name} label={connect} active instant={instant} className="w-full" />
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menu} id="connect-menu" role="menu" aria-label="Contact options"
              className="pl-card absolute right-0 top-[3.9rem] z-10 w-[22rem] max-w-[calc(100vw-2.5rem)] origin-top-right"
              initial={{ opacity: 0, scale: 0.92, y: -6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <p className="pl-term mb-3 opacity-60">reach me</p>
              <div className="flex items-center justify-between gap-2 border-b pb-3" style={{ borderColor: "var(--pl-line)" }}>
                <a role="menuitem" className="min-w-0 truncate underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
                <button className="pl-chip shrink-0" onClick={copyEmail} aria-live="polite">{copied ? "copied" : "copy"}</button>
              </div>
              <ul className="space-y-1 py-3">
                {([["LinkedIn", profile.socials.linkedin], ["GitHub", profile.socials.github], ["Medium", profile.socials.medium]] as const).map(([name, href]) => (
                  <li key={name} className="!pl-0 before:hidden"><a role="menuitem" className="underline-offset-2 hover:underline" href={href} target="_blank" rel="noreferrer">{name}</a></li>
                ))}
              </ul>
              <button className="pl-btn pl-btn-solid w-full" onClick={() => onChoose("contact")}>Send a message</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
