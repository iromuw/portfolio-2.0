import type { Project } from '~/content/projects/types'

export const online: Project = {
  slug: 'online',
  title: 'ONLINE',
  summary:
    'An internal platform that digitises and streamlines government document workflows.',
  description:
    'Participated across the full development lifecycle of a national government records management system, from requirements gathering to front-end implementation. Served as the bridge between civil service stakeholders and the engineering team, translating domain-specific requirements into actionable UI/UX decisions. The platform replaced paper-based archival workflows across government agencies, digitising an estimated 80 to 90 percent of previously manual processes.',
  category: ['Frontend'],
  role: 'Frontend Developer',
  year: '2022',
  status: 'Production',
  techStack: ['Vue', 'SCSS', 'Moment.js', 'Chartist.js', 'SpreadJS'],
  tags: ['Government', 'Workflow System'],
  image: '/projects/online/cover.png',
  links: {
    caseStudy: '/projects/online',
  },
  contributions: [
    'Acted as the key communication bridge in requirements workshops, often the only team member able to accurately interpret stakeholder intent despite having no prior domain knowledge in government records management.',
    'Translated complex business rules and approval workflows into UI/UX flows, then implemented them directly as front-end interfaces.',
    'Built multi-step document submission and approval workflow interfaces serving government agencies across Taiwan.',
    'Implemented role-based permission systems controlling feature visibility per user type.',
    'Developed analytics dashboards using Chartist.js for workflow KPI monitoring and integrated SpreadJS for in-browser spreadsheet-style data entry.',
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