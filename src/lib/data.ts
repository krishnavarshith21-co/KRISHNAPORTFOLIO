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
  category: "HACKATHON" | "MASTERCLASS" | "WORKSHOP" | "CERTIFICATE" | "ACHIEVEMENT" | "APPRECIATION";
  title: string;
  organisation: string;
  description?: string;
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
    category: "Identity Verification · AI/ML · Security Architecture",
    tagline: "FULL-STACK IDENTITY VERIFICATION PLATFORM",
    problem:
      "Traditional authentication systems verify identity only at login time. Once a session token is issued, the system blindly trusts the bearer — creating a security gap for the entire active session duration.",
    description:
      "Built a full-stack identity verification platform combining AI-powered document analysis, semantic matching, and security-focused application architecture.",
    highlights: [
      "AI-powered document analysis & verification",
      "Semantic matching engine for identity credentials",
      "Security-focused application architecture",
      "Continuous session-level identity assessment",
      "API-first integration for modern client applications",
    ],
    implementation: [
      "Engineered full-stack architecture with Next.js, TypeScript, and edge API routes",
      "Integrated AI-driven document analysis and passive identity verification signals",
      "Implemented semantic matching algorithms to cross-verify document credentials against session data",
      "Built challenge-based verification triggers dynamically evaluated by risk thresholds",
      "Deployed high-availability API endpoints designed for low-latency session validation",
    ],
    tech: [
      "Full-Stack Development",
      "AI/ML",
      "Document Analysis",
      "Semantic Matching",
      "Security Architecture",
      "TypeScript",
      "Next.js",
    ],
    github: "https://github.com/krishnavarshith21-co/mitra-vrify",
    live: "https://mitra-vrify.vercel.app",
    layout: "featured",
    badge: "FEATURED PROJECT",
  },
  {
    id: "shree-vasudha-projects",
    number: "02",
    title: "SHREE VASUDHA PROJECTS",
    category: "Client Project · Software Delivery · Web Development",
    tagline: "CLIENT-FACING DIGITAL SOLUTION",
    problem:
      "The client required a bespoke, modern digital presence and robust web platform to showcase premium real estate ventures, deliver project updates, and engage prospective buyers directly.",
    description:
      "Designed and developed a client-facing web solution based on project requirements, working across interface development, implementation, and end-to-end software delivery.",
    highlights: [
      "End-to-end client engagement and delivery",
      "Tailored UI/UX design and responsive implementation",
      "Interactive property showcase and inquiry workflows",
      "Optimized performance and SEO-first architecture",
    ],
    implementation: [
      "Conducted requirements gathering and designed comprehensive interface prototypes",
      "Built performant Next.js and TypeScript frontend with streamlined component architecture",
      "Implemented responsive layouts and micro-interactions for an elevated luxury aesthetic",
      "Managed client feedback cycles and deployed production release on Vercel",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "UI/UX Design",
      "Client Delivery",
    ],
    github: "https://github.com/krishnavarshith21-co/Shree-Vasudha-projects",
    live: "https://shree-vasudha-projects.vercel.app",
    layout: "featured",
    badge: "EXPERIENCE · CLIENT PROJECT",
  },
  {
    id: "truthlens",
    number: "03",
    title: "TRUTHLENS",
    category: "AI/ML · Media Credibility · Fact-Checking",
    tagline: "AI-ASSISTED FACT-CHECKING & SOURCE RELIABILITY",
    problem:
      "Online media consumers and researchers lack fast, automated mechanisms to verify information authenticity and evaluate source reliability against trusted knowledge sources.",
    description:
      "Developed a web application for media credibility analysis using AI-assisted fact-checking and source reliability evaluation.",
    highlights: [
      "AI-assisted fact-checking pipeline",
      "Source reliability and reputation evaluation",
      "Content credibility scoring algorithm",
      "Real-time semantic claim verification",
    ],
    implementation: [
      "Engineered text analysis pipeline utilizing embeddings and semantic similarity comparisons",
      "Implemented intelligent context chunking to process long-form articles efficiently",
      "Designed multi-factor credibility scoring model factoring in source authority and consensus",
      "Created an intuitive analytical dashboard for transparent credibility breakdowns",
    ],
    tech: [
      "Web Application Development",
      "AI/ML",
      "Fact-Checking",
      "Source Evaluation",
      "TypeScript",
      "Next.js",
    ],
    github: "https://github.com/krishnavarshith21-co/truthlens-nxt",
    layout: "editorial",
    badge: "SELECTED PROJECT",
  },
  {
    id: "aura-ai",
    number: "04",
    title: "AURA AI",
    category: "LLM Systems · Intelligent Assistance · Conversational AI",
    tagline: "CONTEXT-AWARE CONVERSATIONAL AI WEB APPLICATION",
    problem:
      "Standard conversational assistants struggle to preserve multi-turn context coherence and lack modular architectures needed to orchestrate external tools and automation workflows.",
    description:
      "Built a conversational AI web application around LLM systems, context-aware responses, and session management.",
    highlights: [
      "LLM systems integration with structured prompt pipelines",
      "Context-aware response generation across turns",
      "Stateful session management and chat persistence",
      "Modular architecture for extensible tool calling",
    ],
    implementation: [
      "Integrated foundational LLM APIs with streaming responses and error handling",
      "Built robust session management layer retaining conversation history and context windows",
      "Designed modular service architecture allowing plug-and-play AI utility extensions",
      "Crafted responsive, minimal conversational interface with latency optimizations",
    ],
    tech: [
      "Web Application Development",
      "LLM Systems",
      "Context Management",
      "Session Management",
      "TypeScript",
    ],
    github: "https://github.com/krishnavarshith21-co/aura-ai",
    layout: "split",
    badge: "SELECTED PROJECT",
  },
  {
    id: "audit-flow",
    number: "05",
    title: "AUDIT FLOW",
    category: "Workflow Automation · Data Validation · Quality Assurance",
    tagline: "AUTOMATED DATA AUDITING & AUDIT-TRAIL GENERATION",
    problem:
      "Manual data auditing across complex business workflows is slow, inconsistent, error-prone, and rarely produces structured, tamper-evident audit trails.",
    description:
      "Engineered a workflow application for automated data auditing, structured validation, and audit-trail generation.",
    highlights: [
      "Automated multi-step data auditing pipeline",
      "Structured validation rules engine",
      "Tamper-evident audit-trail generation",
      "Actionable discrepancy reporting and export",
    ],
    implementation: [
      "Engineered extensible workflow engine capable of processing diverse data formats",
      "Implemented rule validation algorithms to catch schema anomalies and data drift",
      "Created structured audit logging providing complete traceability across validation stages",
      "Designed dashboard interface for visualising audit results and tracking fixes",
    ],
    tech: [
      "Workflow Automation",
      "Data Validation",
      "Audit-Trail Generation",
      "TypeScript",
    ],
    github: "https://github.com/krishnavarshith21-co/audit-flow",
    layout: "technical",
    badge: "SELECTED PROJECT",
  },
  {
    id: "seo-audit-hub",
    number: "06",
    title: "SEO AUDIT HUB",
    category: "Full-Stack Development · Technical SEO · Web Automation",
    tagline: "AUTOMATED TECHNICAL SEO ANALYSIS & STRUCTURED REPORTING",
    problem:
      "Developers and digital marketers need fast, comprehensive technical SEO assessments without relying on costly, cumbersome enterprise scanning suites.",
    description:
      "Developed a full-stack web application that automates technical SEO analysis and generates structured audit reports.",
    highlights: [
      "Automated technical SEO crawler and page analyzer",
      "Comprehensive performance, metadata, and accessibility checks",
      "Structured audit report generation with actionable remediation advice",
      "Clean visualization of critical SEO scoring metrics",
    ],
    implementation: [
      "Built crawler and scraping service to analyze DOM structure, meta tags, and open graph elements",
      "Implemented auditing rules covering Core Web Vitals, indexability, and semantic markup",
      "Generated structured JSON and human-readable reporting modules",
      "Optimized API response caching for rapid iterative audits",
    ],
    tech: [
      "Full-Stack Development",
      "Technical SEO",
      "Automation",
      "Structured Reporting",
      "TypeScript",
    ],
    github: "https://github.com/krishnavarshith21-co/SEO-Audit-Hub",
    layout: "compact",
    badge: "SELECTED PROJECT",
  },
];

// ── TECHNICAL CAPABILITIES ──

export const capabilities: SkillCategory[] = [
  {
    title: "AI / ML",
    items: [
      "Generative AI",
      "LLM Systems",
      "RAG",
      "Text Embeddings",
      "Semantic Search",
      "Vector Search",
      "Computer Vision",
    ],
  },
  {
    title: "WEB / SOFTWARE ENGINEERING",
    items: [
      "Full-Stack Development",
      "Web Application Development",
      "API Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Automation",
    ],
  },
  {
    title: "CYBERSECURITY",
    items: [
      "Cybersecurity",
      "Identity Verification",
      "Security-Focused Software",
    ],
  },
  {
    title: "TOOLS",
    items: [
      "Git",
      "GitHub",
      "Three.js",
      "React Three Fiber",
    ],
  },
];

// ── EDUCATION ──

export const educationDegree = {
  degree: "B.Tech — Computer Science & Engineering (AI & Data Science)",
  institution: "Malla Reddy Vishwavidyapeeth × NIAT",
  status: "2nd Year · Ongoing",
  specialization: "AI & Data Science",
};

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
    type: "HACKATHON",
    title: "HackWithHyderabad 3.0",
    description: "Competed in HackWithHyderabad 3.0, engineering high-impact technology solutions under competitive hackathon conditions.",
  },
  {
    year: "2026",
    type: "HACKATHON",
    title: "KILN '26 — The Hybrid National Build Gauntlet",
    description: "Participated in the hybrid national build gauntlet, developing robust prototypes and software architectures.",
  },
  {
    year: "2026",
    type: "HACKATHON",
    title: "WebRush — 6-Hour Frontend Hackathon",
    description: "Built and delivered a rapid frontend application in a high-intensity 6-hour timed hackathon sprint.",
  },
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
    title: "Mitra Verify — Identity Verification Platform",
    description:
      "Architected and built an API-first continuous identity verification platform combining AI document analysis and semantic matching.",
  },
  {
    year: "2026",
    type: "BUILDING",
    title: "Client Project — Shree Vasudha Projects",
    description:
      "Designed and developed a client-facing web solution based on project requirements, working across interface development and end-to-end delivery.",
    evidence: { label: "VIEW APPRECIATION →", credentialId: "shree-vasudha-appreciation" },
  },
  {
    year: "2026",
    type: "HACKATHON",
    title: "Adobe University Hackathon",
    description: "Participated in Adobe's university hackathon. Rapid prototyping and product development under time constraints.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "adobe-hackathon" },
  },
  {
    year: "2025–26",
    type: "LEARNING",
    title: "Generative AI Mastery Workshop — NIAT",
    description: "Advanced generative AI, LLM systems, prompt engineering, and emerging AI engineering practices.",
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
    title: "OpenAI Academy × NxtWave Regional Buildathon — Telangana",
    description: "Built LLM-driven tools at the regional buildathon. Applied Generative AI to practical problems.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "openai-buildathon" },
  },
  {
    year: "2025",
    type: "WORKSHOP",
    title: "Base44 Hands-On App Building Workshop",
    description: "Hands-on application building and rapid prototyping workshop.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "base44-workshop" },
  },
  {
    year: "2025",
    type: "LEARNING",
    title: "Vector Search in Practice & Applying Text Embeddings",
    description: "Learned text embeddings in LLM systems, semantic search architecture and vector database fundamentals.",
    evidence: { label: "VIEW CERTIFICATE →", credentialId: "vector-search" },
  },
];

// ── CREDENTIALS ──

export const credentials: Credential[] = [
  { 
    id: "ethical-hacking-workshop", 
    date: "8 Sep 2026", 
    category: "WORKSHOP", 
    title: "Ethical Hacking & Cybersecurity Workshop", 
    organisation: "VaultofCodes", 
    description: "2-Hour Ethical Hacking & Cybersecurity Workshop covering reconnaissance, network scanning, Wi-Fi security, web vulnerabilities, practical exercises, live demonstrations, and cybersecurity career pathways.",
    certificateImage: "/certificates/ethical-hacking-workshop.png" 
  },
  { 
    id: "shree-vasudha-appreciation", 
    date: "17 Jul 2026", 
    category: "APPRECIATION", 
    title: "Certificate of Appreciation", 
    organisation: "Shree Vasudha Projects", 
    description: "Recognition for exceptional professionalism, creativity, and technical excellence demonstrated in the successful design and development of the official website.",
    certificateImage: "/certificates/shree-vasudha-appreciation.jpg" 
  },
  { 
    id: "hackwithhyderabad-3", 
    date: "2026", 
    category: "HACKATHON", 
    title: "HackWithHyderabad 3.0", 
    organisation: "HackWithHyderabad", 
    description: "Competed in HackWithHyderabad 3.0, developing software solutions under intense hackathon timelines." 
  },
  { 
    id: "kiln-26", 
    date: "2026", 
    category: "HACKATHON", 
    title: "KILN '26 — The Hybrid National Build Gauntlet", 
    organisation: "KILN", 
    description: "Participated in KILN '26, a national hybrid build gauntlet focused on rapid software prototyping and engineering execution." 
  },
  { 
    id: "webrush-hackathon", 
    date: "2026", 
    category: "HACKATHON", 
    title: "WebRush — 6-Hour Frontend Hackathon", 
    organisation: "WebRush", 
    description: "High-intensity 6-hour frontend hackathon challenge building responsive web interfaces." 
  },
  { id: "maker-conclave", date: "2026", category: "ACHIEVEMENT", title: "Maker Conclave", organisation: "Maker Conclave", description: "Demonstrated innovation, practical engineering, and technical problem-solving at Maker Conclave 2026." },
  { id: "adobe-hackathon", date: "2026", category: "HACKATHON", title: "Adobe University Hackathon", organisation: "Adobe", certificateImage: "/certificates/adobe-hackathon.png", description: "Participated in Adobe University Hackathon 2026, building and pitching rapid prototypes under time pressure." },
  { id: "takeover-hackathon", date: "2026", category: "HACKATHON", title: "Takeover Hackathon", organisation: "NIAT", certificateImage: "/certificates/takeover-hackathon.jpg" },
  { id: "openai-buildathon", date: "2025", category: "WORKSHOP", title: "OpenAI Academy × NxtWave Regional Buildathon — Telangana", organisation: "OpenAI Academy / NxtWave", certificateImage: "/certificates/openai-buildathon.png", description: "Applied Generative AI and LLM APIs to develop real-world problem-solving tools." },
  { id: "gen-ai-mastery", date: "2025", category: "MASTERCLASS", title: "Generative AI Mastery Workshop", organisation: "NIAT", certificateImage: "/certificates/gen-ai-mastery.jpg", description: "Comprehensive masterclass on Generative AI architectures, foundation models, and prompt systems." },
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
  { label: "HOME", href: "#" },
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
