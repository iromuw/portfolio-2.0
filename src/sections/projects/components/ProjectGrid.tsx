import { memo } from 'react'
import type { Project } from '~/content/projects/types'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  onSelect: (project: Project) => void
}

function ProjectGrid({ projects, onSelect }: ProjectGridProps) {
  if (projects.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default memo(ProjectGrid)
