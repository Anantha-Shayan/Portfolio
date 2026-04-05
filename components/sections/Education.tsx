// components/sections/Education.tsx

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel }   from "@/components/ui/SectionLabel";
import { education } from "@/data/profile";

export function Education() {
  return (
    <SectionWrapper id="education">
      <SectionLabel>Education</SectionLabel>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 gap-5"
      >
        {education.map((edu) => (
          <motion.div
            key={edu.institution}
            variants={staggerChild}
            className="border rounded-xl px-6 py-5 transition-colors duration-200 cursor-default"
            style={{ borderColor: "var(--border)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
            }
          >
            <h3 className="font-head text-[1rem] font-bold mb-1"
                style={{ color: "var(--text)" }}>
              {edu.institution}
            </h3>

            <p className="text-[0.85rem] font-light mb-1"
               style={{ color: "var(--text2)" }}>
              {edu.degree}
            </p>

            <p className="font-mono text-[0.72rem] mb-3"
               style={{ color: "var(--text3)" }}>
              {edu.period}
            </p>

            <span
              className="inline-flex font-mono text-[0.65rem] px-2.5 py-1 rounded-full border tracking-wider"
              style={{
                background:  "rgba(108,127,255,0.1)",
                color:       "var(--accent)",
                borderColor: "rgba(108,127,255,0.25)",
              }}
            >
              {edu.badge}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
