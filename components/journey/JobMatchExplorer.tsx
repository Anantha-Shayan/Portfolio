"use client";
// A light overview of the Job Recommendation System: pick a sample profile and
// see the jobs it matches, how the score is made up, and which skills are missing.
// Results are precomputed by scripts/build_job_match.py with the project's real
// algorithm and model (all-MiniLM-L6-v2) against its 20 job listings.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Job = { title: string; location: string | null; skills: string[] };
type Result = { job: number; semantic: number; overlap: number; final: number; label: string; missing: string[] };
type Candidate = { id: string; label: string; skills: string[]; projects: string; results: Result[] };
type Data = { jobCount: number; weights: { semantic: number; skills: number }; jobs: Job[]; candidates: Candidate[] };

export function JobMatchExplorer({ repo }: { repo?: string }) {
  const reduce = useReducedMotion();
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    fetch("/data/job-match.json").then((r) => r.json()).then(setData).catch(() => setFailed(true));
  }, []);

  if (failed) return <p role="alert">The job data couldn&apos;t be loaded.</p>;
  if (!data) return <p className="pl-term opacity-60">loading…</p>;

  const cand = data.candidates[ci];
  const ranked = [...cand.results].sort((a, b) => b.final - a.final);

  return (
    <div>
      <p className="mb-4 text-lg">
        The resume is turned into a vector and matched by meaning against {data.jobCount} real job listings. The score is {data.weights.semantic * 100}% similarity and {data.weights.skills * 100}% skill overlap, and missing skills are found by meaning too, not exact words.
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {data.candidates.map((c, i) => (
          <button key={c.id} className="pl-btn" aria-pressed={ci === i} onClick={() => setCi(i)}
            style={ci === i ? { background: "var(--pl-linen)", color: "var(--pl-base)", borderColor: "var(--pl-linen)" } : undefined}>
            {c.label}
          </button>
        ))}
        {repo && <a className="pl-btn ml-auto" href={repo} target="_blank" rel="noreferrer">View on GitHub</a>}
      </div>
      <p className="pl-term mb-5 opacity-60">sample profile · {cand.skills.join(", ")}</p>

      <motion.ol key={cand.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3" aria-live="polite">
        {ranked.map((r) => {
          const job = data.jobs[r.job];
          const sem = r.semantic * data.weights.semantic * 100;
          const skl = r.overlap * data.weights.skills * 100;
          return (
            <li key={r.job} className="border p-4" style={{ borderColor: "var(--pl-line)", background: "var(--pl-panel)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="pl-display text-2xl">{job.title}</h3>
                <span className="text-sm"><strong>{r.final.toFixed(0)}%</strong> <span className="opacity-60">{r.label}</span></span>
              </div>
              <div className="my-3 flex h-1.5 overflow-hidden" style={{ background: "var(--pl-line)" }} role="img" aria-label={`${sem.toFixed(0)} points from similarity, ${skl.toFixed(0)} from skills`}>
                <motion.span initial={reduce ? false : { width: 0 }} animate={{ width: `${sem}%` }} transition={{ duration: 0.6 }} style={{ background: "var(--pl-signal)" }} />
                <motion.span initial={reduce ? false : { width: 0 }} animate={{ width: `${skl}%` }} transition={{ duration: 0.6, delay: 0.1 }} style={{ background: "var(--pl-linen)" }} />
              </div>
              <p className="text-sm opacity-80">
                <span className="opacity-60">Skills to add: </span>
                {r.missing.length ? r.missing.slice(0, 4).join(", ") + (r.missing.length > 4 ? ` +${r.missing.length - 4} more` : "") : "none, a full match"}
              </p>
            </li>
          );
        })}
      </motion.ol>
      <p className="pl-term mt-3 opacity-50">bar: similarity (accent) + skill overlap (ink)</p>
    </div>
  );
}
