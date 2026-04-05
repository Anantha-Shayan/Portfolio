// components/sections/Skills.tsx

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel }   from "@/components/ui/SectionLabel";
import { skills } from "@/data/profile";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionLabel>Skills</SectionLabel>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4"
      >
        {skills.map((group) => (
          <motion.div
            key={group.label}
            variants={staggerChild}
            className="border rounded-xl px-5 py-4 transition-colors duration-200"
            style={{ borderColor: "var(--border)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border2)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
            }
          >
            {/* Group label */}
            <p className="font-mono text-[0.68rem] uppercase tracking-widest mb-3"
               style={{ color: "var(--accent)" }}>
              {group.label}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-tag font-mono text-[0.78rem] px-3 py-1 rounded-full border cursor-default"
                  style={{
                    borderColor: "var(--border)",
                    color:       "var(--text2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
