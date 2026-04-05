# Anantha Shayan — Portfolio

A production-ready personal portfolio for a Machine Learning Engineer.
Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Tech Stack

| Layer         | Technology                           |
|---------------|--------------------------------------|
| Framework     | Next.js 15 — App Router              |
| Language      | TypeScript 5.8 (strict)              |
| Styling       | Tailwind CSS 3 + CSS custom properties|
| Animation     | Framer Motion 12                     |
| Fonts         | Syne · DM Sans · DM Mono (Google)   |
| Linting       | ESLint 9 (flat config)               |
| Deployment    | Vercel (recommended)                 |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Design tokens + base styles
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # Page composition
│
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── Loader.tsx       # Full-screen loading animation
│   │   ├── Navbar.tsx       # Sticky nav with active-section tracking
│   │   ├── ScrollBar.tsx    # Scroll progress indicator
│   │   ├── Footer.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── CategoryBadge.tsx
│   │   └── ProjectModal.tsx # Animated project detail modal
│   │
│   └── sections/            # One file per portfolio section
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx     # Filterable project list
│       ├── Experience.tsx   # Timeline layout
│       ├── Education.tsx
│       └── Contact.tsx      # Form with validation
│
├── data/
│   └── profile.ts           # ← EDIT THIS to update all content
│
├── hooks/
│   ├── useTheme.ts          # Dark/light toggle + localStorage
│   ├── useScrollProgress.ts # 0–100 scroll progress
│   └── useActiveSection.ts  # IntersectionObserver nav highlight
│
├── lib/
│   ├── animations.ts        # Framer Motion variants (centralised)
│   └── utils.ts             # cn() Tailwind class merger
│
├── types/
│   └── index.ts             # Re-exported shared types
│
└── public/
    └── resume.pdf           # ← Drop your resume PDF here
```

---

## Updating Content

**All content lives in `data/profile.ts`** — no hunting through components.

```ts
// Add a new project:
export const projects: Project[] = [
  {
    id:       "my-new-project",
    num:      "04",
    title:    "My New Project",
    // ...
  },
];

// Add a new skill group:
export const skills: SkillGroup[] = [
  { label: "New Category", tags: ["Tool A", "Tool B"] },
];
```

---

## Features

- ✅ Dark / Light mode (system-aware, persisted to localStorage)
- ✅ Scroll progress bar
- ✅ Active section highlighting in navbar
- ✅ Project filtering (All / ML / NLP / Systems)
- ✅ Click-through project modals with architecture breakdown
- ✅ Loading animation
- ✅ Framer Motion entrance animations (scroll-triggered)
- ✅ Contact form with validation
- ✅ SEO meta tags + Open Graph
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Resume PDF download

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on push.

---

## Contact Form (Production)

The contact form currently logs to console. For real email delivery, choose one:

**Option A — Resend**
1. Sign up at [resend.com](https://resend.com)
2. Add `RESEND_API_KEY` to `.env.local`
3. Create `app/api/contact/route.ts` and call the Resend API

**Option B — Formspree**
1. Create a form at [formspree.io](https://formspree.io)
2. Add `NEXT_PUBLIC_FORMSPREE_ID` to `.env.local`
3. Change the form `action` to `https://formspree.io/f/{id}`

---

## License

MIT — use freely for your own portfolio.
