#!/usr/bin/env python3
"""Build public/data/sasya-space.json from a local SasyaSampada checkout.

Reads the real chunk text and 384-d BGE vectors, samples a readable subset per
document, lays the sample out in 3D with t-SNE, and records each point's nearest
neighbours. 
Usage: python scripts/build_sasya_space.py [--repo ~/Projects/SasyaSampada] [--per-doc 220]
"""
import argparse, json, re, random
from pathlib import Path
import numpy as np
from sklearn.manifold import TSNE

ap = argparse.ArgumentParser()
ap.add_argument("--repo", default="~/Projects/SasyaSampada")
ap.add_argument("--per-doc", type=int, default=120)
ap.add_argument("--out", default="public/data/sasya-space.json")
args = ap.parse_args()
repo = Path(args.repo).expanduser()
rng = random.Random(7)

SHORT = {
    "icar_kharif_agro_advisories_2025": "ICAR Kharif advisories",
    "tnau_crop_production_guide_2020": "TNAU crop production guide",
    "farmers_handbook_basic_agriculture_2016": "Farmer's handbook",
    "manage_natural_farming_study_material_2023": "Natural farming material",
    "pmfby_operational_guidelines_revised": "PMFBY crop insurance",
    "agriwelfare_annual_report_2024_25": "Agriculture annual report",
}
docs_meta = {d["document_id"]: d for d in json.load(open(repo / "data/manifests/documents.json"))}

def clean(t: str) -> str:
    t = re.sub(r"\[TABLE \d+\]", " ", t)
    t = re.sub(r"[|]+", " ", t)
    t = re.sub(r"-{3,}", " ", t)
    return re.sub(r"\s+", " ", t).strip()

def snippet(t: str) -> str:
    """First ~240 characters, without a leading partial word (chunks split on character counts)."""
    lead = ""
    if t and t[0].islower() and " " in t[:20]:
        t, lead = t.split(" ", 1)[1], "… "
    return lead + t[:240].rsplit(" ", 1)[0] + "…"

def readable(t: str) -> bool:
    letters = sum(c.isalpha() and c.isascii() for c in t)
    words = t.split()
    avg = sum(map(len, words)) / max(1, len(words))
    return len(t) >= 300 and letters / max(1, len(t)) > 0.72 and 3.5 < avg < 8 and t.count(";") < 8

all_vecs, all_meta = [], []
docs, counts = [], {}
for di, doc_id in enumerate(sorted(docs_meta)):
    emb = repo / f"data/embeddings/{doc_id}/v1/BAAI_bge_small_en_v1_5/vectors.jsonl"
    chk = repo / f"data/metadata/{doc_id}/v1/chunks.jsonl"
    vec = {}
    for line in open(emb):
        r = json.loads(line); vec[r["chunk_id"]] = r["vector"]
    n = 0
    for line in open(chk):
        c = json.loads(line)
        if c["chunk_id"] not in vec: continue
        n += 1
        all_vecs.append(vec[c["chunk_id"]])
        all_meta.append({"d": di, "doc": doc_id, "i": c["chunk_index"], "page": c.get("page_start"), "section": c.get("section_title"), "text": clean(c["text"])})
    counts[doc_id] = n
    m = docs_meta[doc_id]
    docs.append({"id": doc_id, "title": m["title"], "short": SHORT.get(doc_id, m["title"]), "category": m["category"], "year": m.get("year"), "chunks": n})

V = np.asarray(all_vecs, dtype=np.float32)
V /= np.linalg.norm(V, axis=1, keepdims=True)
print("total chunks", len(V), "dim", V.shape[1], counts)

# Sample readable chunks per document.
sample = []
for di in range(len(docs)):
    idx = [k for k, m in enumerate(all_meta) if m["d"] == di and readable(m["text"])]
    rng.shuffle(idx)
    sample += idx[: args.per_doc]
S = V[sample]

emb3 = TSNE(n_components=3, perplexity=30, init="pca", random_state=7, metric="cosine").fit_transform(S)
emb3 -= emb3.mean(axis=0)
emb3 *= 3.6 / np.abs(emb3).max()

sim = S @ S.T
np.fill_diagonal(sim, -1)
nn = np.argsort(-sim, axis=1)[:, :6]

points = []
for j, k in enumerate(sample):
    m = all_meta[k]
    points.append({"d": m["d"], "p": [round(float(x), 3) for x in emb3[j]], "page": m["page"], "section": m["section"],
                   "t": snippet(m["text"]), "n": [int(x) for x in nn[j]], "s": [round(float(sim[j, x]), 3) for x in nn[j]]})

out = {"dim": int(V.shape[1]), "total": len(V), "model": "BAAI/bge-small-en-v1.5", "docs": docs, "points": points}
Path(args.out).parent.mkdir(parents=True, exist_ok=True)
json.dump(out, open(args.out, "w"), separators=(",", ":"))
print("wrote", args.out, Path(args.out).stat().st_size // 1024, "KB", len(points), "points")
