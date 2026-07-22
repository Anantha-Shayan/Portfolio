"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiLinux,
  SiMysql,
  SiN8N,
  SiPostman,
  SiPostgresql,
  SiPrometheus,
  SiPython,
} from "react-icons/si";
import {
  LuBrainCircuit,
  LuCodeXml,
  LuDatabase,
  LuImage,
  LuLanguages,
  LuNetwork,
  LuSearch,
  LuServer,
} from "react-icons/lu";
import type { Skill } from "@/data/profile";

type SkillCardProps = {
  skill: Skill;
};

const proficiencyStyles: Record<Skill["proficiency"], string> = {
  Production: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Advanced: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Intermediate: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  Learning: "border-violet-500/20 bg-violet-500/10 text-violet-400",
  Beginner: "border-slate-500/20 bg-slate-500/10 text-slate-400",
  Projects: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  Project: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  Theory: "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
};

const skillIcons: Record<string, IconType> = {
  python: SiPython,
  sql: LuDatabase,
  c: SiC,
  cplusplus: SiCplusplus,
  "machine-learning": LuBrainCircuit,
  rag: LuBrainCircuit,
  "semantic-search": LuSearch,
  recommendation: LuNetwork,
  nlp: LuLanguages,
  cnn: LuImage,
  docker: SiDocker,
  fastapi: SiFastapi,
  flask: SiFlask,
  linux: SiLinux,
  "google-cloud": SiGooglecloud,
  "github-actions": SiGithubactions,
  server: LuServer,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  faiss: LuSearch,
  "vector-db": LuDatabase,
  grafana: SiGrafana,
  prometheus: SiPrometheus,
  github: SiGithub,
  postman: SiPostman,
  n8n: SiN8N,
  figma: SiFigma,
};

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon ? (skillIcons[skill.icon] ?? LuCodeXml) : LuCodeXml;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group rounded-2xl border p-5 transition-colors duration-200 hover:border-[var(--border2)]"
      style={{ borderColor: "var(--border)", background: "var(--bg2)" }}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 group-hover:border-[var(--border2)]"
            style={{ borderColor: "var(--border)", color: "var(--text2)" }}
          >
            <Icon className="size-[18px]" />
          </span>
          <h3 className="truncate text-base font-semibold" style={{ color: "var(--text)" }}>
            {skill.name}
          </h3>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${
            proficiencyStyles[skill.proficiency]
          }`}
        >
          {skill.proficiency}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.concepts.map((concept) => (
          <span
            key={concept}
            className="rounded-md border px-2 py-1 font-mono text-[11px] leading-4 transition-colors duration-200 group-hover:border-[var(--border2)]"
            style={{ borderColor: "var(--border)", color: "var(--text2)" }}
          >
            {concept}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
