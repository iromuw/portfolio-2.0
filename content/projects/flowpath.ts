import type { Project } from '~/content/projects/types'

export const flowpath: Project = {
  slug: 'flowpath',
  title: 'Flowpath',
  summary:
    'A full-stack job application tracker that brings structure, clarity, and momentum to the job search process.',
  description:
    'Built out of firsthand frustration with spreadsheets and Notion templates, Flowpath is a purpose-built job search OS. Designed and developed end-to-end — from database schema to UI — with a focus on surfacing actionable insight from application data. Features a analytics dashboard, platform performance breakdowns, and a structured application log with status tracking.',
  category: ['Full-stack', 'Product'],
  role: 'Product / Full Stack Developer',
  year: '2026',
  status: 'Featured',
  techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
  tags: ['Productivity', 'Data', 'SaaS'],
  image: '/projects/flowpath/cover.png',
  links: {
    caseStudy: '/projects/flowpath',
  },
  featured: true,
  contributions: [
    'Designed and built the full application from scratch — schema design, API routes, and UI.',
    'Built an analytics dashboard with response rate tracking, platform performance, and conversion breakdowns.',
    'Implemented a structured application log with status tracking, platform tagging, and date filtering.',
    'Architected the Prisma schema and PostgreSQL database for extensible application state management.',
    'Developing a browser extension to auto-capture job listing data and reduce manual entry friction.',
  ],
  features: [
    'Dashboard with real-time application status overview and momentum indicators',
    'Analytics page with response rates, platform performance, and weekly application volume',
    'Structured application log with status tracking, platform, and mode filters',
    'Saved jobs pipeline for pre-application research and comparison (in progress)',
    'Calendar view for interview scheduling and follow-up reminders (in progress)',
  ],
  challenges:
    'Designing a data model flexible enough to handle the messiness of real job search data — inconsistent job titles from URL-based imports, multi-platform tracking, and evolving application states — while keeping the UI simple and the insight actionable.',
}