import type { Project } from '~/content/projects/types'

export const online: Project = {
  slug: 'online',
  title: 'ONLINE',
  summary:
    'An internal platform that digitises and streamlines government document workflows.',
  description:
    'Participated across the full development lifecycle, from requirements analysis and UI/UX design to front-end implementation. Built features such as document submission, approval flows, and role-based permission systems. Replaced traditional paper-based processes with a centralised digital solution.',
  category: ['Full-stack', 'Frontend'],
  role: 'Frontend Developer',
  year: '2023',
  status: 'Production',
  techStack: ['Vue', 'SCSS', 'Moment.js', 'Chartist.js', 'SpreadJS'],
  tags: ['Government', 'Workflow System'],
  image: '/projects/online/cover.png',
  links: {
    caseStudy: '/projects/online',
  },
  contributions: [
    'Participated in requirements analysis workshops and translated business rules into UI/UX flows.',
    'Built multi-step document submission and approval workflow interfaces.',
    'Implemented role-based permission systems controlling feature visibility per user type.',
    'Developed analytics dashboards using Chartist.js for workflow KPI monitoring.',
    'Integrated SpreadJS for in-browser spreadsheet-style data entry and review.',
  ],
  features: [
    'Multi-step document submission with validation and draft saving',
    'Configurable approval flow engine with notification support',
    'Role-based access control across all modules',
    'Analytics dashboards for workflow performance monitoring',
    'Spreadsheet-style data management interface via SpreadJS',
  ],
  challenges:
    'Translating complex government approval rules, which often involved branching conditions and multi-party sign-offs, into a UI that remained intuitive for non-technical civil service users while maintaining compliance and auditability.',
}
