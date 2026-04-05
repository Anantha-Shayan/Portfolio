// app/layout.tsx
// Root layout — loads fonts, sets metadata, and wraps the app.

import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { OrbBackground } from "@/components/ui/OrbBackground";
import { BlurryOrbs } from "@/components/ui/BlurryOrbs";

/* ── Google Fonts (subset for performance) ────────────────────── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

// Elegant serif for the hero name — professional, distinctive
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://ananthadev.online"), // update with real domain
  title: {
    default:  "Anantha Shayan — Machine Learning Engineer",
    template: "%s | Anantha Shayan",
  },
  description:
    "Machine Learning Engineer specialising in NLP, time-series forecasting, and scalable AI systems. Building real-world ML pipelines on GCP.",
  keywords: [
    "Machine Learning Engineer",
    "NLP",
    "Deep Learning",
    "RAG",
    "Time-Series Forecasting",
    "AI Engineer",
    "Python",
    "LangChain",
    "GCP",
  ],
  authors: [{ name: "Anantha Shayan" }],
  creator: "Anantha Shayan",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://ananthadev.online",
    title:       "Anantha Shayan — Machine Learning Engineer",
    description: "Building intelligent systems that work in the real world.",
    siteName:    "Anantha Shayan Portfolio",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Anantha Shayan — Machine Learning Engineer",
    description: "Building intelligent systems that work in the real world.",
    creator:     "@anantha_shayan", // update if you have a handle
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// React 19: children is typed via the built-in React.ReactNode
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} ${playfair.variable} relative`}
      >
        {/* 🔥 Add OrbBackground as first child */}
        <OrbBackground />
        
        {/* All page content above the orbs */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
