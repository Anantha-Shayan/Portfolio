import type { Config } from "tailwindcss";

const config: Config = {
  // Enable class-based dark mode so we can toggle via a class on <html>
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display / heading font
        head: ["var(--font-syne)", "sans-serif"],
        // Elegant serif for the hero name
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        // Body copy
        body: ["var(--font-dm-sans)", "sans-serif"],
        // Code / labels
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        // Dark-mode surface scale
        dark: {
          bg:   "#0c0c0e",
          bg2:  "#111114",
          bg3:  "#18181c",
          bg4:  "#1e1e24",
          border:  "#2a2a32",
          border2: "#3a3a45",
        },
        // Light-mode surface scale
        light: {
          bg:   "#f7f7f9",
          bg2:  "#ffffff",
          bg3:  "#f0f0f4",
          bg4:  "#e8e8f0",
          border:  "#dddde8",
          border2: "#c8c8d8",
        },
        // Accent palette shared across modes
        accent: {
          DEFAULT: "#6c7fff",
          purple:  "#a78bfa",
          green:   "#34d399",
          red:     "#ff6b6b",
          amber:   "#fbbf24",
        },
      },
      // Smooth letter-spacing for display headings
      letterSpacing: {
        tighter2: "-0.04em",
        tighter3: "-0.03em",
      },
      // Animation for the loader bar
      keyframes: {
        "load-bar": {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "load-bar": "load-bar 1.2s ease forwards",
        "fade-up":  "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
