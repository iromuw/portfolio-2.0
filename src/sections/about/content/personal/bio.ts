import type { RawFileNode } from '@/sections/about/types'
import { BIO_SNIPPET, STATUS_SNIPPET, PHILOSOPHY_SNIPPET } from '@/sections/about/snippets'

export const bio: RawFileNode = {
  type: 'file',
  lang: 'md',
  iconColor: 'bg-red-400',
  content: `# About Me

Hi, I'm Mo-Yun (Mori) Wu, a Frontend Developer based in Sydney.

I have experience building user interfaces with Vue.js in real-world projects,  
and I've been expanding my skills in React, Next.js, and full-stack development  
using Node.js and FastAPI.

I enjoy turning complex ideas into clean and intuitive user experiences,  
with a focus on both code quality and real product impact.

Recently, I've been working on projects related to student services,  
productivity tools, and platform design.

Currently seeking opportunities where I can grow as a developer  
and contribute to meaningful products.`,
  snippets: [STATUS_SNIPPET, PHILOSOPHY_SNIPPET, BIO_SNIPPET],
}
