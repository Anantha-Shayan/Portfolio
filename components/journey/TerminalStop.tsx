"use client";
// A stop that opens as a terminal and morphs into its web UI.
// Output items hold both forms: `lines` (terminal) and `ui` (designed).

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { STOPS } from "./stopsData";
import { useTerminal } from "./useTerminal";

export type Item = { lines: string[]; ui: ReactNode | null };

/** Animates its height to follow its content, without scaling the children. */
function AutoHeight({ children }: { children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div initial={false} animate={{ height: h }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
      <div ref={inner}>{children}</div>
    </motion.div>
  );
}

type PanelProps = { command: string; items: Item[]; heading: string; label: ReactNode; active: boolean; instant?: boolean; className?: string };

/** The terminal-to-UI panel itself. Starts its sequence once `active` turns true. */
export function TerminalPanel({ command, items, heading, label, active, instant, className = "" }: PanelProps) {
  const reduce = useReducedMotion();
  const out = useRef<HTMLDivElement>(null);
  const lineCount = items.reduce((n, it) => n + it.lines.length, 0);
  const t = useTerminal({ command, lineCount, itemCount: items.length, start: active, reduce: !!(reduce || instant) });

  // While streaming, keep the newest line in view inside the terminal.
  useEffect(() => {
    if (t.phase === "term" && out.current) out.current.scrollTop = out.current.scrollHeight;
  }, [t.shown, t.phase]);

  const isTerm = t.phase === "idle" || t.phase === "term";
  let offset = 0;

  return (
    <div className={`pl-veil pl-stop ${className}`} data-phase={isTerm ? "term" : "ui"}>
      <AutoHeight>
          <motion.div initial={false} animate={{ height: isTerm ? 30 : 0, opacity: isTerm ? 1 : 0, marginBottom: isTerm ? 10 : 0 }} transition={{ duration: 0.4 }} style={{ overflow: "hidden" }} aria-hidden>
            <div className="pl-term flex items-center justify-between opacity-70">
              <span className="flex items-center gap-1.5">
                <i className="pl-dot" /><i className="pl-dot" /><i className="pl-dot" />
                <span className="ml-2">anantha@dev ~</span>
              </span>
              {t.phase !== "idle" && <button className="underline" onClick={t.skip}>skip</button>}
            </div>
          </motion.div>

          <div className="mb-3 flex items-baseline justify-between gap-4">
            <button className="pl-term pl-cmd text-left" onClick={t.replay} title="Replay" aria-label={`Replay: ${command}`}>
              <span style={{ color: "var(--pl-signal)" }}>$</span> {command.slice(0, t.typed)}
              {isTerm && t.typed < command.length + 1 && <span className="pl-caret" />}
            </button>
            {!isTerm && (typeof label === "string" ? <span className="pl-term shrink-0 opacity-60">{label}</span> : label)}
          </div>

          <AnimatePresence>
            {!isTerm && (
              <motion.h2 className="pl-display mb-5 text-[clamp(2.25rem,5vw,4rem)]" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {heading}
              </motion.h2>
            )}
          </AnimatePresence>

          <div ref={out} className={isTerm ? "pl-out" : undefined} aria-live="off">
            {items.map((it, i) => {
              const start = offset;
              offset += it.lines.length;
              const isUi = i < t.ui;
              return (
                <div key={i} className="relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  {isUi ? (
                    it.ui && (
                      <motion.div key="ui" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                        {it.ui}
                      </motion.div>
                    )
                  ) : (
                    <motion.div key="term" aria-hidden exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {it.lines.slice(0, Math.max(0, t.shown - start)).map((l, j) => (
                        <div key={j} className="pl-line">{l}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              );
            })}
          </div>
      </AutoHeight>
    </div>
  );
}

export function TerminalStop({
  index, command, items, heading, wide, xl,
}: { index: number; command: string; items: Item[]; heading: string; wide?: boolean; xl?: boolean }) {
  const stop = STOPS[index];
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { once: true, amount: 0.4 });
  const size = xl ? "max-w-5xl" : wide ? "max-w-3xl" : "max-w-xl";
  return (
    <section ref={section} id={stop.id} data-stop className="flex min-h-screen items-center px-6 py-24 md:px-16">
      <TerminalPanel command={command} items={items} heading={heading} label={stop.plain} active={inView} className={`w-full ${size} ${index % 2 ? "md:ml-auto" : ""}`} />
    </section>
  );
}
