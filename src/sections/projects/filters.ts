import type { Project } from '~/content/projects/types'

// ── Filter shape ─────────────────────────────────────────────────────────────

export type FilterKey = 'role' | 'type' | 'domain' | 'tech'
export type FilterState = Record<FilterKey, string[]>

export const INITIAL_FILTERS: FilterState = {
  role: [],
  type: [],
  domain: [],
  tech: [],
}

export interface FilterGroup {
  key: FilterKey
  label: string
  options: string[]
}

export const FILTER_GROUPS: FilterGroup[] = [
  {
    key: 'role',
    label: 'Role',
    options: ['Frontend', 'Full-stack', 'UI/UX'],
  },
  {
    key: 'type',
    label: 'Type',
    options: ['Production', 'Case Study', 'Design', 'Academic'],
  },
  {
    key: 'domain',
    label: 'Domain',
    options: ['Government', 'AI', 'Workflow', 'Community', 'Data Visualization'],
  },
  {
    key: 'tech',
    label: 'Tech',
    options: [
      'React / React Native',
      'Vue',
      'TypeScript',
      'Tailwind',
      'FastAPI / Node.js',
      'PostgreSQL',
      'Figma',
    ],
  },
]

// ── Tech filter → techStack term mapping ─────────────────────────────────────

const TECH_MAP: Record<string, string[]> = {
  'React / React Native': ['react', 'react native', 'expo'],
  Vue: ['vue'],
  TypeScript: ['typescript'],
  Tailwind: ['tailwind'],
  'FastAPI / Node.js': ['fastapi', 'node.js', 'node'],
  PostgreSQL: ['postgresql'],
  Figma: ['figma'],
}

// ── Filter matching (AND between groups, OR within each group) ────────────────

export function matchesFilters(project: Project, filters: FilterState): boolean {
  if (
    filters.role.length > 0 &&
    !filters.role.some((r) => project.category.includes(r))
  ) {
    return false
  }

  if (filters.type.length > 0) {
    const typeMatch = filters.type.some((t) => {
      if (t === 'Case Study') return !!project.links.caseStudy
      return project.status === t
    })
    if (!typeMatch) return false
  }

  if (
    filters.domain.length > 0 &&
    !filters.domain.some((d) => project.tags.includes(d))
  ) {
    return false
  }

  if (filters.tech.length > 0) {
    const techMatch = filters.tech.some((filterTech) => {
      const terms = TECH_MAP[filterTech] ?? [filterTech.toLowerCase()]
      return terms.some((term) =>
        project.techStack.some((t) => t.toLowerCase().includes(term)),
      )
    })
    if (!techMatch) return false
  }

  return true
}
