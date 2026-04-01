import type { RawFileNode, RawSnippet } from '@/sections/about/types'

const ACF_SNIPPET: RawSnippet = {
  username: 'iromuw',
  createdAt: '25/03/2026',
  stars: 0,
  lang: 'typescript',
  code: `// Experience Highlight
const acf = {
  role: "UI/UX Designer (Volunteer)",
  focus: ["UX", "Design system"],
  highlight: "Bridged design & frontend",
};`,
}

export const acf: RawFileNode = {
  type: 'file',
  iconColor: 'bg-slate-500',
  lang: 'md',
  content: `# UI/UX Designer (Volunteer)

**Australia Career Forum**
*Oct 2022 – Aug 2023*

Improved user experience for a career development platform by bridging
design thinking with practical frontend implementation.

## Key Contributions

- Designed and prototyped responsive interfaces with a strong focus
  on usability and accessibility.

- Worked closely with frontend engineers to translate design concepts
  into technically feasible solutions.

- Created structured design documentation to support smooth handoff
  and efficient project delivery.`,
  snippets: [ACF_SNIPPET],
}
