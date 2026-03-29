import type { Project } from '@/sections/projects/data/types'

export const online: Project = {
  slug: 'online',
  title: 'Online Store',
  description:
    'A full-stack e-commerce platform with product browsing, cart management, and Stripe-powered checkout. Built with Next.js App Router, server actions, and a Prisma/PostgreSQL data layer.',
  tags: ['nextjs', 'typescript', 'tailwind', 'prisma', 'postgresql'],
  year: 2024,
  links: {
    github: 'https://github.com/mori-wu/online-store',
    live: 'https://online-store-demo.vercel.app',
  },
}
