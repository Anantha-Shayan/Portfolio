// data/resume.ts
// A read-only view of data/profile.ts shaped for the /pipeline journey.
// Edit content in profile.ts; nothing here is stored separately.

import { about, education, experience, profile, projects, skills } from "./profile";

// Made-up private addresses for the "subnets" flavour of the trace diagram.
const HOSTS: Record<string, string> = {
  "job-rec": "10.0.1.30",
  "sasya-sampada": "10.0.1.10",
  marketgrid: "10.0.2.20",
  "price-forecasting": "10.0.1.40",
  "health-monitoring": "10.0.1.50",
};

// The headline role is the founding tech lead position; all roles are listed under `experience`.
const lead = experience.find((e) => e.company.includes("Healthrytix")) ?? experience[0];

export const resume = {
  name: profile.name,
  email: profile.email,
  location: "Bengaluru, India",
  role: lead.role,
  summary: about.paragraphs[0],
  /** Group label -> skill names, in profile order. */
  skills: Object.fromEntries(skills.map((g) => [g.label, g.skills.map((s) => s.name)])) as Record<string, string[]>,
  projects: projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.description,
    highlights: p.highlights,
    stack: p.stack,
    architecture: p.architecture,
    github: p.github,
    host: HOSTS[p.id] ?? "10.0.1.99",
  })),
  experience: experience.map((e) => ({ unit: e.unit, title: e.role, org: e.company, period: e.period, points: e.points })),
  education: education.map((e) => ({ school: e.institution, detail: e.degree, period: e.period })),
};

export type Resume = typeof resume;
