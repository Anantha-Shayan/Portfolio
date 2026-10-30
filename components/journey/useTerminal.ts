"use client";
// Drives a terminal sequence: type the command, stream the output lines, then
// convert the output items to UI one by one.

import { useEffect, useState } from "react";

type Opts = {
  command: string;
  lineCount: number;
  itemCount: number;
  start: boolean;
  reduce: boolean | null;
  delay?: number;
};

export function useTerminal({ command, lineCount, itemCount, start, reduce, delay = 250 }: Opts) {
  const [s, setS] = useState({ typed: 0, shown: 0, ui: 0 });
  const [run, setRun] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (!start) return;
    const full = { typed: command.length, shown: lineCount, ui: itemCount };
    if (reduce || skipped) { setS(full); return; }

    let dead = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      setS({ typed: 0, shown: 0, ui: 0 });
      await wait(delay);
      for (let i = 1; i <= command.length; i++) { if (dead) return; setS((p) => ({ ...p, typed: i })); await wait(32); }
      await wait(380);
      for (let i = 1; i <= lineCount; i++) { if (dead) return; setS((p) => ({ ...p, shown: i })); await wait(70); }
      await wait(750);
      for (let i = 1; i <= itemCount; i++) { if (dead) return; setS((p) => ({ ...p, ui: i })); await wait(170); }
    })();
    return () => { dead = true; };
  }, [start, run, skipped, reduce, command, lineCount, itemCount, delay]);

  const phase: "idle" | "term" | "morph" | "ui" =
    s.ui >= itemCount && itemCount > 0 ? "ui" : s.ui > 0 ? "morph" : s.typed > 0 ? "term" : "idle";

  return {
    ...s,
    phase,
    skip: () => setSkipped(true),
    replay: () => { setSkipped(false); setRun((r) => r + 1); },
  };
}
