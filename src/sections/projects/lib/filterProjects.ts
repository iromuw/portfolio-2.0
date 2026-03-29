import type { Project } from '@/sections/projects/data/types'

/**
 * Returns projects that include ANY of the selected tags.
 * If selectedTags is empty, all projects are returned.
 */
export function filterProjects(projects: Project[], selectedTags: string[]): Project[] {
  if (selectedTags.length === 0) return projects
  return projects.filter((p) => selectedTags.some((tag) => p.tags.includes(tag)))
}
