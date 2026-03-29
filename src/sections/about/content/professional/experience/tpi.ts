import type { RawFileNode } from '@/sections/about/types'
import { TPI_SNIPPETS } from '@/sections/about/snippets/professional/experience/tpi'

export const tpi: RawFileNode = {
  type: 'file',
  iconColor: 'bg-slate-500',
  lang: 'md',
  content: `# Frontend Engineer

**TPI Software**  
*Jan 2020 – Jun 2022*

Worked on large-scale enterprise systems in fintech and healthcare,  
focusing on building scalable and maintainable frontend applications.

## Key Contributions

- Built reusable UI components using **Vue.js** and **TypeScript**,  
  improving consistency and development efficiency across projects.

- Implemented complex state management and business logic to support  
  high-volume workflows and accurate data rendering.

- Integrated REST APIs to enable reliable data flow between frontend  
  and backend services.

- Collaborated in Agile teams, participating in sprint planning,  
  code reviews, and CI/CD workflows using **GitLab**.`,
  snippets: [TPI_SNIPPETS],
}
