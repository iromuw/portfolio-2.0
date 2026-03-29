import type { RawFileNode } from '@/sections/about/types'
import { BACHELOR_SNIPPETS, ACHIEVEMENT_SNIPPETS } from '@/sections/about/snippets/personal/education'

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
  snippets: [BACHELOR_SNIPPETS, ACHIEVEMENT_SNIPPETS],
}
