// lib/animations.ts
// Centralised Framer Motion animation variants.
// Import these in components rather than defining inline variants
// so the motion language stays consistent across the site.

import type { Variants } from "framer-motion";

// ─── Fade up (default entrance) ───────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Staggered container (wraps lists of cards / items) ───────
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// ─── Staggered child (used inside staggerContainer) ───────────
export const staggerChild: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Fade in only (no vertical travel) ───────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Slide in from left ───────────────────────────────────────
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Scale in (for modal) ─────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Shared viewport trigger options ──────────────────────────
// Pass to whileInView / viewport prop on motion elements
export const viewportOnce = { once: true, margin: "-80px" } as const;
