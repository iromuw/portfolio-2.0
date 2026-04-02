import type { RawFileNode, RawSnippet } from '@/sections/about/types'

const STATUS_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Current Status
const status = {
  building: ["Portfolio", "Full-stack side projects"],
  learning: ["Next.js", "Node.js", "System design"],
  exploring: ["Product thinking", "UI architecture"],
  lookingFor: "Frontend / Full-stack opportunities",
  focus: [
    "Clean UI",
    "Practical products",
    "Real-world problems",
  ],
};`,
}

const PHILOSOPHY_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 3,
  lang: 'typescript',
  code: `// Philosophy
const philosophy = {
  code: "Readable > clever",
  ui: "Simple is powerful",
  product: "Build what matters",
};`,
}

const BIO_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 3,
  lang: 'typescript',
  code: `// About Me
const developer = {
  name: "Mo-Yun (Mori) Wu",
  role: "Frontend Developer",
  location: "Sydney",
  stack: ["Vue", "React", "Next.js"],
  backend: ["Node.js", "FastAPI"],
};`,
}

export const bio: RawFileNode = {
  type: 'file',
  lang: 'md',
  iconColor: 'bg-red-400',
  content: `# About Me

Hi, I'm Mo-Yun (Mori) Wu, a Frontend Developer based in Sydney.

I have experience building user interfaces with Vue.js in real-world projects, and I've been expanding my skills in React, Next.js, and full-stack development using Node.js and FastAPI.

I enjoy turning complex ideas into clean and intuitive user experiences, with a focus on both code quality and real product impact.

Recently, I've been working on projects related to student services, productivity tools, and platform design.

Currently seeking opportunities where I can grow as a developer and contribute to meaningful products.`,
  snippets: [STATUS_SNIPPET, PHILOSOPHY_SNIPPET, BIO_SNIPPET],
}
