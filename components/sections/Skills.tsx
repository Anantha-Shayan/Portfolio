"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/profile";
import { staggerChild, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkillCard } from "./SkillCard";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionLabel>Engineering Toolbox</SectionLabel>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-12"
      >
        {skills.map((group) => (
          <motion.section key={group.label} variants={staggerChild}>
            <div className="mb-5 flex items-center gap-3">
              <h2
                className="font-mono text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {group.label}
              </h2>
              <span className="h-px flex-1" style={{ background: "var(--border)" }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "var(--text3)" }}
              >
                {String(group.skills.length).padStart(2, "0")} tools
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
