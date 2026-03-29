import Link from 'next/link'
import { Star } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import type { Project } from '@/sections/projects/data/types'
import { tagLabel } from '@/sections/projects/data/tags'
import ProjectTag from './ProjectTag'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation('common')

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#314158] bg-[#0f172b]/80 transition-all duration-200 hover:-translate-y-1 hover:border-slate-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden bg-[#020618]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0f172b] to-[#020618]">
            <span className="font-mono text-xs text-slate-700">{'// no preview'}</span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-2 top-2 flex items-center justify-center rounded bg-amber-400/20 p-1.5 backdrop-blur-sm">
            <Star size={12} className="fill-amber-400 text-amber-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-sm font-medium text-slate-200 group-hover:text-white">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-slate-600">{project.year}</span>
        </div>

        <p className="flex-1 font-mono text-xs leading-relaxed text-slate-500">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} label={tagLabel(tag)} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-1 flex items-center gap-1 font-mono text-xs text-slate-500 transition-colors duration-150 group-hover:text-teal-400">
          <span>{'>'}</span>
          <span>{t('projects.viewProject')}</span>
        </div>
      </div>
    </Link>
  )
}
