"use client";
// Journey shell: fixed 3D scene behind a scrolling column of stops, a
// step rail on the right and a step readout at the bottom right.

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { trackEvent } from "@/lib/analytics";
import { STOPS } from "./stopsData";
import { About, Contact, Experience, Hero, Projects, Skills, Tls } from "./Stops";
import { Summary } from "./Summary";
import { Connect, type Choice } from "./Connect";

const JourneyScene = dynamic(() => import("@/components/scenes/JourneyScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Journey() {
  const [mode, setMode] = useState<"journey" | "summary">("journey");
  const [gl, setGl] = useState(false);
  const [hop, setHop] = useState(0);
  // The landing screen plays once per session; deep links to the summary skip it.
  const [intro, setIntro] = useState<"pending" | "show" | "done">("pending");
  const scroller = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    // Skip the ~190 kB (gzip) 3D bundle for reduced motion, data-saver and very low-end devices.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lowEnd = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;
    setGl(hasWebGL() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !conn?.saveData && !lowEnd);
    const summary = new URLSearchParams(window.location.search).get("mode") === "summary";
    if (summary) setMode("summary");
    let seen = false;
    try { seen = sessionStorage.getItem("pl-intro") === "1"; } catch { /* storage unavailable */ }
    setIntro(summary || seen ? "done" : "show");
  }, []);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const tops = Array.from(el.querySelectorAll<HTMLElement>("[data-stop]")).map((s) => s.offsetTop);
    if (tops.length < 2) return;
    const y = el.scrollTop + el.clientHeight * 0.35;
    let i = tops.findIndex((t, k) => y >= t && (k === tops.length - 1 || y < tops[k + 1]));
    if (i < 0) i = 0;
    const next = i === tops.length - 1 ? i : i + (y - tops[i]) / (tops[i + 1] - tops[i]);
    progress.current = Math.min(Math.max(next, 0), STOPS.length - 1);
    setHop((h) => (h === i ? h : i));
  }, []);

  const go = (id: string) => scroller.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  const switchMode = (m: "journey" | "summary") => {
    trackEvent("view_mode", { mode: m });
    setMode(m);
    scroller.current?.scrollTo({ top: 0 });
    progress.current = 0;
    setHop(0);
    window.history.replaceState(null, "", m === "summary" ? "?mode=summary" : window.location.pathname);
  };

  const finishIntro = useCallback((choice: Choice | "skip") => {
    try { sessionStorage.setItem("pl-intro", "1"); } catch { /* storage unavailable */ }
    trackEvent("intro_choice", { choice });
    setIntro("done");
    if (choice === "summary") switchMode("summary");
    // The page is inert until the intro state flips, so scroll on the next frame.
    if (choice === "contact") requestAnimationFrame(() => requestAnimationFrame(() => scroller.current?.querySelector("#ping")?.scrollIntoView({ behavior: "smooth" })));
  }, []);

  const stop = STOPS[hop];

  return (
    <div className="relative h-full w-full">
      <div className="pl-grid" />
      {mode === "journey" && gl && (
        <div className="absolute inset-0">
          <JourneyScene progress={progress} stops={STOPS.length} />
        </div>
      )}

      <header inert={intro === "show"} className="pl-header absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-3 md:px-16 md:py-5">
        <span className="hidden font-semibold sm:inline">{profile.name}</span>
        {mode === "journey" && (
          <span className="pl-term pointer-events-none absolute left-1/2 hidden -translate-x-1/2 opacity-70 lg:block" aria-live="off">
            step {hop + 1} of {STOPS.length} · {stop.name}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2 text-sm">
          <div role="group" aria-label="View" className="flex border" style={{ borderColor: "var(--pl-line)" }}>
            {(["journey", "summary"] as const).map((m) => (
              <button key={m} aria-pressed={mode === m} onClick={() => switchMode(m)} className="px-3 py-1.5 capitalize"
                style={mode === m ? { background: "var(--pl-linen)", color: "var(--pl-base)" } : undefined}>{m}</button>
            ))}
          </div>
          <a className="pl-btn" href={profile.resumePath} onClick={() => trackEvent("resume_click")}>Resume</a>
        </div>
      </header>

      <div ref={scroller} onScroll={onScroll} inert={intro === "show"} className="pl-scroll absolute inset-0 z-10 overflow-y-auto">
        {mode === "journey" ? (
          <>
            <Hero onSummary={() => switchMode("summary")} ready={intro === "done"} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Tls />
            <Contact />
            <footer className="px-6 py-10 text-center text-sm opacity-60">© {new Date().getFullYear()} {profile.name}</footer>
          </>
        ) : (
          <Summary onJourney={() => switchMode("journey")} />
        )}
      </div>

      {mode === "journey" && (
        <>
          <nav aria-label="Journey stops" inert={intro === "show"} className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block">
            <ol className="space-y-3">
              {STOPS.map((s, i) => (
                <li key={s.id}>
                  <button onClick={() => go(s.id)} aria-label={`${s.name}: ${s.plain}`} aria-current={hop === i} className="group flex items-center justify-end gap-3">
                    <span className="pl-term pointer-events-none opacity-0 transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80">{s.plain}</span>
                    <span className="block h-2.5 w-2.5 rounded-full border transition-all"
                      style={{ borderColor: "var(--pl-signal)", background: hop === i ? "var(--pl-signal)" : "transparent", transform: hop === i ? "scale(1.4)" : undefined }} />
                  </button>
                </li>
              ))}
            </ol>
          </nav>

        </>
      )}
      <AnimatePresence>
        {intro === "show" && <Connect key="connect" onChoose={finishIntro} onSkip={() => finishIntro("skip")} />}
      </AnimatePresence>
    </div>
  );
}
