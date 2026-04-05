// components/ui/ProjectModal.tsx
// Animated modal that shows architecture breakdown for a project.

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { scaleIn, fadeIn }        from "@/lib/animations";
import type { Project }            from "@/types";
import { CategoryBadge }           from "./CategoryBadge";

interface ProjectModalProps {
  project:  Project | null;
  onClose:  () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        // Overlay
        <motion.div
          key="modal-overlay"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Modal panel */}
          <motion.div
            key="modal-panel"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[660px] max-h-[85vh] overflow-y-auto rounded-2xl border p-8"
            style={{
              background:   "var(--bg2)",
              borderColor:  "var(--border2)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <p className="font-mono text-[0.68rem] tracking-widest uppercase mb-1"
                   style={{ color: "var(--text3)" }}>
                  {project.subtitle}
                </p>
                <h2 className="font-head text-xl font-bold tracking-tight"
                    style={{ color: "var(--text)" }}>
                  {project.title}
                </h2>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.categories.map((c) => (
                    <CategoryBadge key={c} category={c} />
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color:       "var(--text2)",
                  background:  "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff6b6b";
                  (e.currentTarget as HTMLButtonElement).style.color       = "#ff6b6b";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color       = "var(--text2)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Overview */}
            <ModalSection title="Overview">
              <p className="text-[0.9rem] leading-relaxed" style={{ color: "var(--text2)" }}>
                {project.overview}
              </p>
            </ModalSection>

            {/* Architecture */}
            <ModalSection title="Architecture">
              <div className="flex flex-col gap-3">
                {project.architecture.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start text-[0.85rem]"
                       style={{ color: "var(--text2)" }}>
                    <span
                      className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center font-mono text-[0.7rem] mt-0.5"
                      style={{
                        background:  "rgba(108,127,255,0.1)",
                        border:      "1px solid rgba(108,127,255,0.25)",
                        color:       "var(--accent)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </ModalSection>

            {/* Stack */}
            <ModalSection title="Stack">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.68rem] px-2 py-1 rounded border"
                    style={{
                      borderColor: "var(--border)",
                      color:       "var(--text3)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ModalSection>

            {/* GitHub link */}
            <div className="mt-5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.78rem] px-4 py-2 rounded-lg border transition-all duration-200"
                style={{
                  borderColor: "rgba(108,127,255,0.35)",
                  color:       "var(--accent)",
                  background:  "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,127,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                View on GitHub ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small helper for labelled sections inside the modal
function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="font-mono text-[0.68rem] tracking-widest uppercase mb-2"
         style={{ color: "var(--accent)" }}>
        {title}
      </p>
      {children}
    </div>
  );
}
