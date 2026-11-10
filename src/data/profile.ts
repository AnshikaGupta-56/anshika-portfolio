/**
 * Single source of truth for all portfolio content.
 * Everything here comes from Anshika's resume — edit this file to update the site.
 */

export const site = {
  // Set NEXT_PUBLIC_SITE_URL to the deployed domain (used for SEO / Open Graph).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resume: "/Anshika_Gupta_Resume.pdf",
};

export const profile = {
  name: "Anshika Gupta",
  role: "Computer Science Student · AI & ML",
  email: "ganshika366@gmail.com",
  phone: "+91 9027084954",
  phoneHref: "tel:+919027084954",
  github: "https://github.com/AnshikaGupta-ai",
  githubHandle: "AnshikaGupta-ai",
  linkedin: "https://www.linkedin.com/in/anshikagupta05/",
  linkedinHandle: "anshikagupta05",
  status: "Seeking internship opportunities",
  seoDescription:
    "Anshika Gupta — Computer Science (B.Tech) student at Galgotias University focused on AI & Machine Learning. Python, Java, SQL. Projects: UPI Fraud Detection Dashboard and a Text-to-SQL engine with intent classification. Seeking internships.",
  keywords: [
    "Anshika Gupta",
    "Computer Science Student",
    "AI ML Intern",
    "Machine Learning Internship",
    "Python Developer",
    "Data Science",
    "SQL",
    "NLP",
    "Text-to-SQL",
    "Fraud Detection",
    "Streamlit",
    "Pandas",
    "Java",
    "Galgotias University",
  ],
};

export const about = {
  paragraphs: [
    "I'm a Computer Science Engineering student at Galgotias University with hands-on knowledge of Python, Java and SQL — and a strong interest in Artificial Intelligence and Machine Learning.",
    "My projects sit where data meets people: a dashboard that helps spot potentially fraudulent UPI transactions, and a natural-language interface that turns plain-English questions into SQL. I'm looking for an internship where I can apply these skills, learn from an experienced team and contribute to real-world products.",
  ],
  brings: [
    { title: "End-to-end ML thinking", body: "Preprocessing, feature analysis, model evaluation — then turning results into visual insights." },
    { title: "Strong SQL foundation", body: "Comfortable with MySQL and database fundamentals; built a project that writes SQL from natural language." },
    { title: "CS fundamentals", body: "DSA, OOP, DBMS, Operating Systems and Computer Networks from academic coursework." },
    { title: "Team-ready", body: "Communication, adaptability, collaboration and logical reasoning — and eager to learn." },
  ],
};

export type SkillGroup = { id: string; title: string; note: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { id: "languages", title: "Languages", note: "What I write code in", skills: ["Python", "Java", "SQL", "C++"] },
  {
    id: "ml",
    title: "AI, ML & Data",
    note: "Libraries and techniques from my projects",
    skills: ["NumPy", "Pandas", "Matplotlib", "Machine Learning", "NLP", "Streamlit", "Jupyter Notebook"],
  },
  { id: "java", title: "Java Ecosystem", note: "Platform and connectivity", skills: ["JVM", "JDBC"] },
  { id: "db", title: "Databases", note: "Storing and querying data", skills: ["MySQL", "SQL Database Fundamentals"] },
  {
    id: "cs",
    title: "CS Fundamentals",
    note: "Core coursework",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
  { id: "tools", title: "Tools", note: "Everyday workflow", skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "MS Office"] },
  {
    id: "soft",
    title: "Soft Skills",
    note: "How I work with people",
    skills: ["Communication", "Adaptability", "Problem Solving", "Collaboration", "Logical Reasoning"],
  },
];

export type Project = {
  slug: "fraud" | "text2sql";
  name: string;
  kicker: string;
  problem: string;
  features: string[];
  contribution: string;
  stack: string[];
  /** Add a repo URL when available; falls back to the GitHub profile. */
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "fraud",
    name: "UPI Fraud Detection Dashboard",
    kicker: "Machine learning · Data visualisation",
    problem:
      "UPI moves huge volumes of transactions, and fraudulent ones hide among the legitimate. This dashboard analyses transactions and surfaces potentially fraudulent patterns so they can be monitored.",
    features: [
      "Interactive dashboard for analysing UPI transactions",
      "ML model classifying transactions as legitimate or potentially fraudulent",
      "Data preprocessing, feature analysis and model evaluation",
      "Visualisations and risk insights to support transaction monitoring",
    ],
    contribution: "Developed the dashboard, the data-preprocessing and modelling pipeline, and the risk visualisations.",
    stack: ["Python", "SQL", "Machine Learning", "Streamlit"],
  },
  {
    slug: "text2sql",
    name: "Text-to-SQL with Classification Engine",
    kicker: "NLP · Databases",
    problem:
      "Getting answers from a database usually means knowing SQL. This project lets people ask in plain language and turns the question into a SQL query.",
    features: [
      "Natural-language interface that converts user queries into SQL statements",
      "Classification engine that detects query intent and routes it to the right workflow",
      "Query validation before execution",
      "Result generation for efficient database access",
    ],
    contribution: "Developed the natural-language-to-SQL interface, the intent classification engine and query validation.",
    stack: ["Python", "NLP", "SQL", "Machine Learning"],
  },
];

export const education = [
  {
    school: "Galgotias University",
    place: "Greater Noida, UP",
    degree: "Bachelor of Technology — Computer Science",
    score: "GPA 7.96 / 10.00",
    status: "Pursuing",
  },
  {
    school: "Kendriya Vidyalaya Air Force Station Bareilly",
    place: "Bareilly, UP",
    degree: "Senior Secondary Education (XII)",
    score: "85.5%",
    status: "Completed",
  },
];

export const certifications = [
  { title: "AI & Machine Learning Workshop", detail: "Participation Certificate · 5 hours" },
  { title: "Artificial Intelligence Awareness Workshop", detail: "Participation Certificate · 5 hours" },
];

export const highlights = [
  { value: "7.96", suffix: "/10", label: "B.Tech GPA", context: "Galgotias University" },
  { value: "85.5", suffix: "%", label: "Class XII score", context: "KV AFS Bareilly" },
  { value: "2", suffix: "", label: "AI / ML workshops", context: "Certified participation" },
  { value: "2", suffix: "", label: "ML projects built", context: "Fraud detection · Text-to-SQL" },
];

export const achievements = [
  "Maintained a GPA of 7.96/10.00 while actively participating in technical learning activities.",
  "Continuously enhancing programming and problem-solving skills through coding practice and academic coursework.",
  "Actively learning emerging technologies such as Artificial Intelligence and Machine Learning.",
];

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
