"use client";
// Opens a project explorer on demand: a terminal runs a real command, then
// morphs into the explorer. Unmounting on close means it replays from the top
// each time it opens.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalPanel, type Item } from "./TerminalStop";

type Props = { command: string; lines: string[]; heading: string; label: string; onClose: () => void; children: ReactNode };

export function ExploreModal({ command, lines, heading, label, onClose, children }: Props) {
  const reduce = useReducedMotion();
  const [host, setHost] = useState<Element | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Portal into the themed root so the CSS variables apply.
  useEffect(() => setHost(document.querySelector(".pl-root")), []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); previous?.focus?.(); };
  }, [onClose, host]);

  if (!host) return null;
  const items: Item[] = [{ lines, ui: children }];

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] overflow-y-auto p-4 md:p-10"
      style={{ background: "rgba(29, 19, 23, 0.5)" }}
      initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true" aria-label={heading}
    >
      <motion.div className="relative mx-auto w-full max-w-5xl" initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <div className="mb-2 flex justify-end">
          <button ref={closeBtn} className="pl-btn" onClick={onClose}>Close</button>
        </div>
        <TerminalPanel command={command} items={items} heading={heading} label={label} active className="w-full" />
      </motion.div>
    </motion.div>,
    host,
  );
}
