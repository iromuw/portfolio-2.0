import type { Project } from '~/content/projects/types'

export const near: Project = {
  slug: 'near',
  title: 'NEAR',
  summary:
    'A government-facing platform for accessing archival records in Taiwan.',
  description:
    'Took over static HTML deliverables from an external design agency and integrated them into a Vue architecture, translating pixel-perfect layouts into dynamic, interactive pages. Responsible for nearly 90% of all front-end implementation, including custom interactive components built without interaction specifications.',
  category: ['Frontend'],
  role: 'Frontend Developer',
  year: '2021',
  status: 'Production',
  techStack: ['Vue', 'SCSS', 'i18n', 'reCAPTCHA', 'Google Maps API'],
  tags: ['Government', 'Data Visualization'],
  image: '/projects/near/cover.png',
  links: {
    liveDemo: 'https://near.archives.gov.tw/home',
  },
  contributions: [
    'Delivered nearly 90% of all front-end implementation independently, integrating static agency-designed HTML into a fully dynamic Vue architecture.',
    'Designed and built an interactive word cloud from scratch with no interaction spec, interpreting static visuals into a functional exploratory browsing experience for archive topics.',
    'Implemented a multi-level hierarchical agency selector for navigating complex government organisation structures, self-directed from layout to interaction logic.',
    'Integrated Vue i18n for full Traditional Chinese and English language support across all pages.',
    'Set up Google Maps API for location-based archival record discovery and reCAPTCHA for secure form submissions.',
  ],
  features: [
    'Interactive word cloud for exploring archive subject matter',
    'Multi-level government agency hierarchy browser',
    'Full bilingual support (Traditional Chinese / English)',
    'Google Maps integration for location-based record lookup',
    'reCAPTCHA-protected secure form submissions',
  ],
  challenges:
    'Translating static agency-designed mockups into dynamic interactions without any interaction specifications, requiring independent judgement on behaviour, animation, and state management while preserving the original visual design intent.',
}