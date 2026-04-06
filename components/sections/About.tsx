// components/sections/About.tsx

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel }   from "@/components/ui/SectionLabel";
import { about } from "@/data/profile";

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionLabel>About</SectionLabel>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid md:grid-cols-2 gap-12 items-start"
      >
        {/* Left — prose */}
        <motion.div variants={staggerChild} className="flex flex-col gap-4">
          {about.paragraphs.map((para, i) => (
            <p key={i} className="text-[1rem] leading-[1.85] font-light"
               style={{ color: "var(--text2)" }}>
              {para}
            </p>
          ))}
          <div
            className="mt-6 border rounded-xl p-5 transition-all duration-300 group cursor-pointer"
            style={{ borderColor: "var(--border)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
            }
          >
            <a
              href={about.featuredArticle.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2"
            >
              {/* Label */}
              <span
                className="font-mono text-[0.7rem] tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                FEATURED ARTICLE
              </span>

              {/* Title */}
              <h4
                className="text-[1rem] font-semibold leading-snug group-hover:underline"
                style={{ color: "var(--text)" }}
              >
                {about.featuredArticle.title}
              </h4>

              {/* Description */}
              <p
                className="text-[0.85rem] font-light leading-[1.6]"
                style={{ color: "var(--text2)" }}
              >
                {about.featuredArticle.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2">
                <span
                  className="text-[0.7rem] font-mono"
                  style={{ color: "var(--text3)" }}
                >
                  {about.featuredArticle.readTime}
                </span>

                <span
                  className="text-[0.8rem] font-medium transition-colors"
                  style={{ color: "var(--accent)" }}
                >
                  Read on Medium →
                </span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right — focus pillars */}
        <motion.div variants={staggerChild} className="flex flex-col gap-3">
          {about.focus.map((item) => (
            <FocusCard key={item.title} title={item.title} description={item.description} />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function FocusCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="border rounded-xl px-5 py-4 transition-all duration-200 cursor-default"
      style={{ borderColor: "var(--border)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
      }
    >
      <h4 className="font-head text-[0.9rem] font-semibold mb-1" style={{ color: "var(--text)" }}>
        {title}
      </h4>
      <p className="text-[0.8rem] font-light" style={{ color: "var(--text2)" }}>
        {description}
      </p>
    </div>
  );
}
