import type { Project } from '~/content/projects/types'

export const slaca: Project = {
  slug: 'slaca',
  title: 'SLACA',
  summary:
    'An AI-assisted student lifestyle app that centralises campus information, social interaction, and personalised support.',
  description:
    "Developed as a Master's capstone project, SLACA is a mobile application designed to improve student life at UOW. Led front-end development and UI/UX design, focusing on building a seamless cross-platform experience using Expo and Tailwind CSS. Implemented features such as an AI chatbot, personalised content recommendations, and location-based utilities to enhance accessibility and engagement.",
  category: ['Full-stack', 'Frontend'],
  role: 'Frontend Developer',
  year: '2025',
  status: 'Featured',
  techStack: ['Expo', 'TypeScript', 'React Native', 'Tailwind CSS', 'FastAPI', 'RAG'],
  tags: ['AI', 'Mobile', 'UX'],
  image: '/projects/slaca/cover.png',
  links: {
    caseStudy: '/projects/slaca',
  },
  featured: true,
  contributions: [
    'Led all front-end development using Expo and React Native, owning the full component architecture.',
    'Designed and built the AI chatbot interface with streaming responses integrated via FastAPI.',
    'Implemented a personalised content feed driven by user preference signals and RAG retrieval.',
    'Built location-based campus utilities including an interactive map and proximity alerts.',
    'Established the Tailwind CSS design system for consistent cross-platform UI.',
  ],
  features: [
    'AI-powered chatbot for instant, context-aware campus support',
    'Personalised content recommendations based on interests and activity',
    'Location-based services: campus map, nearby events, and alerts',
    'Social layer: peer communities, group chats, and activity feeds',
    'Cross-platform delivery (iOS & Android) via Expo managed workflow',
  ],
  challenges:
    'Integrating a RAG-based AI backend with a React Native frontend while maintaining low-latency streaming UX on mobile networks which required careful chunked response handling and optimistic UI patterns.',
}
