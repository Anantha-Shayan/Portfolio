"use client";
// A light overview of SasyaSampada: its real knowledge base as a 3D map of
// passages. Data comes from public/data/sasya-space.json, built by
// scripts/build_sasya_space.py from the project's stored chunks and vectors.

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SpacePoint } from "./KnowledgeSpace3D";

const KnowledgeSpace3D = dynamic(() => import("./KnowledgeSpace3D"), { ssr: false });

type Point = SpacePoint & { page: number | null; section: string | null; t: string; n: number[]; s: number[] };
type Doc = { id: string; title: string; short: string; category: string; year: number | null; chunks: number };
type Data = { dim: number; total: number; model: string; docs: Doc[]; points: Point[] };

const COLORS = ["#7a1f35", "#2f6f73", "#b07d2b", "#44508a", "#6b7a2f", "#8a4f7d"];

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export function SasyaExplorer({ repo }: { repo?: string }) {
  const reduce = useReducedMotion();
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [gl, setGl] = useState(true);
  const [doc, setDoc] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setGl(hasWebGL());
    fetch("/data/sasya-space.json").then((r) => r.json()).then(setData).catch(() => setFailed(true));
  }, []);

  const linked = useMemo(() => (data && selected !== null ? data.points[selected].n.slice(0, 5) : []), [data, selected]);

  if (failed) return <p role="alert">The knowledge-base data couldn&apos;t be loaded.</p>;
  if (!data) return <p className="pl-term opacity-60">loading the index…</p>;

  const shown = hover ?? selected;
  const pt = shown !== null ? data.points[shown] : null;

  return (
    <div>
      <p className="mb-4 text-lg">
        {data.total.toLocaleString()} passages from {data.docs.length} agriculture documents, each turned into a {data.dim}-number vector and stored in Qdrant. Close dots mean similar meaning.
      </p>

      <div className="grid gap-4 md:grid-cols-[1.35fr_1fr]">
        <div className="relative h-[320px] border md:h-[400px]" style={{ borderColor: "var(--pl-line)", background: "var(--pl-panel)" }}>
          {gl ? (
            <KnowledgeSpace3D points={data.points} colors={COLORS} activeDoc={doc} hover={hover} selected={selected} linked={linked} query={null} hits={[]} onHover={setHover} onSelect={setSelected} />
          ) : (
            <p className="p-5 text-sm opacity-70">The 3D view needs WebGL, which isn&apos;t available here.</p>
          )}
          {gl && <p className="pl-term pointer-events-none absolute bottom-2 left-3 opacity-50">drag to rotate</p>}
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {data.docs.map((d, i) => (
              <button key={d.id} aria-pressed={doc === i} onClick={() => setDoc(doc === i ? null : i)} className="flex items-center gap-1.5 border px-2 py-1 text-xs"
                style={{ borderColor: doc === i ? COLORS[i] : "var(--pl-line)", opacity: doc !== null && doc !== i ? 0.5 : 1 }}>
                <i className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />{d.short}
              </button>
            ))}
          </div>
          <motion.div key={shown ?? "hint"} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="border p-4" style={{ borderColor: "var(--pl-line)", background: "var(--pl-panel)" }} aria-live="polite">
            {pt ? (
              <>
                <p className="mb-1 text-sm font-medium" style={{ color: COLORS[pt.d] }}>{data.docs[pt.d].short}{pt.page ? <span className="font-normal opacity-60"> · page {pt.page}</span> : null}</p>
                <p className="text-sm opacity-85">{pt.t}</p>
              </>
            ) : (
              <p className="text-sm opacity-70">Hover a dot to read the passage it holds. Click one to light up its nearest neighbours.</p>
            )}
          </motion.div>
          {repo && <a className="pl-btn mt-3 inline-block" href={repo} target="_blank" rel="noreferrer">View on GitHub</a>}
        </div>
      </div>
    </div>
  );
}
