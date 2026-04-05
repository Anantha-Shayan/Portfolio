// components/sections/Experience.tsx
// Timeline-style experience section.

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel }   from "@/components/ui/SectionLabel";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionLabel>Experience</SectionLabel>

      {/* Timeline container */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative pl-6"
        style={{
          // Vertical timeline line
          borderLeft: "1px solid var(--border)",
        }}
      >
        {experience.map((exp) => (
          <motion.div
            key={exp.company}
            variants={staggerChild}
            className="relative mb-10 last:mb-0"
          >
            {/* Timeline dot */}
            <span
              className="absolute -left-[1.875rem] top-1.5 w-2.5 h-2.5 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow:  "0 0 0 3px var(--bg), 0 0 0 4px var(--accent)",
              }}
              aria-hidden
            />

            {/* Role + company */}
            <h3 className="font-head text-[1.1rem] font-bold tracking-tight mb-0.5"
                style={{ color: "var(--text)" }}>
              {exp.role} ·{" "}
              <span style={{ color: "var(--accent)" }}>{exp.company}</span>
            </h3>

            {/* Meta */}
            <p className="font-mono text-[0.72rem] tracking-wider mb-4"
               style={{ color: "var(--text3)" }}>
              {exp.period} · {exp.type}
            </p>

            {/* Bullet points */}
            <ul className="flex flex-col gap-2">
              {exp.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[0.9rem] font-light leading-relaxed"
                  style={{ color: "var(--text2)" }}
                >
                  <span
                    className="flex-shrink-0 text-[1.1rem] leading-[1.45]"
                    style={{ color: "var(--accent)" }}
                    aria-hidden
                  >
                    ›
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
