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

    "Currently, I work as the Founding Tech Lead at Healthrytix, an early-stage HealthTech startup, and as an AI/ML Developer Intern at Molecular Solutions, building computational drug discovery and workflow systems.",
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

export type Skill = {
  name: string;
  /** Key used by the Skills section to select a Simple Icon or Lucide fallback. */
  icon?: string;
  proficiency:
    | "Production"
    | "Advanced"
    | "Intermediate"
    | "Learning"
    | "Beginner"
    | "Projects"
    | "Project"
    | "Theory";
  concepts: string[];
};

export type SkillGroup = {
  label: string;
  skills: Skill[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      {
        name: "Python",
        icon: "python",
        proficiency: "Production",
        concepts: [
          "OOP",
          "Decorators",
          "Virtual Environments",
          "Package Management (pip)",
          "Exception Handling",
          "Logging",
          "File Handling"
        ],
      },
      {
        name: "SQL",
        icon: "sql",
        proficiency: "Production",
        concepts: [
          "Joins",
          "Aggregation",
          "Subqueries",
          "Transactions",
          "Normalization",
          "Constraints",
          "Indexes"
        ],
      },
      {
        name: "C",
        icon: "c",
        proficiency: "Beginner",
        concepts: [
          "Pointers",
          "Memory Management",
          "Structures",
          "File Handling",
          "Dynamic Memory"
        ],
      },
      {
        name: "C++",
        icon: "cplusplus",
        proficiency: "Beginner",
        concepts: [
          "OOP",
          "Exception Handling"
  
        ],
      },
    ],
  },

  {
    label: "AI & Machine Learning",
    skills: [
      {
        name: "Machine Learning",
        icon: "machine-learning",
        proficiency: "Projects",
        concepts: [
          "Classification",
          "Regression",
          "Time Series",
          "DeepAR Forecasting",
          "Feature Engineering",
          "Model Evaluation",
          "Cross Validation",
          "Hyperparameter Tuning",
          "Clustering"
        ],
      },
      {
        name: "scikit-learn",
        icon: "scikit-learn",
        proficiency: "Projects",
        concepts: [
          "Classification",
          "Regression",
          "Pipelines",
          "Model Evaluation",
          "Cross Validation",
        ],
      },
      {
        name: "Computational Drug Discovery",
        icon: "drug-discovery",
        proficiency: "Projects",
        concepts: [
          "Molecular Docking",
          "ADMET Prediction",
          "Synthetic Accessibility",
          "Binding Affinity",
        ],
      },
      {
        name: "RAG",
        icon: "rag",
        proficiency: "Projects",
        concepts: [
          "Chunking",
          "Embeddings",
          "Vector Search",
          "Context Retrieval",
          "Hybrid Retrieval",
          "Metadata Filtering",
          "LangChain",
          "Prompt Engineering",
        ],
      },
      {
        name: "Recommendation Systems",
        icon: "recommendation",
        proficiency: "Projects",
        concepts: [
          "Embedding Search",
          "Similarity Ranking",
          "Skill Matching",
          "Hybrid Retrieval",
        ],
      },
      {
        name: "NLP",
        icon: "nlp",
        proficiency: "Projects",
        concepts: [
          "Embeddings",
          "Tokenization",
          "Transformers",
          "Text Processing",
          "Vectorization",
          "NER",
          "Text Classification",
          "Sentiment Analysis",
          "Prompt Design",
        ],
      },
      {
        name: "CNN",
        icon: "cnn",
        proficiency: "Theory",
        concepts: [
          "Convolution",
          "Pooling",
          "Image Classification",
          "Feature Extraction",
          "Transfer Learning",
        ],
      },
    ],
  },

  {
    label: "Backend Development",
    skills: [
      {
        name: "FastAPI",
        icon: "fastapi",
        proficiency: "Production",
        concepts: [
          "REST APIs",
          "Dependency Injection",
          "JWT",
          "Middleware",
          "Pydantic",
          "SQLAlchemy",
          "Alembic",
          "psycopg",
          "OpenAPI",
          "Exception Handlers"
        ],
      },
      {
        name: "Flask",
        icon: "flask",
        proficiency: "Beginner",
        concepts: [
          "REST APIs",
          "Routing",
        ],
      },
      {
        name: "RabbitMQ",
        icon: "rabbitmq",
        proficiency: "Projects",
        concepts: [
          "Message Queues",
          "Event-driven Architecture",
          "Async Processing",
        ],
      },
    ],
  },

  {
    label: "Infrastructure & DevOps",
    skills: [
      {
        name: "Docker",
        icon: "docker",
        proficiency: "Production",
        concepts: [
          "Docker Compose",
          "Podman",
          "Image Optimization",
          "Networking",
          "Volumes",
          "Health Checks",
          "Environment Variables",
          "Port Mapping",
          "Bind Mounts",
          "Multi-stage Builds",
          "Dockerfile Best Practices"
        ],
      },
      {
        name: "Kubernetes",
        icon: "kubernetes",
        proficiency: "Projects",
        concepts: [
          "Rolling Updates",
          "Health Probes",
          "HPA Autoscaling",
          "Service Networking",
          "Config & Secrets",
          "Persistent Storage",
        ],
      },
      {
        name: "Linux",
        icon: "linux",
        proficiency: "Production",
        concepts: [
          "SSH",
          "Nginx",
          "Permissions",
        ],
      },
      {
        name: "Google Cloud",
        icon: "google-cloud",
        proficiency: "Production",
        concepts: [
          "Compute Engine",
          "Cloud Storage",
          "Cloud SQL",
          "IAM",
          "SSH",
          "Firewall Rules",
          "Static IP",
          "Service Accounts",
        ],
      },
      {
        name: "GitHub Actions",
        icon: "github-actions",
        proficiency: "Projects",
        concepts: [
          "CI/CD",
          "Build",
          "Deploy",
          "Secrets",
          "Workflows",
        ],
      },
      {
        name: "Server Management",
        icon: "server",
        proficiency: "Production",
        concepts: [
          "Linux VPS",
          "SSH",
          "Reverse Proxy",
          "SSL",
          "Deployment",
          "Domain Configuration",
          "Firewall"
        ],
      },
      {
        name: "Cloudflare Zero Trust",
        icon: "cloudflare",
        proficiency: "Learning",
        concepts: [
          "ZTNA",
          "Identity-based Access",
          "Secure Internal Apps",
        ],
      },
    ],
  },

  {
    label: "Databases & Storage",
    skills: [
      {
        name: "PostgreSQL",
        icon: "postgresql",
        proficiency: "Production",
        concepts: [
          "Normalization",
          "Transactions",
          "Indexes",
          "Triggers",
          "RBAC",
          "Connection Pooling",
        ],
      },
      {
        name: "MySQL",
        icon: "mysql",
        proficiency: "Project",
        concepts: [
          "Schema Design",
          "Joins",
          "Constraints",
        ],
      },
      {
        name: "Vector Databases (FAISS, Qdrant, Endee)",
        icon: "vector-db",
        proficiency: "Projects",
        concepts: [
          "HNSW",
          "Metadata Filtering",
          "Hybrid Search",
        ],
      },
    ],
  },

  {
    label: "Observability",
    skills: [
      {
        name: "Grafana",
        icon: "grafana",
        proficiency: "Projects",
        concepts: [
          "Dashboards",
          "Panels",
          "Alerting",
        ],
      },
      {
        name: "Prometheus",
        icon: "prometheus",
        proficiency: "Projects",
        concepts: [
          "Metrics",
          "Exporters",
          "Scraping",
        ],
      },
      {
        name: "Sentry",
        icon: "sentry",
        proficiency: "Projects",
        concepts: [
          "Error Tracking",
          "Alerting",
        ],
      },
    ],
  },

  {
    label: "Developer Tools",
    skills: [
      {
        name: "GitHub",
        icon: "github",
        proficiency: "Production",
        concepts: [
          "Git",
          "Branching",
          "Pull Requests",
          "Merge Strategies",
          "Code Reviews",
          "Git Flow",
          "Rebase",
        ],
      },
      {
        name: "Postman",
        icon: "postman",
        proficiency: "Projects",
        concepts: [
          "Collections",
          "Authentication",
          "API Testing",
        ],
      },
      {
        name: "n8n",
        icon: "n8n",
        proficiency: "Production",
        concepts: [
          "Workflow Automation",
          "Webhooks",
          "HTTP",
          "Google Sheets",
          "Scheduling",
          "API Integration",
          "Error Handling"
        ],
      },
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
    id: "marketgrid",

    num: "01",

    title: "MarketGrid",

    subtitle: "Production E-Commerce Backend Platform",

    categories: ["systems"],

    description:
      "E-commerce backend built around transaction-safe PostgreSQL design, event-driven email delivery over RabbitMQ and Kubernetes orchestration. First deployed as a Docker Compose stack on a GCP VM, then moved to Kubernetes on Minikube.",

    highlights: [
      "Runs on Kubernetes (Minikube): NGINX Ingress, rolling updates, health probes and CPU-based autoscaling",
      "ACID checkout with row locks, JWT authentication and role-based access control",
      "Event-driven confirmation emails over RabbitMQ, decoupled from order processing",
      "Earlier deployed on a GCP VM with Docker Compose and GitHub Actions CI/CD",
    ],

    stack: [
      "Kubernetes",
      "Minikube",
      "Docker",
      "PostgreSQL",
      "RabbitMQ",
      "FastAPI",
      "NGINX Ingress",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Linux",
      "GCP",
    ],

    github: "https://github.com/Anantha-Shayan/ecommerce",

    overview:
      "A backend-focused e-commerce platform built to understand how production-grade systems are designed and operated. It pairs practical DBMS concepts (transactions, row locking, normalization, RBAC, triggers) with event-driven messaging and container orchestration. It was first deployed to a GCP VM with Docker Compose and GitHub Actions, then moved to Kubernetes on Minikube, where it runs locally.",

    architecture: [
      "Docker Compose stack on a GCP VM, deployed by GitHub Actions through GHCR (before Kubernetes)",
      "Kubernetes on Minikube with two namespaces and an NGINX Ingress routing / and /api",
      "Rolling updates, startup/readiness/liveness probes and graceful shutdown on the backend",
      "HPA-based autoscaling driven by the Metrics Server",
      "ConfigMaps, Secrets and persistent volumes; Alembic migration and seed run as Jobs",
      "Normalized PostgreSQL schema with transactional checkout, triggers and RBAC",
      "Payment trigger queues an email job; the backend publishes it to RabbitMQ and a worker sends it",
    ],
  },

  {
    id: "sasya-sampada",

    num: "02",

    title: "SasyaSampada",

    subtitle: "AgriAI RAG Assistant",

    categories: ["nlp", "systems"],

    description:
      "RAG-based agricultural assistant that retrieves domain-specific knowledge to provide contextual responses and crop-related assistance.",

    highlights: [
      "Modular RAG platform with independent ingestion, retrieval, embedding and generation pipelines",
      "Configurable ingestion: PDF parsing, cleaning, recursive chunking, metadata enrichment, embeddings and vector indexing, with stage-wise retry and logging",
      "Metadata-aware chunking, configurable overlap and citations on Qdrant with Sentence Transformers",
      "Location, price and weather aware Crop Recommendation system",
      "Predictive modelling",
      "Context-aware conversational responses",
      "Low-resource deployment design",
    ],

    stack: [
      "Python",
      "LangChain",
      "RAG",
      "Qdrant",
      "Sentence Transformers",
      "Embeddings",
      "NLP",
      "Docker",
      "GCP",
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
      "Containerized with Docker and deployed on GCP, exposed through REST APIs",
    ],
  },

  {
    id: "job-rec",

    num: "03",

    title: "AI Job Recommendation System",

    subtitle: "Semantic Search Engine",

    categories: ["ml", "systems"],

    description:
      "Semantic job matching system that combines vector search and hybrid retrieval techniques to match resumes with relevant job opportunities.",

    highlights: [
      "Resume parsing and embedding pipeline",
      "Semantic + keyword search experimentation",
      "Vector database comparisons and optimal selection",
      "Skill gap analysis and ranking",
      "Hybrid semantic + skill-gap ranking exposed through REST APIs",
    ],

    stack: [
      "Python",
      "Flask",
      "Docker",
      "Sentence Transformers",
      "FAISS",
      "Endee",
      "Vector Databases",
      "Semantic Search",
      "REST API",
      "Linux",
      "GCP",
    ],

    github:
      "https://github.com/Anantha-Shayan/endee/tree/master/recommendation_system",

    overview:
      "A recommendation system designed to move beyond traditional keyword matching by using semantic retrieval and vector similarity search. The project involved experimentation with FAISS, hybrid search architectures, and distributed vector databases while exploring the tradeoffs between search quality, latency, and scalability.",

    architecture: [
      "Resume parsing and embedding pipeline",
      "Semantic similarity search using vector embeddings",
      "Hybrid retrieval experimentation with keyword matching",
      "Vector indexing and retrieval",
      "Skill gap analysis alongside ranking",
      "Backend APIs for search and recommendation workflows",
    ],
  },

  {
    id: "price-forecasting",

    num: "04",

    title: "Agricultural Market Price Forecasting",

    subtitle: "Time-Series Forecasting",

    categories: ["ml"],

    description:
      "DeepAR-based forecasting pipelines for commodity prices, built over a large agricultural market dataset.",

    highlights: [
      "Processed 2.4M time-series records",
      "DeepAR forecasting pipelines for commodity prices",
    ],

    stack: ["Python", "DeepAR", "Time Series"],

    // TODO: replace with the project's repository URL (not recoverable from the resume PDF).
    github: "https://github.com/Anantha-Shayan",

    overview:
      "Forecasting pipelines for agricultural commodity prices, processing 2.4M time-series records and modelling them with DeepAR.",

    architecture: [
      "Cleaning and processing of 2.4M time-series records",
      "DeepAR model training and forecasting pipeline",
      "Commodity price forecasts for agricultural markets",
    ],
  },

  {
    id: "health-monitoring",

    num: "05",

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
  /** systemd-style unit name used by the journey's `systemctl status` command. */
  unit: string;
  role: string;
  company: string;
  period: string;
  type: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    unit: "molecular-solutions",

    role: "AI/ML Developer Intern",

    company: "Molecular Solutions",

    period: "Oct 2026 – Present",

    type: "AI • Backend Workflows",

    points: [
      "Built an end-to-end computational drug discovery workflow: molecular docking, synthetic accessibility scoring, ADMET prediction and binding-affinity analysis",

      "Designed persistent, batch-based pipelines on FastAPI, PostgreSQL, SQLAlchemy and Alembic, with orchestration, retries and recovery from failures",

      "Integrated scientific tools and third-party APIs into modular Python backend workflows, containerized with Docker Compose",

      "Rolling out Cloudflare Zero Trust (ZTNA) for secure, identity-based access to internal applications",
    ],
  },

  {
    unit: "healthrytix",

    role: "Founding Tech Lead",

    company: "Healthrytix HealthTech Solutions",

    period: "Sept 2025 – Present",

    type: "AI / Automation • Infra and Deployment",

    points: [
      "Lead a 2-member tech team: delegating feature development, reviewing pull requests and giving technical feedback",

      "Own end-to-end delivery, from requirements and system design to implementation, deployment and production operations",

      "Manage cloud infrastructure and releases across GCP and VPS: server configuration, backend integrations, troubleshooting and reliability",

      "Built AI-driven automation workflows in n8n with WhatsApp, Google Sheets and internal APIs, cutting manual effort by 70–80%",
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

    degree: "Major in Artificial Intelligence",

    period: "Jan 2025 – Jun 2026",

    badge: "AI Specialization",
  },

  {
    institution: "JSS Academy of Technical Education",

    degree: "B.Tech, Computer Science Engineering (AI&ML major)",

    period: "Oct 2024 – Jun 2028",

    badge: "AI/ML Major",
  },
];
