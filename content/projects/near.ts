import type { Project } from '~/content/projects/types'

export const near: Project = {
  slug: 'near',
  title: 'NEAR',
  summary:
    'A government-facing platform for accessing archival records in Taiwan.',
  description:
    "Implemented nearly all front-end pages based on design specifications, including the homepage's interactive word cloud visualisation and a multi-level hierarchical selector for browsing agencies. Supported multilingual content, secure form interactions, and integrated Google Maps for location-based features.",
  category: ['Frontend'],
  role: 'Frontend Developer',
  year: '2023',
  status: 'Production',
  techStack: ['Vue', 'SCSS', 'i18n', 'reCAPTCHA', 'Google Maps API'],
  tags: ['Government', 'Data Visualization'],
  image: '/projects/near/cover.png',
  links: {
    caseStudy: '/projects/near',
  },
  contributions: [
    'Built an interactive word cloud on the homepage enabling exploratory browsing of archive topics.',
    'Implemented a multi-level hierarchical agency selector for navigating government organisation structures.',
    'Delivered full-page implementations from Figma designs across the entire front-end.',
    'Integrated Vue i18n for full Traditional Chinese / English language support.',
    'Set up Google Maps API for location-based archival record discovery.',
  ],
  features: [
    'Interactive word cloud for exploring archive subject matter',
    'Multi-level government agency hierarchy browser',
    'Full bilingual support (Traditional Chinese / English)',
    'Google Maps integration for location-based record lookup',
    'reCAPTCHA-protected secure form submissions',
  ],
  challenges:
    'Rendering a performant, interactive word cloud and a hierarchical menu displaying thousands of file-related keywords which required custom weight normalisation and responsive canvas sizing.',
}
