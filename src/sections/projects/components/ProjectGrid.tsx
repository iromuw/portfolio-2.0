import { useTranslation } from 'next-i18next'
import type { Project } from '@/sections/projects/data/types'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { t } = useTranslation('common')

  if (projects.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="font-mono text-xs text-slate-600">{t('projects.noResults')}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
