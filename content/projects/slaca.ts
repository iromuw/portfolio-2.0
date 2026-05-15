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
  status: 'Academic',
  techStack: ['Expo', 'TypeScript', 'React Native', 'Tailwind CSS', 'FastAPI', 'RAG'],
  tags: ['AI', 'Mobile', 'UX'],
  image: '/projects/slaca/cover.png',
  links: {
    caseStudy: '/projects/slaca',
  },
  featured: false,
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
  caseStudy: {
    overview:
      "SLACA is a cross-platform mobile app built as a Master's capstone project, designed to centralise campus life for UOW students. I led frontend development and owned the full design system, from Figma component library to production React Native code, with no handoff stage in between.",
    sections: [
      {
        type: 'text',
        title: 'The Challenge',
        content:
          'Starting from zero with no existing design language, the app needed to serve five distinct modules (Circle, Study, Media, Vendor, Me) while feeling like a single coherent product. The design system had to be built before the screens, otherwise five people building in parallel would produce five inconsistent interfaces.',
      },
      {
        type: 'image',
        title: 'Design System First',
        content:
          'Before writing a single screen, I built a component library in Figma covering typography scale, colour tokens, buttons, tabs, cards, switches, ratings, and navigation primitives. Every component was designed with the dark theme as the primary variant. The decision to establish tokens and components first meant that visual consistency was structural rather than something enforced through code review.',
        image: '/projects/slaca/components.png',
        caption: 'Figma component library covering typography, colour tokens, and UI primitives',
      },
      {
        type: 'image-grid',
        title: 'Key Screens',
        images: [
          '/projects/slaca/circle.png',
          '/projects/slaca/subject.png',
          '/projects/slaca/me.png',
        ],
      },
      {
        type: 'compare',
        title: 'Design to Production',
        content:
          'Every component in the Figma library was shipped directly into React Native by me, with no handoff to another engineer. The image below shows the Figma mockup alongside the production app — the layout, spacing, and component structure transfer directly without translation loss.',
        image: '/projects/slaca/compare.png',
      },
      {
        type: 'text',
        title: 'Outcome',
        content:
          'Independently delivered approximately 80% of all frontend features across a 5-person Agile team. The design system held consistency across five modules without requiring design review on every PR, because the constraints were built into the components themselves.',
      },
    ],
  },
}
