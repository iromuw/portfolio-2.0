import type { Project } from '~/content/projects/types'

export const flowpath: Project = {
  slug: 'flowpath',
  title: 'Flowpath',
  summary:
    'A full-stack job application tracker that brings structure, clarity, and momentum to the job search process.',
  description:
    'Built out of firsthand frustration with spreadsheets and Notion templates, Flowpath is a purpose-built job search OS. Designed and developed end-to-end, from database schema to UI, with a focus on surfacing actionable insight from application data. Used daily during an active job search, it replaced ad-hoc tracking with structured status logging and a live analytics dashboard.',
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
    'Designed and built the full application from scratch: schema design, API routes, and UI. Used it daily throughout an active job search to replace ad-hoc spreadsheet tracking.',
    'Built an analytics dashboard surfacing platform performance data: response rates across Seek, LinkedIn, Indeed, and direct applications, with a 7-day average time to first reply.',
    'Implemented a structured application log with status tracking, platform tagging, and date filtering, replacing a Notion template that offered no aggregated insight.',
    'Architected the Prisma schema and PostgreSQL database to handle evolving application states and multi-platform data without structural rewrites.',
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
    'Designing a data model flexible enough to handle the messiness of real job search data, including inconsistent job titles from URL-based imports, multi-platform tracking, and evolving application states, while keeping the UI simple and the insight actionable.',
}