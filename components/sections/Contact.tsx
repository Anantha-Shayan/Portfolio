// components/sections/Contact.tsx
// Contact section with info panel + validated contact form.

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel }   from "@/components/ui/SectionLabel";
import { profile } from "@/data/profile";

// ── Inline SVG icons ─────────────────────────────────────────
function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export function Contact() {
  const [fields,  setFields]  = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      setError("Please fill in all fields.");
      return;
    }
    // In production wire this to an API route or Resend / Formspree
    setSuccess(true);
    setFields({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  }

  return (
    <SectionWrapper id="contact">
      <SectionLabel>Contact</SectionLabel>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start"
      >
        {/* Left — info */}
        <motion.div variants={staggerChild} className="flex flex-col gap-4">
          <p className="text-[0.95rem] font-light leading-[1.8]" style={{ color: "var(--text2)" }}>
            Have a project in mind or want to collaborate? Reach out — I&apos;m always open to
            interesting conversations.
          </p>

          <ContactItem icon={<MailIcon />}>
            <a href={`mailto:${profile.email}`}
               className="transition-colors duration-200 hover:text-[var(--accent)]"
               style={{ color: "var(--text2)" }}>
              {profile.email}
            </a>
          </ContactItem>

          <ContactItem icon={<LinkedInIcon />}>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
               className="transition-colors duration-200 hover:text-[var(--accent)]"
               style={{ color: "var(--text2)" }}>
              LinkedIn ↗
            </a>
          </ContactItem>

          <ContactItem icon={<GitHubIcon />}>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
               className="transition-colors duration-200 hover:text-[var(--accent)]"
               style={{ color: "var(--text2)" }}>
              GitHub ↗
            </a>
          </ContactItem>
        </motion.div>

        {/* Right — form */}
        <motion.form
          variants={staggerChild}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-0"
        >
          <FormField label="Name">
            <input
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </FormField>

          <FormField label="Message">
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder="Tell me about your project or opportunity..."
              rows={4}
            />
          </FormField>

          {error && (
            <p className="font-mono text-[0.75rem] mb-3" style={{ color: "#ff6b6b" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-[0.9rem] text-white tracking-wide transition-all duration-200"
            style={{ background: "var(--accent)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent2)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent)")
            }
          >
            Send Message →
          </button>

          {success && (
            <p
              className="mt-3 text-center font-mono text-[0.8rem] px-4 py-3 rounded-lg border"
              style={{
                color:       "red",
                borderColor: "rgba(52,211,153,0.25)",
                background:  "rgba(52,211,153,0.06)",
              }}
            >
              There is an error in sending the message! Please contact via GMail or LinkedIn.
            </p>
          )}
        </motion.form>
      </motion.div>
    </SectionWrapper>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function ContactItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.9rem]">
      <div
        className="w-9 h-9 flex items-center justify-center rounded-lg border flex-shrink-0"
        style={{ borderColor: "var(--border)", color: "var(--text2)" }}
      >
        {icon}
      </div>
      {children}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label
        className="block font-mono text-[0.68rem] uppercase tracking-widest mb-1.5"
        style={{ color: "var(--text3)" }}
      >
        {label}
      </label>
      {/*
        Input styles live in globals.css under `.form-field input, .form-field textarea`
        so we avoid an inline <style> tag that causes React 19 hydration warnings.
      */}
      <div className="form-field">{children}</div>
    </div>
  );
}
