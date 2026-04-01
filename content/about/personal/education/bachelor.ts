import type { RawFileNode, RawSnippet } from '@/sections/about/types'

const BACHELOR_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Bachelor Degree
const bachelor = {
  degree: "BDes",
  major: "Product Design",
  school: "MCU",
  duration: "2011 – 2015",
  focus: ["Design thinking", "UX", "Visual design"],
};`,
}

const ACHIEVEMENT_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Achievement
const achievement = {
  award: "iF Design Award",
  stage: "Final Jury",
  note: "Selected for final evaluation in product design",
};`,
}

export const bachelor: RawFileNode = {
  type: 'file',
  iconColor: 'bg-slate-500',
  lang: 'md',
  content: `# Bachelor of Product Design

**Ming Chuan University**
*Sep 2011 – Jun 2015*

Built a foundation in design thinking, user experience, and visual communication.

Gained experience in product design, 3D modeling, and human-centered design,
which later shaped my approach to building intuitive and user-focused interfaces.`,
  snippets: [BACHELOR_SNIPPET, ACHIEVEMENT_SNIPPET],
}
