// app/layout.tsx
// Root layout: fonts, metadata, analytics and the themed root the journey lives in.

import type { Metadata } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

/* ── Fonts ────────────────────────────────────────────────────── */
const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://ananthadev.online"), // update with real domain
  title: {
    default:  "Anantha Shayan — AI/ML, Backend & Infrastructure",
    template: "%s | Anantha Shayan",
  },
  description:
    "Practical systems that combine backend engineering, cloud infrastructure, automation and applied AI. Inspect the work through seven commands.",
  keywords: [
    "AI/ML Engineer",
    "Backend Engineering",
    "Kubernetes",
    "Docker",
    "FastAPI",
    "RAG",
    "Infrastructure",
    "GCP",
  ],
  authors: [{ name: "Anantha Shayan" }],
  creator: "Anantha Shayan",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://ananthadev.online",
    title:       "Anantha Shayan — AI/ML, Backend & Infrastructure",
    description: "Practical systems that combine backend engineering, cloud infrastructure, automation and applied AI.",
    siteName:    "Anantha Shayan Portfolio",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Anantha Shayan — AI/ML, Backend & Infrastructure",
    description: "Practical systems that combine backend engineering, cloud infrastructure, automation and applied AI.",
    creator:     "@anantha_shayan", // update if you have a handle
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable}`}>
        <AnalyticsTracker />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J4NWDWC7LC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-J4NWDWC7LC');
          `}
        </Script>

        <div className="pl-root">{children}</div>
      </body>
    </html>
  );
}
