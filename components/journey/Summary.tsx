"use client";
// The recruiter lane: the same content as plain, scannable sections.

import { profile } from "@/data/profile";
import { resume } from "@/data/resume";

export function Summary({ onJourney }: { onJourney: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="pl-display text-[clamp(3rem,7vw,6rem)]">{resume.name}</h1>
      <p className="mt-3 text-xl">Building practical systems that combine backend engineering, cloud infrastructure, automation and applied AI.</p>
      <p className="mt-4 max-w-xl opacity-80">{resume.summary}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="pl-btn pl-btn-solid" href={`mailto:${profile.email}`}>Email me</a>
        <a className="pl-btn" href={profile.resumePath}>Resume</a>
        <button className="pl-btn" onClick={onJourney}>Take the full journey</button>
      </div>

      <Section title="Experience">
        <div className="space-y-6">
          {resume.experience.map((e) => (
            <div key={e.org}>
              <h3 className="font-semibold">{e.title}, {e.org}</h3>
              <p className="pl-term mb-2 opacity-70">{e.period}</p>
              <ul className="space-y-1">{e.points.map((p) => <li key={p}>– {p}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="space-y-5">
          {resume.projects.map((p) => (
            <div key={p.id}>
              <h3 className="font-semibold">{p.title} <span className="font-normal opacity-65">{p.subtitle}</span></h3>
              <p className="opacity-85">{p.summary}</p>
              <p className="pl-term mt-1 opacity-65">{p.stack.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-2">{Object.entries(resume.skills).map(([k, v]) => <div key={k}><dt className="inline font-semibold">{k}: </dt><dd className="inline opacity-85">{v.join(", ")}</dd></div>)}</dl>
      </Section>

      <Section title="Education">
        <ul className="space-y-1">{resume.education.map((e) => <li key={e.school}><strong>{e.school}</strong>, {e.detail} ({e.period})</li>)}</ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t pt-6" style={{ borderColor: "var(--pl-line)" }}>
      <h2 className="pl-display mb-4 text-4xl">{title}</h2>
      {children}
    </section>
  );
}
