import type { RawFileNode } from '@/sections/about/types'
import { ACF_SNIPPETS } from '@/sections/about/snippets/professional/experience/acf'

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
  snippets: [ACF_SNIPPETS],
}
