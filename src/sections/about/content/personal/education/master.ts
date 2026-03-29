import type { RawFileNode } from '@/sections/about/types'
import { MASTER_SNIPPETS, TECHNICAL_SNIPPETS } from '@/sections/about/snippets/personal/education'

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
  snippets: [MASTER_SNIPPETS, TECHNICAL_SNIPPETS],
}
