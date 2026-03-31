import type { Project } from '~/content/projects/types'

export const acf: Project = {
  slug: 'acf',
  title: 'Australia Career Forum Portal',
  summary:
    'A platform supporting career development and community engagement for Chinese professionals in Australia.',
  description:
    'Worked as a UI/UX designer, contributing to early-stage layouts and user flows. Designed key pages such as homepage, registration, and member dashboard. Focused on accessibility, responsive design, and improving usability for diverse user groups.',
  category: ['UI/UX'],
  role: 'UI/UX Designer',
  year: '2023',
  status: 'Design',
  techStack: ['Figma', 'UX Research', 'UI Design', 'Accessibility'],
  tags: ['Design', 'Community'],
  image: '/projects/acf/cover.png',
  links: {
    caseStudy: '/projects/acf',
  },
  contributions: [
    'Designed homepage, event listing, registration, and member dashboard layouts in Figma.',
    'Conducted user interviews and synthesised findings into actionable UX improvements.',
    'Created a responsive design system covering typography, colour tokens, and reusable components.',
    'Collaborated with engineers to produce developer-ready specs and annotated handoff documents.',
    'Ensured WCAG-aligned accessibility across all designed interfaces.',
  ],
  features: [
    'Member registration and profile management flows',
    'Event discovery, registration, and calendar integration',
    'Job board with advanced search and bookmark functionality',
    'Community forums and peer networking features',
    'Admin dashboard for content and member management',
  ],
  challenges:
    'Balancing a bilingual (English/Chinese) content structure with a clean, recruiter-friendly layout which required careful typographic hierarchy decisions and layout flexibility for varying text lengths.',
}
