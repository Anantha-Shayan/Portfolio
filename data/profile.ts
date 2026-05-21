// ============================================================
// data/profile.ts
// Central data file — edit this to update all portfolio content.
// ============================================================

export const profile = {
  name: "Anantha Shayan",

  title: "AI/ML • Backend Systems • Infrastructure",

  tagline:
    "I build intelligent systems that combine AI, backend engineering, automation, and infrastructure. My work ranges from retrieval systems and recommendation engines to cloud deployments, observability stacks, and production-focused backend workflows.",

  status: "Available for opportunities",

  email: "ananthashayan2802@outlook.com",

  socials: {
    linkedin: "https://www.linkedin.com/in/anantha-shayan28022006/",
    github: "https://github.com/Anantha-Shayan",
    medium: "https://medium.com/@ananthashayan2802",
  },

  // Path to resume PDF inside /public
  resumePath: "/resume.pdf",
};

// ─── ABOUT ───────────────────────────────────────────────────

export const about = {
  paragraphs: [
    "I’m an AI/ML engineer focused on building practical systems that combine machine learning with scalable software engineering.",

    "My interests include retrieval systems, semantic search, recommendation engines, backend APIs, workflow automation, and cloud infrastructure.",

    "I enjoy understanding how systems work internally — from vector search pipelines and RAG architectures to deployment workflows, monitoring stacks, and distributed infrastructure.",

    "Alongside AI development, I regularly work with Docker, Linux, FastAPI, PostgreSQL, Grafana, Prometheus, CI/CD pipelines, and cloud-based deployments.",

    "Currently, I work as the Founding Tech Lead at an early-stage HealthTech startup, contributing across AI workflows, backend systems, automation, and technical architecture.",
  ],

  featuredArticle: {
    title: "Vector Database (FAISS) for Recommendation Systems",

    description:
      "My insights on vector search, indexing methods, and similarity retrieval systems.",

    link: "https://medium.com/@ananthashayan2802/vector-database-faiss-for-recommendation-systems-my-key-insights-218c87ed8f53",

    readTime: "2 min read",
  },

  focus: [
    {
      title: "AI Systems",

      description:
        "Retrieval systems, recommendation engines, and production-focused ML workflows",
    },

    {
      title: "Infrastructure",

      description:
        "Cloud deployments, Docker, monitoring, CI/CD, and backend systems",
    },

    {
      title: "Engineering",

      description:
        "Building practical systems with scalability, reliability, and usability in mind",
    },
  ],
};

// ─── SKILLS ──────────────────────────────────────────────────

export type SkillGroup = {
  label: string;
  tags: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",

    tags: ["Python", "SQL", "C", "C++"],
  },

  {
    label: "AI / ML",

    tags: [
      "Machine Learning",
      "NLP",
      "RAG",
      "Semantic Search",
      "Recommendation Systems",
      "CNN",
    ],
  },

  {
    label: "Libraries & Frameworks",

    tags: [
      "Scikit-learn",
      "LangChain",
      "Pandas",
      "NumPy",
      "FastAPI",
      "Flask",
    ],
  },

  {
    label: "Infrastructure & DevOps",

    tags: [
      "Docker",
      "Linux",
      "GCP",
      "CI/CD",
      "Grafana",
      "Prometheus",
      "Server Management",
    ],
  },

  {
    label: "Databases",

    tags: [
      "PostgreSQL",
      "MySQL",
      "FAISS",
      "Vector Databases",
    ],
  },

  {
    label: "Tools & Workflow",

    tags: [
      "GitHub",
      "n8n",
      "Workflow Automation",
      "REST APIs",
    ],
  },
];

// ─── PROJECTS ────────────────────────────────────────────────

export type ProjectCategory = "ml" | "nlp" | "systems";

export type Project = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  description: string;
  highlights: string[];
  stack: string[];
  github: string;

  // Detailed modal content
  overview: string;
  architecture: string[];
};

export const projects: Project[] = [
  {
    id: "job-rec",

    num: "01",

    title: "AI Job Recommendation System",

    subtitle: "Semantic Retrieval & Vector Search",

    categories: ["ml", "systems"],

    description:
      "Semantic job matching system that combines vector search and hybrid retrieval techniques to match resumes with relevant job opportunities.",

    highlights: [
      "Resume parsing and embedding pipeline",
      "Semantic + keyword search experimentation",
      "FAISS and vector database comparisons",
      "Skill gap analysis and ranking",
    ],

    stack: [
      "Python",
      "FastAPI",
      "Sentence Transformers",
      "FAISS",
      "Vector Databases",
      "Semantic Search",
      "REST API",
    ],

    github:
      "https://github.com/Anantha-Shayan/endee/tree/master/recommendation_system",

    overview:
      "A recommendation system designed to move beyond traditional keyword matching by using semantic retrieval and vector similarity search. The project involved experimentation with FAISS, hybrid search architectures, and distributed vector databases while exploring the tradeoffs between search quality, latency, and scalability.",

    architecture: [
      "Resume parsing and embedding pipeline",
      "Semantic similarity search using vector embeddings",
      "Hybrid retrieval experimentation with keyword matching",
      "Vector indexing and retrieval using FAISS",
      "Skill gap analysis alongside ranking",
      "Backend APIs for search and recommendation workflows",
    ],
  },

  {
    id: "sasya-sampada",

    num: "02",

    title: "SasyaSampada",

    subtitle: "AI Assistance for Farming",

    categories: ["nlp", "systems"],

    description:
      "RAG-based agricultural assistant that retrieves domain-specific knowledge to provide contextual responses and crop-related assistance.",

    highlights: [
      "Retrieval-Augmented Generation pipeline",
      "Semantic agricultural knowledge retrieval",
      "Context-aware conversational responses",
      "Low-resource deployment design",
    ],

    stack: [
      "Python",
      "LangChain",
      "RAG",
      "FAISS",
      "Embeddings",
      "NLP",
    ],

    github: "https://github.com/Anantha-Shayan/SasyaSampada",

    overview:
      "An AI-powered farming assistant built using Retrieval-Augmented Generation (RAG). Instead of generating generic responses, the system retrieves relevant agricultural knowledge before generating answers, improving contextual accuracy and reliability.",

    architecture: [
      "Agricultural knowledge base chunking and indexing",
      "Semantic retrieval using embeddings",
      "Top-k contextual document retrieval",
      "LangChain orchestration pipeline",
      "RAG-based response generation",
      "Crop recommendation workflows",
    ],
  },

  {
    id: "ecommerce-system",

    num: "03",

    title: "E-Commerce Infrastructure System",

    subtitle: "Backend • Monitoring • Deployment",

    categories: ["systems"],

    description:
      "Production-style e-commerce backend focused on deployment workflows, observability, containerization, and scalable backend architecture.",

    highlights: [
      "FastAPI backend architecture",
      "Dockerized services and deployment",
      "Grafana + Prometheus monitoring",
      "Cloud VM and Linux infrastructure",
    ],

    stack: [
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Grafana",
      "Prometheus",
      "Linux",
      "GCP",
    ],

    github: "https://github.com/Anantha-Shayan",

    overview:
      "A backend-focused e-commerce system built to explore real-world software infrastructure. The project focused heavily on deployment workflows, observability, monitoring, backend APIs, and production-oriented architecture.",

    architecture: [
      "REST API backend using FastAPI",
      "PostgreSQL database integration",
      "Dockerized services",
      "Metrics collection using Prometheus",
      "Monitoring dashboards using Grafana",
      "Linux VM deployment and infrastructure setup",
    ],
  },

  {
    id: "health-monitoring",

    num: "04",

    title:
      "Non-Invasive Health Monitoring System",

    subtitle: "ML & Sensor Fusion",

    categories: ["ml"],

    description:
      "Machine learning-based health monitoring system focused on hydration estimation and diabetes risk assessment using sensor fusion.",

    highlights: [
      "Sensor-based feature analysis",
      "Data preprocessing and model experimentation",
      "Hydration level estimation",
      "Team-based research and development",
    ],

    stack: [
      "Python",
      "Pandas",
      "Machine Learning",
      "Data Processing",
    ],

    github: "https://github.com/Anantha-Shayan",

    overview:
      "A machine learning project focused on non-invasive health monitoring using sensor fusion techniques to estimate hydration levels and assess diabetes risk.",

    architecture: [
      "Sensor data collection and preprocessing",
      "Feature extraction and cleaning workflows",
      "Machine learning experimentation and evaluation",
      "Health risk estimation pipeline",
      "Collaborative research and development workflow",
    ],
  },
];

// ─── EXPERIENCE ──────────────────────────────────────────────

export type Experience = {
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Founding Tech Lead",

    company: "Healthrytix HealthTech Solutions",

    period: "October 2025 – Present",

    type: "AI / Automation",

    points: [
      "Developing AI-driven workflows and automation systems for healthcare operations",

      "Working across backend systems, infrastructure, deployment, and technical planning",

      "Building scalable automation pipelines using n8n and cloud-based infrastructure",

      "Contributing to architecture decisions across AI workflows and platform systems",
    ],
  },
];

// ─── EDUCATION ───────────────────────────────────────────────

export type Education = {
  institution: string;
  degree: string;
  period: string;
  badge: string;
};

export const education: Education[] = [
  {
    institution: "IIT Ropar",

    degree: "Minor in Artificial Intelligence",

    period: "2025 – Present",

    badge: "AI Specialization",
  },

  {
    institution: "JSS Academy of Technical Education",

    degree:
      "B.E. — Computer Science & Engineering (Artificial Intelligence & Machine Learning)",

    period: "2024 – 2028",

    badge: "AI/ML Major",
  },
];
