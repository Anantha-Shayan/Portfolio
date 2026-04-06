// components/sections/Hero.tsx
// Full-height hero with:
//   - Animated blurry gradient orbs as background atmosphere
//   - Name in Playfair Display (professional serif)
//   - Status pill, mono title, tagline, CTAs, social links

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/animations";
import { profile } from "@/data/profile";

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 4.5c0-.83.67-1.5 1.5-1.5H20.5c.83 0 1.5.67 1.5 1.5v15c0 .83-.67 1.5-1.5 1.5H3.5c-.83 0-1.5-.67-1.5-1.5v-15zm4.75 3.25c1.93 0 3.5 1.9 3.5 4.25s-1.57 4.25-3.5 4.25-3.5-1.9-3.5-4.25 1.57-4.25 3.5-4.25zm5.5.25c.96 0 1.75 1.75 1.75 3.75s-.79 3.75-1.75 3.75-1.75-1.75-1.75-3.75.79-3.75 1.75-3.75zm4.5.25c.48 0 .875 1.6.875 3.5s-.395 3.5-.875 3.5-.875-1.6-.875-3.5.395-3.5.875-3.5z" />
    </svg>
  );
}


export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
    >

      <div className="relative z-10 max-w-[900px] mx-auto px-6 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {/* Status pill */}
          <motion.div variants={staggerChild} className="mb-6">
            <span
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-wider px-3 py-1.5 rounded-full border"
              style={{ color: "var(--text3)", borderColor: "var(--border)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent3)", boxShadow: "0 0 6px var(--accent3)" }}
              />
              {profile.status}
            </span>
          </motion.div>

          {/* ── Name in Playfair Display ── */}
          <motion.h1 variants={staggerChild}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(3.2rem, 9vw, 6.8rem)",
                fontWeight: 700,
                lineHeight: 1.03,
                letterSpacing: "-0.015em",
                color: "var(--text)",
              }}
            >
              {profile.name.split(" ")[0]}
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(3.2rem, 9vw, 6.8rem)",
                fontWeight: 500,
                fontStyle: "italic",
                lineHeight: 1.03,
                letterSpacing: "-0.015em",
                background: "linear-gradient(135deg, var(--text2) 0%, var(--text3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
              }}
            >
              {profile.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={staggerChild}
            className="font-mono text-[0.85rem] tracking-wider mb-6"
            style={{ color: "var(--accent)" }}
          >
            {profile.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={staggerChild}
            className="text-[1.05rem] leading-[1.8] max-w-[560px] mb-10 font-light"
            style={{ color: "var(--text2)" }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={staggerChild} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[0.9rem] text-white transition-all duration-200 hover:-translate-y-px"
              style={{ background: "var(--accent)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent)")
              }
            >
              View Projects ↓
            </button>

            <a
              href={"https://drive.google.com/file/d/17i-Rr5orXjheP6v1lBhkJBk8QTEjBb8y/view?usp=sharing"}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-light text-[0.9rem] border transition-all duration-200"
              style={{ borderColor: "var(--border)", color: "var(--text)", background: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
              }}
            >
              View Resume ↗
            </a>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-light text-[0.9rem] border transition-all duration-200"
              style={{ borderColor: "var(--border)", color: "var(--text)", background: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              }}
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={staggerChild} className="flex gap-5">
            <SocialLink href={profile.socials.linkedin} icon={<LinkedInIcon />} label="LinkedIn" />
            <SocialLink href={profile.socials.github} icon={<GitHubIcon />} label="GitHub" />
            <SocialLink href={profile.socials.medium} icon={<MediumIcon />} label="Medium" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] tracking-wider transition-colors duration-200"
      style={{ color: "var(--text3)" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text3)")}
    >
      {icon}
      {label}
    </a>
  );
}
