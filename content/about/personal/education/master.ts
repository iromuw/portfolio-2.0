import type { RawFileNode, RawSnippet } from '@/sections/about/types'

const MASTER_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '7 months ago',
  stars: 0,
  lang: 'typescript',
  code: `// Master Degree
const master = {
  degree: "MCS (Big Data & ML)",
  school: "UOW",
  duration: "2023 – 2025",
  focus: ["Web", "Full-stack", "Data"],
  capstone: "SLACA (React Native + FastAPI + RAG)",
};`,
}

const TECHNICAL_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '7 months ago',
  stars: 0,
  lang: 'typescript',
  code: `// Technical Focus
const technical = {
  frontend: ["React", "React Native"],
  backend: ["PHP", "Node.js", "FastAPI"],
  data: ["Python (NumPy, Pandas, ML basics)"],
  focus: ["Clean UI", "Scalable structure"],
};`,
}

export const master: RawFileNode = {
  type: 'file',
  iconColor: 'bg-slate-500',
  lang: 'md',
  content: `# Master of Computer Science

**University of Wollongong**
*Jul 2023 – Jul 2025*
*Major in Big Data and Machine Learning*
*Graduated with Distinction*

Focused on building practical skills in web development, backend systems,
and data-driven applications.

## Capstone project

**SLACA** — a full-stack platform integrating frontend, backend,
and AI-powered features using a RAG-based chatbot system.

Also developed a WordPress website with custom PHP plugins,
and completed multiple data analysis projects.

## Relevant coursework:

- Web Development
- Programming and Data Structures
- Web Server Programming
- Data Mining and Knowledge Discovery
- Big Data Analytics`,
  snippets: [MASTER_SNIPPET, TECHNICAL_SNIPPET],
}
