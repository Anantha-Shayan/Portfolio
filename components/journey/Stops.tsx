"use client";
// The seven stops, in the order an engineer would check out a host before
// depending on it. Each runs a real command whose output has the same shape as
// the content, then morphs from terminal text into its web UI.

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import { trackEvent } from "@/lib/analytics";
import { TerminalStop, type Item } from "./TerminalStop";
import { ExploreModal } from "./ExploreModal";
import { MarketGridExplorer } from "./MarketGridExplorer";
import { SasyaExplorer } from "./SasyaExplorer";
import { JobMatchExplorer } from "./JobMatchExplorer";
import { useTerminal } from "./useTerminal";

import { DOMAIN } from "./stopsData";
export { STOPS } from "./stopsData";

const ruled = { borderColor: "var(--pl-line)" } as const;

/* ── Hero: dig ─────────────────────────────────────────────────── */

export function Hero({ onSummary, ready }: { onSummary: () => void; ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const cmd = `dig ${DOMAIN}`;
  const t = useTerminal({ command: cmd, lineCount: 1, itemCount: 0, start: inView && ready, reduce, delay: 1100 });
  const lines = ["Inspect this host.", "Seven commands."];

  return (
    <section id="dns" data-stop className="flex min-h-screen items-center px-6 py-24 md:px-16">
      <div className="max-w-2xl" ref={ref}>
        <h1 className="pl-display text-[clamp(2.75rem,5.2vw,5.25rem)]">
          {lines.map((l, i) => (
            <span key={l} className="pl-mask">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: ready ? 0 : "105%" }} transition={{ duration: reduce ? 0 : 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div className="mt-8 max-w-md" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: reduce ? 0 : 0.9 }}>
          <p className="text-lg">
            Before you depend on a system, you check it. Scroll to run the checks on {resume.name}, who builds practical systems end to end, from backend and cloud infrastructure to automation and applied AI.
          </p>
          <div className="pl-term mt-5 min-h-[3.2rem] opacity-80" aria-hidden>
            <div><span style={{ color: "var(--pl-signal)" }}>$</span> {cmd.slice(0, t.typed)}{t.phase === "term" && t.shown === 0 && <span className="pl-caret" />}</div>
            {t.shown > 0 && <div>{DOMAIN}. 300 IN A 203.0.113.28<span className="pl-caret" /></div>}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="pl-btn pl-btn-solid" href="#whois">Run the first check</a>
            <button className="pl-btn" onClick={onSummary}>Just the highlights</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About: whois ──────────────────────────────────────────────── */

export function About() {
  const fields: [string, string][] = [
    ["Registrant Name", resume.name],
    ["Registrant City", "Bengaluru"],
    ["Registrant Country", "IN"],
    ["Education", "IIT Ropar (Major in AI), JSSATE (B.Tech CSE, AI&ML)"],
    ["Status", profile.status],
  ];
  const items: Item[] = [
    {
      lines: fields.map(([k, v]) => `${k}: ${v}`),
      ui: (
        <>
          <p className="mb-5 text-lg">{resume.summary}</p>
          <dl className="grid grid-cols-[7rem_1fr] gap-y-2 border-t pt-4 text-sm" style={ruled}>
            {fields.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="opacity-60">{k.replace("Registrant ", "")}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      ),
    },
  ];
  return <TerminalStop index={1} command={`whois ${DOMAIN}`} items={items} heading="Hello, I'm Anantha." />;
}

/* ── Education: openssl x509 ───────────────────────────────────── */

export function Tls() {
  const periods = resume.education.map((e) => e.period.split(" – "));
  const items: Item[] = resume.education.map((e, i) => ({
    lines: [`issuer    = ${e.school}`, `subject   = ${e.detail}`, `notBefore = ${periods[i][0]}`, `notAfter  = ${periods[i][1]}`, ""],
    ui: (
      <div className="mb-4 border p-5" style={{ ...ruled, background: "var(--pl-panel)" }}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="pl-display text-2xl">{e.school}</h3>
          <span className="pl-term flex items-center gap-2" style={{ color: "var(--pl-signal)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="5" y="11" width="14" height="9" rx="1" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
            verified
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
          <dt className="opacity-60">Subject</dt><dd>{e.detail}</dd>
          <dt className="opacity-60">Valid</dt><dd>{e.period}</dd>
        </dl>
      </div>
    ),
  }));
  return <TerminalStop index={5} command="openssl x509 -in credentials.pem -noout -issuer -subject -dates" items={items} heading="Credentials, verified." />;
}

/* ── Skills: nmap -sV ──────────────────────────────────────────── */

// Default service ports for the tools that listen on one. Skills without a
// port (languages, AI/ML, ...) appear as script output, like nmap's NSE.
const PORTS: Record<string, [string, string]> = {
  FastAPI: ["8000/tcp", "http"],
  Flask: ["5000/tcp", "http"],
  RabbitMQ: ["5672/tcp", "amqp"],
  Docker: ["2376/tcp", "docker"],
  Kubernetes: ["6443/tcp", "kubernetes"],
  Linux: ["22/tcp", "ssh"],
  "Google Cloud": ["443/tcp", "https"],
  "Server Management": ["80/tcp", "http"],
  PostgreSQL: ["5432/tcp", "postgresql"],
  MySQL: ["3306/tcp", "mysql"],
  "Vector Databases (FAISS, Qdrant, Endee)": ["6333/tcp", "qdrant"],
  Grafana: ["3000/tcp", "grafana"],
  Prometheus: ["9090/tcp", "prometheus"],
  Sentry: ["9000/tcp", "sentry"],
  n8n: ["5678/tcp", "n8n"],
  GitHub: ["9418/tcp", "git"],
};
const VERSION: Record<string, string> = {
  "Vector Databases (FAISS, Qdrant, Endee)": "Qdrant, FAISS, Endee",
  "Server Management": "nginx, VPS management",
};

const row = (port: string, svc: string, ver: string) => `${port.padEnd(10)}open  ${svc.padEnd(11)}${ver}`;
const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function Skills() {
  const groups = Object.entries(resume.skills);
  const hasPort = ([, names]: [string, string[]]) => names.some((n) => PORTS[n]);
  // nmap prints ports first, then script results.
  const ordered = [...groups.filter(hasPort), ...groups.filter((g) => !hasPort(g))];
  let scriptsStarted = false;

  const items: Item[] = [{ lines: ["PORT      STATE SERVICE    VERSION"], ui: null }];
  ordered.forEach(([label, names]) => {
    const ported = names.filter((n) => PORTS[n]);
    const loose = names.filter((n) => !PORTS[n]);
    const lines = ported.map((n) => row(PORTS[n][0], PORTS[n][1], VERSION[n] ?? n));
    if (loose.length) {
      if (!ported.length && !scriptsStarted) { lines.push("", "Host script results:"); scriptsStarted = true; }
      lines.push(`| ${slug(label)}: ${loose.join(", ")}`);
    }
    items.push({
      lines,
      ui: (
        <div className="grid grid-cols-[8.5rem_1fr] gap-x-4 border-t py-3 text-sm" style={ruled}>
          <span className="font-medium">{label}</span>
          <span className="opacity-85">{names.map((n) => VERSION[n]?.split(",")[0] === n ? n : n.replace(/ \(.*\)/, "")).join(", ")}</span>
        </div>
      ),
    });
  });
  return <TerminalStop index={3} command={`nmap -sV ${DOMAIN}`} items={items} heading="What I can serve." wide />;
}

/* ── Projects: curl | jq ───────────────────────────────────────── */

function ProjectRow({ p, first, onExplore }: { p: (typeof resume.projects)[number]; first: boolean; onExplore?: () => void }) {
  const [open, setOpen] = useState(first);
  const reduce = useReducedMotion();
  return (
    <div className="border-t" style={ruled}>
      <button className="flex w-full items-baseline justify-between gap-4 py-4 text-left" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>
          <span className="pl-display block text-3xl">{p.title}</span>
          <span className="text-sm opacity-65">{p.subtitle}</span>
        </span>
        <span aria-hidden>{open ? "–" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="overflow-hidden" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="pb-5">
              <p className="mb-2">{p.summary}</p>
              <ul className="mb-3 space-y-1 text-sm opacity-85">{p.highlights.map((h) => <li key={h} className="pl-4 -indent-4">– {h}</li>)}</ul>
              <p className="pl-term opacity-70">{p.stack.join(" · ")}</p>
              {onExplore && (
                <button className="pl-btn pl-btn-solid mt-4" onClick={onExplore}>Explore {p.title}</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

// Resource names come from the manifests in the MarketGrid repository's k8s/ directory.
const MARKETGRID_LINES = [
  "deployment.apps/backend",
  "deployment.apps/frontend",
  "deployment.apps/postgres-deployment",
  "statefulset.apps/rabbitmq",
  "service/backend-service",
  "service/frontend-service",
  "service/postgres-service",
  "service/rabbitmq",
  "ingress.networking.k8s.io/ecommerce-ingress",
  "horizontalpodautoscaler.autoscaling/backend-hpa",
  "job.batch/backend-migration",
  "job.batch/backend-seed",
];

// Chunk counts are from the stored embeddings in the SasyaSampada repository.
const SASYA_LINES = [
  "[",
  '  {"document_id": "agriwelfare_annual_report_2024_25", "success": true, "chunks_indexed": 1063},',
  '  {"document_id": "farmers_handbook_basic_agriculture_2016", "success": true, "chunks_indexed": 458},',
  '  {"document_id": "icar_kharif_agro_advisories_2025", "success": true, "chunks_indexed": 3703},',
  '  {"document_id": "manage_natural_farming_study_material_2023", "success": true, "chunks_indexed": 755},',
  '  {"document_id": "pmfby_operational_guidelines_revised", "success": true, "chunks_indexed": 438},',
  '  {"document_id": "tnau_crop_production_guide_2020", "success": true, "chunks_indexed": 1694}',
  "]",
];

export function Projects() {
  const [explore, setExplore] = useState<"marketgrid" | "sasya-sampada" | "job-rec" | null>(null);
  const github = (id: string) => resume.projects.find((p) => p.id === id)?.github;
  const items: Item[] = [
    { lines: ["["], ui: null },
    ...resume.projects.map((p, i, all): Item => ({
      lines: [
        "  {",
        `    "name": "${p.title}",`,
        `    "type": "${p.subtitle}",`,
        `    "stack": [${p.stack.map((x) => `"${x}"`).join(", ")}]`,
        i < all.length - 1 ? "  }," : "  }",
      ],
      ui: <ProjectRow p={p} first={i === 0} onExplore={p.id === "marketgrid" || p.id === "sasya-sampada" || p.id === "job-rec" ? () => { trackEvent("project_explore", { project: p.id }); setExplore(p.id as "marketgrid" | "sasya-sampada" | "job-rec"); } : undefined} />,
    })),
    { lines: ["]"], ui: null },
  ];
  return (
    <>
      <TerminalStop index={4} command={`curl -s https://${DOMAIN}/api/projects | jq`} items={items} heading={`${COUNT_WORDS[resume.projects.length] ?? resume.projects.length} things I've shipped.`} wide />
      {explore === "marketgrid" && (
        <ExploreModal command={"kubectl get deploy,sts,svc,ingress,hpa,job \\\n  -n ecommerce -o name"} lines={MARKETGRID_LINES} heading="Explore MarketGrid." label="MarketGrid" onClose={() => setExplore(null)}>
          <MarketGridExplorer repo={github("marketgrid")} />
        </ExploreModal>
      )}
      {explore === "job-rec" && (
        <ExploreModal command="python job_indexing.py" lines={["20 jobs stored in Endee successfully."]} heading="Explore the Job Recommender." label="Job Recommender" onClose={() => setExplore(null)}>
          <JobMatchExplorer repo={github("job-rec")} />
        </ExploreModal>
      )}
      {explore === "sasya-sampada" && (
        <ExploreModal command="python -m app.ingestion ingest --all" lines={SASYA_LINES} heading="Explore SasyaSampada." label="SasyaSampada" onClose={() => setExplore(null)}>
          <SasyaExplorer repo={github("sasya-sampada")} />
        </ExploreModal>
      )}
    </>
  );
}

/* ── Experience: systemctl status ──────────────────────────────── */

export function Experience() {
  const roles = resume.experience;
  const items: Item[] = roles.flatMap((e, r): Item[] => {
    const since = e.period.split(" – ")[0];
    return [
      {
        lines: [
          ...(r > 0 ? [""] : []),
          `● ${e.unit}.service - ${e.org}`,
          `     Loaded: loaded (role: ${e.title})`,
          `     Active: active (running) since ${since}`,
          `      Tasks: ${e.points.length}`,
          `     CGroup: /${e.unit}.slice`,
        ],
        ui: (
          <div className={`mb-2 ${r > 0 ? "mt-8" : ""}`}>
            <h3 className="text-xl font-semibold">{e.title}, {e.org}</h3>
            <p className="pl-term mt-1 flex items-center gap-2 opacity-80">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#2f7a4a" }} />
              active (running) since {since}
            </p>
          </div>
        ),
      },
      ...e.points.map((p, i): Item => ({
        lines: [`             ${i === e.points.length - 1 ? "└─" : "├─"} ${p}`],
        ui: <p className="mb-3 border-l pl-4" style={{ borderColor: "var(--pl-signal)" }}>{p}</p>,
      })),
    ];
  });
  const command = `systemctl status --no-pager \\\n  ${roles.map((e) => `${e.unit}.service`).join(" ")}`;
  return <TerminalStop index={2} command={command} items={items} heading="Running in production." wide />;
}

/* ── Contact: ping ─────────────────────────────────────────────── */

function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    setFallback(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, startedAt: startedAt.current }) });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string; fallback?: boolean } | null;
        // When delivery itself failed, give the visitor a way to send the same text by email.
        if (body?.fallback) setFallback(`mailto:${profile.email}?subject=${encodeURIComponent(`Message from ${data.name}`)}&body=${encodeURIComponent(data.message)}`);
        throw new Error(body?.error ?? "The message could not be sent.");
      }
      form.reset();
      setState("ok");
      trackEvent("contact_submit", { status: "success" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The message could not be sent.");
      setState("error");
      trackEvent("contact_submit", { status: "error" });
    }
  }

  if (state === "ok") return <p className="pl-term text-base" role="status">1 packet transmitted, 1 received. I&apos;ll reply to the address you gave.</p>;
  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="pl-input" name="name" placeholder="Your name" required maxLength={100} autoComplete="name" />
      <input className="pl-input" name="email" type="email" placeholder="Your email" required maxLength={254} autoComplete="email" />
      <textarea className="pl-input" name="message" placeholder="What would you like to talk about?" rows={4} required maxLength={5000} />
      {/* Honeypot: real visitors never see or fill this. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center gap-4">
        <button className="pl-btn pl-btn-solid" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
        {state === "error" && (
          <span role="alert" className="text-sm" style={{ color: "var(--pl-signal)" }}>
            {error}{" "}
            {fallback && <a className="underline" href={fallback}>Send it by email instead</a>}
          </span>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const items: Item[] = [
    {
      lines: [`PING ${DOMAIN} (203.0.113.28) 56(84) bytes of data.`, "64 bytes from 203.0.113.28: icmp_seq=1 ttl=57", "", `--- ${DOMAIN} ping statistics ---`, "1 packets transmitted, 1 received, 0% packet loss"],
      ui: <ContactForm />,
    },
    {
      lines: [],
      ui: (
        <p className="mt-8 text-sm opacity-80">
          Or write to <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a className="underline" href={profile.socials.linkedin}>LinkedIn</a> ·{" "}
          <a className="underline" href={profile.socials.github}>GitHub</a> ·{" "}
          <a className="underline" href={profile.socials.medium}>Medium</a>
        </p>
      ),
    },
  ];
  return <TerminalStop index={6} command={`ping -c 1 ${DOMAIN}`} items={items} heading="Say hello." />;
}
