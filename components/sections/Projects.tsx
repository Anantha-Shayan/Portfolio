// components/sections/Projects.tsx
// Filterable project list with click-through modals.

"use client";

import { useState }  from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper }  from "@/components/ui/SectionWrapper";
import { SectionLabel }    from "@/components/ui/SectionLabel";
import { CategoryBadge }   from "@/components/ui/CategoryBadge";
import { ProjectModal }    from "@/components/ui/ProjectModal";
import { projects }        from "@/data/profile";
import type { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All",     value: "all" },
  { label: "ML",      value: "ml" },
  { label: "NLP",     value: "nlp" },
  { label: "Systems", value: "systems" },
];

export function Projects() {
  const [filter,  setFilter]  = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(
    (p) => filter === "all" || p.categories.includes(filter)
  );

  return (
    <SectionWrapper id="projects">
      <SectionLabel>Projects</SectionLabel>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "font-mono text-[0.72rem] tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200",
              filter === value
                ? "border-[var(--accent)] text-[var(--accent)] bg-[rgba(108,127,255,0.08)]"
                : "border-[var(--border)] text-[var(--text3)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col border rounded-2xl overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}

// ─── Single project row ──────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      variants={staggerChild}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="relative px-8 py-6 border-b last:border-b-0 cursor-pointer group transition-colors duration-200"
      style={{
        background:  "var(--bg2)",
        borderColor: "var(--border)",
      }}
      onClick={onClick}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "var(--bg3)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "var(--bg2)")
      }
    >
      {/* Arrow indicator */}
      <span
        className="absolute top-6 right-7 text-base transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: "var(--text3)" }}
        aria-hidden
      >
        ↗
      </span>

      {/* Number */}
      <p className="font-mono text-[0.65rem] tracking-widest uppercase mb-1.5"
         style={{ color: "var(--text3)" }}>
        {project.num}
      </p>

      {/* Title + subtitle */}
      <h3 className="font-head text-[1.1rem] font-bold tracking-tight mb-0.5 pr-8"
          style={{ color: "var(--text)" }}>
        {project.title}
      </h3>
      <p className="font-mono text-[0.72rem] mb-3" style={{ color: "var(--text3)" }}>
        {project.subtitle}
      </p>

      {/* Category badges */}
      <div className="flex gap-2 flex-wrap mb-3">
        {project.categories.map((c) => (
          <CategoryBadge key={c} category={c} />
        ))}
      </div>

      {/* Description */}
      <p className="text-[0.9rem] font-light leading-relaxed mb-4 max-w-xl"
         style={{ color: "var(--text2)" }}>
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-1.5 mb-4">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 font-mono text-[0.75rem]"
              style={{ color: "var(--text3)" }}>
            <span style={{ color: "var(--accent)" }} aria-hidden>–</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.68rem] px-2 py-0.5 rounded border"
            style={{ borderColor: "var(--border)", color: "var(--text3)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
