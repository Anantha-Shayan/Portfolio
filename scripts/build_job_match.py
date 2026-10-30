#!/usr/bin/env python3
"""Build public/data/job-match.json from the Job-Recommender project.

Replicates backend/vectorize.py: embed the resume (skills + projects) with
all-MiniLM-L6-v2, cosine-match it against the job vectors, blend 60% semantic
similarity with 40% skill overlap, and flag missing skills semantically (a job
skill is missing if no resume skill is >= 0.82 similar). Company names and URLs
are not exported.

Run with that project's virtualenv (it has sentence-transformers):
  HF_HUB_OFFLINE=1 ~/Projects/Job-Recommender/.venv/bin/python scripts/build_job_match.py
"""
import json, re
from pathlib import Path
import numpy as np
from sentence_transformers import SentenceTransformer

repo = Path("~/Projects/Job-Recommender/backend").expanduser()
jobs = json.load(open(repo / "jobs.json"))
model = SentenceTransformer("all-MiniLM-L6-v2")

def job_text(j):
    return f"Title: {j['title']}\nSkills: {', '.join(j.get('skills', []))}\nDescription: {j.get('description', '')}\nCompany: {j.get('company', '')}"

JV = model.encode([job_text(j) for j in jobs], normalize_embeddings=True)

CANDIDATES = [
    {"id": "ml", "label": "ML fresher", "skills": ["Python", "Machine Learning", "Deep Learning", "NLP", "Scikit-learn", "Pandas", "NumPy", "TensorFlow"],
     "projects": "Sentiment analysis with transformers and a resume-based job recommender"},
    {"id": "backend", "label": "Backend and DevOps", "skills": ["Python", "FastAPI", "SQL", "PostgreSQL", "Docker", "Linux", "GitHub Actions", "Nginx"],
     "projects": "A REST API with CI/CD deployed on a Linux VM"},
    {"id": "web", "label": "Web developer", "skills": ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Bootstrap"],
     "projects": "A responsive portfolio site and a React dashboard"},
]

THRESHOLD, TOP_K = 0.33, 3
out_candidates = []
for c in CANDIDATES:
    query = f"Skills: {', '.join(c['skills'])}\nProjects: {c['projects']}"
    q = model.encode([query], normalize_embeddings=True)[0]
    sims = JV @ q
    res_skills = sorted({s.lower() for s in c["skills"]})
    res_emb = model.encode(res_skills, normalize_embeddings=True)

    results = []
    for idx in np.argsort(-sims)[:TOP_K]:
        job = jobs[int(idx)]
        job_skills = job.get("skills", [])
        lowered = {s.lower() for s in job_skills}
        missing_candidates = sorted(lowered - set(res_skills))
        missing = []
        if missing_candidates:
            me = model.encode(missing_candidates, normalize_embeddings=True)
            for skill, emb in zip(missing_candidates, me):
                if float(np.max(res_emb @ emb)) < 0.82:
                    missing.append(skill)
        overlap = len(lowered & set(res_skills)) / max(len(job_skills), 1)
        final = 0.6 * float(sims[idx]) + 0.4 * overlap
        if final <= THRESHOLD:
            continue
        results.append({
            "job": int(idx), "semantic": round(float(sims[idx]), 3), "overlap": round(overlap, 3), "final": round(final * 100, 1),
            "label": "Strong match" if final > 0.65 else "Good match" if final > 0.45 else "Moderate match",
            "missing": [s for s in job_skills if s.lower() in missing],
        })
    out_candidates.append({"id": c["id"], "label": c["label"], "skills": c["skills"], "projects": c["projects"], "results": results})

out = {
    "model": "all-MiniLM-L6-v2", "jobCount": len(jobs), "weights": {"semantic": 0.6, "skills": 0.4},
    "jobs": [{"title": j["title"], "location": j.get("location"), "skills": j.get("skills", [])} for j in jobs],
    "candidates": out_candidates,
}
path = Path("public/data/job-match.json")
json.dump(out, open(path, "w"), separators=(",", ":"))
print("wrote", path, path.stat().st_size, "bytes")
for c in out_candidates:
    print("\n" + c["label"])
    for r in c["results"]:
        print(f"  {r['final']:5.1f} {r['label']:15} sem {r['semantic']:.2f} skills {r['overlap']:.2f}  {out['jobs'][r['job']]['title'][:44]}  missing={r['missing']}")
