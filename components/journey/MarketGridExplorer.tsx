"use client";
// Explore MarketGrid: architecture diagrams you can step through.
// Everything here is taken from the repository manifests and source.
// The layout is simplified, not an exact service map.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Node = { x: number; y: number; w: number; h: number; label: string; sub?: string; dashed?: boolean; what: string; built?: string };
type Box = { x: number; y: number; w: number; h: number; label: string; dashed?: boolean };
type Step = { node: string; title: string; text: string };
type View = {
  id: string; label: string; note: string; viewBox: string; boxes: Box[];
  nodes: Record<string, Node>; edges: [string, string, boolean?][];
  flows: { id: string; label: string; steps: Step[] }[];
};

const K8S: View = {
  id: "k8s", label: "Kubernetes · Minikube", note: "", viewBox: "0 0 780 380",
  boxes: [
    { x: 150, y: 8, w: 490, h: 364, label: "Minikube cluster", dashed: true },
    { x: 162, y: 34, w: 466, h: 244, label: "namespace: ecommerce" },
  ],
  nodes: {
    client: { x: 16, y: 150, w: 104, h: 50, label: "Client", sub: "browser", what: "Where every request starts." },
    kubectl: { x: 16, y: 300, w: 104, h: 50, label: "kubectl", sub: "apply · rollout", what: "Manifests in k8s/ are applied from the local machine.", built: "Wrote the manifests for every workload." },
    config: { x: 180, y: 84, w: 112, h: 46, label: "Config & Secrets", sub: "ConfigMap · Secret", what: "Settings and credentials, injected into pods as environment variables.", built: "Config and secrets management." },
    ingress: { x: 180, y: 150, w: 112, h: 50, label: "NGINX Ingress", sub: "ecommerce.local", what: "The way in from outside: /api to the backend, everything else to the frontend.", built: "Service networking and routing for / and /api." },
    jobs: { x: 180, y: 216, w: 112, h: 46, label: "Jobs", sub: "migrate · seed", what: "Two Kubernetes Jobs: Alembic migrations, then seed data.", built: "Alembic migration and database seeding as Kubernetes Jobs." },
    frontend: { x: 340, y: 64, w: 124, h: 46, label: "Frontend", sub: "React · 2 replicas", what: "The React app, served by nginx.", built: "The React storefront and its deployment." },
    backend: { x: 340, y: 150, w: 124, h: 50, label: "Backend", sub: "FastAPI · HPA 2–5", what: "FastAPI with JWT authentication and role-based access control. Autoscales from 2 to 5 pods on CPU.", built: "The API, plus its probes, rolling updates, graceful shutdown and autoscaling." },
    postgres: { x: 486, y: 216, w: 130, h: 42, label: "PostgreSQL", sub: "persistent volume", what: "Users, products, orders and payments, on a persistent volume.", built: "The schema, triggers and transaction-safe checkout." },
    rabbit: { x: 486, y: 154, w: 130, h: 42, label: "RabbitMQ", sub: "StatefulSet · volume", what: "Holds the durable queue of email jobs.", built: "Event-driven email: publishing jobs to a durable queue." },
    worker: { x: 652, y: 154, w: 112, h: 42, label: "Email worker", sub: "runs in Compose", dashed: true, what: "Reads the queue and sends the email. Runs in Compose today, not yet in the cluster.", built: "The worker that sends the confirmation emails." },
    metrics: { x: 340, y: 300, w: 124, h: 46, label: "Metrics Server", sub: "kube-system addon", what: "Reports pod CPU, which the autoscaler reads.", built: "Enabled it so autoscaling runs on live CPU metrics." },
  },
  edges: [
    ["client", "ingress"], ["ingress", "frontend"], ["ingress", "backend"], ["backend", "postgres"], ["backend", "rabbit"],
    ["rabbit", "worker", true], ["config", "backend", true], ["jobs", "postgres", true], ["metrics", "backend", true],
  ],
  flows: [
    {
      id: "order", label: "Follow an order",
      steps: [
        { node: "client", title: "A buyer checks out", text: "The request leaves the browser." },
        { node: "ingress", title: "The Ingress routes it", text: "/api goes to the backend, everything else to the frontend." },
        { node: "backend", title: "The API checks who's asking", text: "JWT authentication and role-based access control." },
        { node: "postgres", title: "One transaction does the checkout", text: "Stock rows are locked, the order and payment are written, and any failure rolls it all back." },
        { node: "rabbit", title: "An email job is queued", text: "A durable RabbitMQ queue keeps checkout fast." },
        { node: "worker", title: "A worker sends it", text: "The confirmation email goes out off the request path." },
      ],
    },
  ],
};

const mid = (n: Node) => ({ x: n.x + n.w / 2, y: n.y + n.h / 2 });
// The probe parks on a node's top-right corner so it never covers the label.
const corner = (n: Node) => ({ x: n.x + n.w - 9, y: n.y + 9 });

export function MarketGridExplorer({ repo }: { repo?: string }) {
  const reduce = useReducedMotion();
  const [flow, setFlow] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pinned, setPinned] = useState<string | null>(null);

  const view = K8S;
  const steps = view.flows[flow].steps;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const seen = steps.slice(0, step + 1).map((s) => s.node);
  const node = view.nodes[pinned ?? steps[step].node];
  const cur = corner(view.nodes[steps[step].node]);
  const onPath = (a: string, b: string) => {
    for (let i = 0; i < step; i++) if ((steps[i].node === a && steps[i + 1].node === b) || (steps[i].node === b && steps[i + 1].node === a)) return true;
    return false;
  };
  const reset = () => { setStep(0); setPlaying(false); setPinned(null); };
  const chooseFlow = (i: number) => { setFlow(i); reset(); };
  const toggle = (id: string) => { setPlaying(false); setPinned(pinned === id ? null : id); };

  return (
    <div>
      {view.flows.length > 1 && <div role="tablist" aria-label="Flow" className="mb-4 flex flex-wrap gap-2">
        {view.flows.map((f, i) => (
          <button key={f.id} role="tab" aria-selected={flow === i} className="pl-btn" style={flow === i ? { borderColor: "var(--pl-signal)", color: "var(--pl-signal)" } : undefined} onClick={() => chooseFlow(i)}>
            {f.label}
          </button>
        ))}
      </div>}

      <div className="overflow-x-auto border" style={{ borderColor: "var(--pl-line)", background: "var(--pl-panel)" }}>
        <svg viewBox={view.viewBox} className="block w-full min-w-[680px]" role="img" aria-label={`MarketGrid architecture: ${view.label}`}>
          {view.boxes.map((b) => (
            <g key={b.label}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={4} fill="none" stroke="var(--pl-line)" strokeDasharray={b.dashed ? "5 4" : undefined} />
              <text x={b.x + 12} y={b.y + 18} fontSize={11} fill="currentColor" opacity={0.55}>{b.label}</text>
            </g>
          ))}

          {view.edges.map(([a, b, dashed]) => {
            const A = mid(view.nodes[a]), B = mid(view.nodes[b]);
            const hot = onPath(a, b);
            return <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={hot ? "var(--pl-signal)" : "var(--pl-line)"} strokeWidth={hot ? 2.5 : 1.2} strokeDasharray={dashed ? "4 4" : undefined} />;
          })}

          {Object.entries(view.nodes).map(([id, n]) => {
            const lit = steps[step].node === id || pinned === id;
            return (
              <g key={id} role="button" tabIndex={0} aria-label={`${n.label}: ${n.what}`} onClick={() => toggle(id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(id)} style={{ cursor: "pointer" }}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={3} fill="var(--pl-base)" stroke={lit || seen.includes(id) ? "var(--pl-signal)" : "var(--pl-line)"} strokeWidth={lit ? 2.5 : 1.2} strokeDasharray={n.dashed ? "4 3" : undefined} />
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 - (n.sub ? 2 : -4)} textAnchor="middle" fontSize={13} fontWeight={600} fill="currentColor">{n.label}</text>
                {n.sub && <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 14} textAnchor="middle" fontSize={10} fill="currentColor" opacity={0.6}>{n.sub}</text>}
              </g>
            );
          })}

          <motion.circle r={6} fill="var(--pl-signal)" initial={false} animate={{ cx: cur.x, cy: cur.y }} transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }} pointerEvents="none" />
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className="pl-btn" disabled={step === 0} onClick={() => { setPlaying(false); setPinned(null); setStep(step - 1); }}>Back</button>
        <button className="pl-btn pl-btn-solid" onClick={() => { setPinned(null); if (step >= steps.length - 1) setStep(0); setPlaying(!playing); }}>{playing ? "Pause" : step >= steps.length - 1 ? "Replay" : "Play"}</button>
        <button className="pl-btn" disabled={step >= steps.length - 1} onClick={() => { setPlaying(false); setPinned(null); setStep(step + 1); }}>Next</button>
        <span className="pl-term opacity-60">step {step + 1} of {steps.length}</span>
        {repo && <a className="pl-btn ml-auto" href={repo} target="_blank" rel="noreferrer">View on GitHub</a>}
      </div>

      <motion.div key={`${flow}-${step}-${pinned}`} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4 border p-5" style={{ borderColor: "var(--pl-line)", background: "var(--pl-panel)" }} aria-live="polite">
        <h3 className="pl-display mb-2 text-3xl">{pinned ? node.label : steps[step].title}</h3>
        <p className="mb-3">{pinned ? node.what : steps[step].text}</p>
        {node.built && (
          <p className="border-l-2 pl-3 text-sm" style={{ borderColor: "var(--pl-signal)" }}>
            <span className="opacity-60">What I built: </span>{node.built}
          </p>
        )}
      </motion.div>
    </div>
  );
}
