import type { RawFileNode, RawSnippet } from '@/sections/about/types'

const FRONTEND_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Frontend
const frontend = {
  stack: ["React", "Next.js", "Vue", "TypeScript"],
  ui: ["Responsive design", "Reusable components"],
};`,
}

const BACKEND_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Backend
const backend = {
  stack: ["Node.js", "FastAPI", "PHP"],
  focus: ["API integration", "Server-side logic"],
};`,
}

const DATA_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Data
const data = {
  stack: ["Python", "NumPy", "Pandas"],
  focus: ["Data analysis", "ML basics"],
};`,
}

export const skills: RawFileNode = {
  type: 'file',
  iconColor: 'bg-blue-400',
  lang: 'md',
  content: `## Skills

I approach frontend development with a strong design background,
focusing on creating intuitive and visually clear user experiences.

I care about both how things look and how they work,
aiming to build interfaces that are not only functional,
but also easy to understand and pleasant to use.

My technical experience spans frontend development,
backend integration, and data processing.

### Frontend
- React
- React Native
- Vue.js
- Next.js
- TypeScript

### Backend
- PHP
- Node.js
- FastAPI

### Data
- Python
- NumPy
- Pandas

### Styling & UI
- Tailwind CSS
- Vuetify
- Bootstrap
- Sass
- Figma
- Adobe XD

### Tools
- Git
- Postman
- GitLab CI/CD`,
  snippets: [FRONTEND_SNIPPET, BACKEND_SNIPPET, DATA_SNIPPET],
}
