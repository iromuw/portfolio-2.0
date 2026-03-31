import { memo } from 'react'
import Image from 'next/image'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import type { Project } from '~/content/projects/types'
import StatusBadge from './StatusBadge'
import ProjectTag from './ProjectTag'

interface FeaturedProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

function FeaturedProjectCard({ project, onSelect }: FeaturedProjectCardProps) {
  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-xl border border-[#314158] bg-gradient-to-br from-[#0e1c36]/80 to-[#0b1225] transition-[border-color,box-shadow] duration-200 hover:border-slate-600 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(project) }}
    >
      <div className="grid md:grid-cols-[1fr_380px]">

        {/* Image */}
        <div className="relative min-h-[200px] overflow-hidden bg-[#060d1c] md:min-h-[280px]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full min-h-[200px] items-end bg-gradient-to-br from-[#111e38] to-[#060d1c] p-6 md:min-h-[280px]">
              <p className="font-mono text-xs text-slate-700">{'// cover coming soon'}</p>
            </div>
          )}
          <div className="absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-black/25 via-black/10 to-transparent md:block" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3.5 border-t border-[#314158] p-6 md:border-l md:border-t-0 md:p-7">

          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[10px] text-slate-600">{project.year}</span>
          </div>

          <div>
            <h2 className="font-mono text-lg font-semibold tracking-tight text-slate-100 group-hover:text-white">
              {project.title}
            </h2>
            <p className="mt-0.5 font-mono text-xs text-slate-500">{project.role}</p>
          </div>

          <p className="flex-1 font-mono text-xs leading-relaxed text-slate-400">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <ProjectTag key={tech} label={tech} size="md" />
            ))}
          </div>

          {/* CTAs — external links stop propagation so they don't open the panel */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="flex items-center gap-1 font-mono text-xs text-slate-600 transition-colors group-hover:text-teal-500/70">
              <ArrowRight size={11} />
              open details
            </span>
            <div className="ml-auto flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded border border-[#314158] px-3 py-1.5 font-mono text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
                >
                  <Github size={11} />
                  GitHub
                </a>
              )}
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 rounded border border-[#314158] px-3 py-1.5 font-mono text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
                >
                  <ExternalLink size={11} />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(FeaturedProjectCard)
