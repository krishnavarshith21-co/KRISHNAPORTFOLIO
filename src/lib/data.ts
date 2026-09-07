// ============================================================
// PORTFOLIO DATA — Krishna Varshith
// Single source of truth for all portfolio content
// ============================================================

// ── TYPES ──

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline?: string;
  problem?: string;
  description: string;
  highlights: string[];
  implementation?: string[];
  tech: string[];
  github?: string;
  live?: string;
  layout: "featured" | "editorial" | "split" | "technical" | "compact";
  badge?: string;
}

export interface Credential {
  id: string;
  date: string;
  category: "HACKATHON" | "MASTERCLASS" | "WORKSHOP" | "CERTIFICATE" | "ACHIEVEMENT";
  title: string;
  organisation: string;
  certificateImage?: string;
}

export interface TimelineEntry {
  year: string;
  type: "BUILDING" | "HACKATHON" | "LEARNING" | "WORKSHOP" | "ACHIEVEMENT";
  title: string;
  description: string;
  evidence?: { label: string; credentialId?: string };
}

export interface Repository {
  name: string;
  language: string;
  description: string;
  url: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface EducationGroup {
  title: string;
  subjects: string[];
}

// ── PROJECTS ──

export const projects: Project[] = [
  {
    id: "mitra-verify",
    number: "01",
    title: "MITRA VERIFY",
    category: "Identity Security · AI · API",
    tagline: "CONTINUOUS IDENTITY VERIFICATION FOR ACTIVE SESSIONS",
    problem:
      "Traditional authentication systems verify identity only at login time. Once a session token is issued, the system blindly trusts the bearer — creating a security gap for the entire session duration.",
    description:
      "An API-first identity verification platform designed to maintain identity confidence throughout an active session rather than relying solely on login-time authentication.",
    highlights: [
      "Continuous verification",
      "Session-level identity assessment",
      "Challenge-based verification",
      "Risk detection",
      "API-first architecture",
    ],
    implementation: [
      "Built a session management layer that tracks identity confidence scores over time",
      "Implemented challenge-based verification triggers based on risk thresholds",
      "Designed RESTful API contracts for integration with any client application",
      "Used computer vision for passive identity signal collection",
      "Deployed on Vercel with edge-optimized API routes",
    ],
    tech: ["TypeScript", "Next.js", "Computer Vision", "REST APIs", "Vercel"],
    github: "https://github.com/krishnavarshith21-co/mitra-vrify",
    live: "https://mitra-vrify.vercel.app",
    layout: "featured",
    badge: "FEATURED PROJECT",
  },
  {
    id: "shree-vasudha-projects",
    number: "02",
    title: "SHREE VASUDHA PROJECTS",
    category: "Client Work · Real Estate · Web Development",
    tagline: "PROFESSIONAL DIGITAL EXPERIENCE",
    description: "Client website project developed as a professional digital experience for Shree Vasudha Projects.",
    highlights: [
      "Client project delivery",
      "Professional web presence",
      "Digital experience design",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/krishnavarshith21-co/Shree-Vasudha-projects",
    live: "https://shree-vasudha-projects.vercel.app",
    layout: "featured",
    badge: "CLIENT PROJECT",
  },
  {
    id: "truthlens",
    number: "03",
    title: "TRUTHLENS",
    category: "AI · Content Verification · Trust",
    problem:
      "Users lack tools to quickly assess the credibility of online content, making it difficult to distinguish between trustworthy information and misinformation.",
    description:
      "AI-powered content verification and credibility analysis tool that helps users assess the reliability of information and distinguish between trustworthy content and misinformation.",
    highlights: [
      "AI-driven analysis",
      "Content credibility scoring",
      "Trust verification",
      "Real-time processing",
    ],
    implementation: [
      "Built text analysis pipeline using embeddings and semantic similarity",
      "Implemented chunking strategy for context window management",
      "Designed credibility scoring algorithm based on source analysis",
    ],
    tech: ["TypeScript", "Next.js", "AI/ML", "NLP"],
    github: "https://github.com/krishnavarshith21-co/truthlens-nxt",
    layout: "editorial",
  },
  {
    id: "aura-ai",
    number: "04",
    title: "AURA AI",
    category: "AI · Intelligent Systems",
    problem:
      "Generic AI assistants lack domain-specific context awareness and modular architecture for smart automation workflows.",
    description:
      "Context-aware intelligent assistance system built with LLM integration, natural language understanding and modular API design for smart automation.",
    highlights: [
      "Natural language processing",
      "Context-aware responses",
      "LLM integration",
      "Modular architecture",
    ],
    implementation: [
      "Integrated LLM APIs with structured prompt engineering",
      "Built modular API layer for extensible automation",
      "Implemented context management for multi-turn conversations",
    ],
    tech: ["TypeScript", "AI/ML", "LLM Integration", "API Design"],
    github: "https://github.com/krishnavarshith21-co/aura-ai",
    layout: "split",
  },
  {
    id: "audit-flow",
    number: "05",
    title: "AUDIT FLOW",
    category: "Automation · AI · Engineering",
    problem:
      "Manual auditing workflows are time-consuming, error-prone and lack structured reporting.",
    description:
      "Automated auditing and quality assurance workflow system that streamlines compliance checks and reporting through intelligent automation.",
    highlights: [
      "Automated workflows",
      "Quality assurance",
      "Process automation",
      "Structured reporting",
    ],
    tech: ["TypeScript", "Automation", "Workflow Engine"],
    github: "https://github.com/krishnavarshith21-co/audit-flow",
    layout: "technical",
  },
  {
    id: "seo-audit-hub",
    number: "06",
    title: "SEO AUDIT HUB",
    category: "Automation · Web",
    description:
      "SEO analysis and technical auditing platform providing actionable insights for web properties.",
    highlights: ["SEO analysis", "Technical auditing", "Performance metrics"],
    tech: ["TypeScript", "Web APIs", "Analytics"],
    github: "https://github.com/krishnavarshith21-co/SEO-Audit-Hub",
    layout: "compact",
  },
  {
    id: "hotspot-bypass",
    number: "07",
    title: "HOTSPOT BYPASS",
    category: "Systems · Networking",
    description:
      "Systems-level networking utility exploring connectivity configurations and network access patterns.",
    highlights: ["Network systems", "Connectivity tools", "Systems programming"],
    tech: ["Batch", "Networking", "Systems"],
    github: "https://github.com/krishnavarshith21-co/hotspot-bypass",
    layout: "compact",
  },
];

// ── TECHNICAL CAPABILITIES ──

export const capabilities: SkillCategory[] = [
  {
    title: "LANGUAGES",
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "AI / ML",
    items: [
      "Computer Vision",
      "LLMs",
      "RAG",
      "Embeddings",
      "Semantic Search",
      "AI Applications",
    ],
  },
  {
    title: "WEB / BACKEND",
    items: ["Next.js", "REST APIs", "Backend Development", "Databases"],
  },
  {
    title: "SECURITY",
    items: [
      "Identity Verification",
      "Session Security",
      "API Security",
      "Risk Detection",
    ],
  },
];

// ── EDUCATION ──

export const education: EducationGroup[] = [
  {
    title: "COMPUTING",
    subjects: [
      "Computer Programming",
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Web Application Development",
      "Backend Development",
    ],
  },
  {
    title: "AI",
    subjects: ["Building LLM Applications", "AI for Finance", "Generative AI"],
  },
  {
    title: "FOUNDATIONS",
    subjects: [
      "Probability & Statistics",
      "Digital Electronics",
      "Quantum Computing",
    ],
  },
];

// ── JOURNEY ──

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    type: "ACHIEVEMENT",
    title: "Maker Conclave",
    description: "Presented a technology project at Maker Conclave, demonstrating practical engineering, innovation, and problem-solving.",
    evidence: { label: "VIEW DETAILS →", credentialId: "maker-conclave" },
  },
  {
    year: "2026",
    type: "BUILDING",
    title: "Mitra Verify — Product Development",
    description:
      "Architected and built an API-first continuous identity verification platform from first principles.",
  },
  {
    year: "2026",
    type: "HACKATHON",
    title: "Adobe University Hackathon",
    description: "Participated in Adobe's university hackathon. Rapid prototyping and product development under time constraints.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "adobe-hackathon" },
  },
  {
    year: "2026",
    type: "HACKATHON",
    title: "Takeover Hackathon",
    description: "Built and shipped software under pressure during the Takeover Hackathon by NxtWave.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "takeover-hackathon" },
  },
  {
    year: "2025–26",
    type: "LEARNING",
    title: "NIAT Masterclasses",
    description: "Advanced engineering practices and emerging technology fundamentals.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "gen-ai-mastery" },
  },
  {
    year: "2025",
    type: "WORKSHOP",
    title: "Autonomous Vehicles Workshop",
    description: "Hardware-software interfaces, embedded systems and sensor integration.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "autonomous-vehicles" },
  },
  {
    year: "2025",
    type: "WORKSHOP",
    title: "Robotic Arms 101",
    description: "Robotic systems, control mechanisms and automation fundamentals.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "robotic-arms" },
  },
  {
    year: "2025",
    type: "LEARNING",
    title: "OpenAI Academy × NxtWave Regional Buildathon",
    description: "Built LLM-driven tools at the regional buildathon. Applied Generative AI to practical problems.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "openai-buildathon" },
  },
  {
    year: "2025",
    type: "WORKSHOP",
    title: "Base44 App Building Workshop",
    description: "Hands-on application building and rapid prototyping workshop.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "base44-workshop" },
  },
  {
    year: "2025",
    type: "LEARNING",
    title: "Vector Search & Text Embeddings",
    description: "Learned text embeddings, semantic search architecture and vector database fundamentals.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "vector-search" },
  },
];

// ── CREDENTIALS ──

export const credentials: Credential[] = [
  { id: "maker-conclave", date: "2026", category: "ACHIEVEMENT", title: "Maker Conclave", organisation: "Maker Conclave" },
  { id: "adobe-hackathon", date: "2026", category: "HACKATHON", title: "Adobe University Hackathon", organisation: "Adobe", certificateImage: "/certificates/adobe-hackathon.png" },
  { id: "takeover-hackathon", date: "2026", category: "HACKATHON", title: "Takeover Hackathon", organisation: "NIAT", certificateImage: "/certificates/takeover-hackathon.jpg" },
  { id: "openai-buildathon", date: "2025", category: "WORKSHOP", title: "OpenAI Academy × NxtWave Regional Buildathon — Telangana", organisation: "OpenAI Academy / NxtWave", certificateImage: "/certificates/openai-buildathon.png" },
  { id: "gen-ai-mastery", date: "2025", category: "MASTERCLASS", title: "Generative AI Mastery Workshop", organisation: "NIAT", certificateImage: "/certificates/gen-ai-mastery.jpg" },
  { id: "base44-workshop", date: "2025", category: "WORKSHOP", title: "Base44 — Hands-On App Building Workshop", organisation: "Base44", certificateImage: "/certificates/base44-workshop.jpg" },
  { id: "text-embeddings", date: "2025", category: "CERTIFICATE", title: "Applying Text Embeddings in LLM Systems", organisation: "NxtWave", certificateImage: "/certificates/text-embeddings.png" },
  { id: "vector-search", date: "2025", category: "CERTIFICATE", title: "Vector Search in Practice: Semantic Search with LLMs", organisation: "NxtWave", certificateImage: "/certificates/vector-search.png" },
  { id: "robotic-arms", date: "2026", category: "WORKSHOP", title: "Robotic Arms 101", organisation: "NIAT", certificateImage: "/certificates/robotic-arms.jpg" },
  { id: "autonomous-vehicles", date: "2025", category: "WORKSHOP", title: "Autonomous Vehicles", organisation: "Workshop Provider", certificateImage: "/certificates/autonomous-vehicles.png" },
];

// ── GITHUB REPOS ──

export const repositories: Repository[] = [
  { name: "mitra-vrify", language: "TypeScript", description: "API-first continuous identity verification platform", url: "https://github.com/krishnavarshith21-co/mitra-vrify" },
  { name: "truthlens-nxt", language: "TypeScript", description: "AI-powered content verification and credibility analysis", url: "https://github.com/krishnavarshith21-co/truthlens-nxt" },
  { name: "aura-ai", language: "TypeScript", description: "Context-aware intelligent assistance system", url: "https://github.com/krishnavarshith21-co/aura-ai" },
  { name: "audit-flow", language: "TypeScript", description: "Automated auditing and quality assurance workflows", url: "https://github.com/krishnavarshith21-co/audit-flow" },
  { name: "SEO-Audit-Hub", language: "TypeScript", description: "SEO analysis and technical auditing platform", url: "https://github.com/krishnavarshith21-co/SEO-Audit-Hub" },
  { name: "hotspot-bypass", language: "Batch", description: "Systems-level networking utility", url: "https://github.com/krishnavarshith21-co/hotspot-bypass" },
];

// ── NAV ──

export const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "EDUCATION", href: "#education" },
  { label: "JOURNEY", href: "#journey" },
  { label: "CREDENTIALS", href: "#credentials" },
  { label: "CONTACT", href: "#contact" },
];

export const socialLinks = {
  github: "https://github.com/krishnavarshith21-co",
  linkedin:
    "https://www.linkedin.com/in/kamanaboina-krishna-varshith-8a550b36b/",
  email: "krishnavarshith21@gmail.com",
};
