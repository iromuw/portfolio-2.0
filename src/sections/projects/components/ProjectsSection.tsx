import { useState, useMemo } from 'react'
import type { Project } from '@/sections/projects/data/types'
import { filterProjects } from '@/sections/projects/lib/filterProjects'
import ProjectFilters from './ProjectFilters'
import ProjectTabBar from './ProjectTabBar'
import ProjectGrid from './ProjectGrid'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const availableTags = useMemo(() => {
    const seen = new Set<string>()
    for (const project of projects) {
      for (const tag of project.tags) seen.add(tag)
    }
    return Array.from(seen)
  }, [projects])

  const filtered = useMemo(
    () => filterProjects(projects, selectedTags),
    [projects, selectedTags],
  )

  return (
    <div className="flex min-h-0 flex-1">
      <ProjectFilters
        availableTags={availableTags}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
      />
      <div className="flex min-h-0 flex-1 flex-col">
        <ProjectTabBar selectedTags={selectedTags} onClear={() => setSelectedTags([])} />
        <div className="flex-1 overflow-y-auto">
          <ProjectGrid projects={filtered} />
        </div>
      </div>
    </div>
  )
}
