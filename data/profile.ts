// ============================================================
// data/profile.ts
// Central data file — edit this to update all portfolio content.
// All sections read from this file; no content is hardcoded
// in components.
// ============================================================

export const profile = {
  name:  "Anantha Shayan",
  title: "Machine Learning Engineer",
  tagline:
    "Building intelligent systems that work in the real world — from NLP pipelines to probabilistic forecasting to production-ready AI backends.",
  status: "Available for opportunities",
  email:  "ananthashayan2802@outlook.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/anantha-shayan28022006/",
    github:   "https://github.com/Anantha-Shayan",
    medium:   "https://medium.com/@ananthashayan2802"
  },
  // Path to resume PDF inside /public
  resumePath: "/resume.pdf",
};

// ─── ABOUT ───────────────────────────────────────────────────
export const about = {
  paragraphs: [
    "I'm a machine learning engineer focused on building systems that solve real problems — not just ones that look good on paper.",
    "My work spans NLP, time-series forecasting, and end-to-end AI pipelines. I care about the full stack: from model design to deployment to making things actually scale.",
    "Currently studying AI at IIT Ropar (Minor) and CSE at JSS Academy, while building things that push beyond coursework.",
  ],

  featuredArticle: {
  title: "Vector Database (FAISS) for Recommendation Systems",
  description: "My Key Insights into FAISS VectorDB - a note on similarity search and indexing methods",
  link: "https://medium.com/@ananthashayan2802/vector-database-faiss-for-recommendation-systems-my-key-insights-218c87ed8f53",
  readTime: "2 min read"
},

  focus: [
    {
      title: "ML Pipelines",
      description: "End-to-end systems from data ingestion to model serving",
    },
    {
      title: "Real-World Systems",
      description: "Production deployments on GCP, with CI/CD and monitoring",
    },
    {
      title: "Problem Solving",
      description: "First-principles thinking applied to messy, real-world data",
    },
  ],
};

// ─── SKILLS ──────────────────────────────────────────────────
export type SkillGroup = {
  label: string;
  tags:  string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    tags:  ["Python", "SQL"],
  },
  {
    label: "Machine Learning",
    tags:  ["Machine Learning", "Deep Learning", "NLP", "Time-Series Forecasting"],
  },
  {
    label: "Techniques",
    tags:  ["Embeddings", "Semantic Search", "RAG", "CNN", "LSTM / GRU"],
  },
  {
    label: "Libraries",
    tags:  ["NumPy", "Pandas", "Scikit-learn", "LangChain", "flask", "Other ML related Libraries"],
  },
  {
    label: "Backend & Deployment",
    tags:  ["Flask", "Docker", "GCP", "GitHub Actions (CI/CD)"],
  },
  {
    label: "Tools",
    tags:  ["Git", "n8n"],
  },
  {
    label: "Databases",
    tags: ["VectorDB", "MySQL", "Postgres"]
  },
];

// ─── PROJECTS ────────────────────────────────────────────────
export type ProjectCategory = "ml" | "nlp" | "systems";

export type Project = {
  id:         string;
  num:        string;
  title:      string;
  subtitle:   string;
  categories: ProjectCategory[];
  description: string;
  highlights:  string[];
  stack:       string[];
  github:      string;
  // Detailed modal content
  overview:    string;
  architecture: string[];
};

export const projects: Project[] = [
  {
    id:       "job-rec",
    num:      "01",
    title:    "AI Job Recommendation System",
    subtitle: "Endee Vector DB",
    categories: ["ml", "systems"],
    description:
      "Semantic job matching system that parses resumes, encodes them as vectors, and ranks job listings by cosine similarity. Surfaces skill gaps alongside match scores.",
    highlights: [
      "Resume parsing + embedding pipeline",
      "Vector search via Endee Vector DB",
      "Cosine similarity ranking + skill gap analysis",
      "Flask REST backend",
    ],
    stack: ["Python", "Flask", "Sentence Transformers", "Endee Vector DB", "FAISS Vector DB", "Cosine Similarity", "REST API"],
    github: "https://github.com/Anantha-Shayan/endee/tree/master/recommendation_system",
    overview:
      "A semantic job matching engine that treats resumes and job listings as vector spaces rather than keyword bags. The system encodes both into dense embedding vectors and retrieves the most relevant jobs using cosine similarity — surfacing not just matches, but skill gaps.",
    architecture: [
      "Resume text is parsed and chunked into structured sections",
      "Each section is embedded using a sentence transformer model",
      "Job listings are pre-indexed into Endee Vector DB at ingestion",
      "Query vector (resume) is matched against the index via cosine similarity",
      "Match scores are ranked and skill gap analysis is returned alongside results",
      "Flask REST API exposes endpoints for upload, search, and gap analysis",
    ],
  },
  {
    id:       "agri-forecast",
    num:      "02",
    title:    "Agricultural Market Price Forecasting",
    subtitle: "Time-Series ML",
    categories: ["ml"],
    description:
      "Probabilistic multi-series forecasting of mandi prices using DeepAR. Designed to handle the noise and data limitations inherent in agricultural datasets.",
    highlights: [
      "Probabilistic forecasting with DeepAR",
      "Multi-series Mandi price dataset",
      "Handles sparse data and uncertainty",
      "Confidence intervals on predictions",
    ],
    stack: ["Python", "DeepAR", "GluonTS", "Pandas", "NumPy", "Probabilistic Forecasting"],
    github: "https://github.com/Anantha-Shayan/Market-Trend-Analysis",
    overview:
      "A probabilistic forecasting system for mandi (agricultural market) prices across multiple commodities and regions. DeepAR learns shared temporal patterns across series, making it robust to sparse or noisy data — a core challenge in agricultural datasets.",
    architecture: [
      "Raw mandi price data is cleaned and normalized across commodity–region pairs",
      "Time series are formatted into DeepAR-compatible multivariate input",
      "DeepAR model trained to learn shared patterns across all series simultaneously",
      "Outputs probabilistic forecasts with uncertainty bounds (p10 / p50 / p90)",
      "Results visualized with confidence intervals for decision-making",
      "Handles missing data and irregular seasonal patterns gracefully",
    ],
  },
  {
    id:       "sasya-sampada",
    num:      "03",
    title:    "SasyaSampada",
    subtitle: "AI Assistance for Farming",
    categories: ["nlp", "systems"],
    description:
      "RAG-based agricultural assistant that retrieves domain knowledge to answer farmer queries and recommend crops — built for low-resource, high-impact use.",
    highlights: [
      "RAG pipeline with LangChain",
      "Agricultural knowledge retrieval",
      "Crop recommendation engine",
      "Optimized for low-resource deployment",
    ],
    stack: ["Python", "LangChain", "RAG", "Vector Index", "Embeddings", "NLP"],
    github: "https://github.com/Anantha-Shayan/SasyaSampada",
    overview:
      "An AI assistant for farmers built on a Retrieval-Augmented Generation (RAG) architecture. Instead of hallucinating agricultural advice, it grounds responses in a curated knowledge base — ensuring accurate, contextual answers about crops, soil, and market conditions.",
    architecture: [
      "Agricultural knowledge base curated and chunked into semantic units",
      "Documents embedded and stored in a local vector index",
      "User queries are embedded and matched against the knowledge index",
      "Top-k retrieved chunks passed as context to the language model",
      "LangChain orchestrates retrieval, context injection, and response generation",
      "Crop recommendation module integrated with soil and season input features",
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────
export type Experience = {
  role:     string;
  company:  string;
  period:   string;
  type:     string;
  points:   string[];
};

export const experience: Experience[] = [
  {
    role:    "Founding Tech Lead",
    company: "Healthrytix HealthTech Solutions",
    period:  "2024 – Present",
    type:    "AI / Automation",
    points: [
      "Built end-to-end AI automation workflows using n8n, eliminating manual operational bottlenecks",
      "Reduced operational costs by 70–80% through intelligent process automation",
      "Designed and deployed scalable systems on GCP — sole technical contributor across the stack",
      "Owned architecture decisions from infrastructure to model integration",
    ],
  },
];

// ─── EDUCATION ───────────────────────────────────────────────
export type Education = {
  institution: string;
  degree:      string;
  period:      string;
  badge:       string;
};

export const education: Education[] = [
  {
    institution: "IIT Ropar",
    degree:      "Minor in Artificial Intelligence",
    period:      "2025 – 2026",
    badge:       "AI Specialization",
  },
  {
    institution: "JSS Academy of Technical Education",
    degree:      "B.Tech — Computer Science & Engineering (AI)",
    period:      "2024 – 2028",
    badge:       "CSE · AI/ML Major",
  },
];
