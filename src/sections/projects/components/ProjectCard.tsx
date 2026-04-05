import { memo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '~/content/projects/types'
import StatusBadge from './StatusBadge'
import ProjectTag from './ProjectTag'
import { trackEvent } from '@/lib/analytics'
import { trackExternalLink } from '@/lib/trackExternalLink'
import { signalEngagement } from '@/lib/engagementSignal'

const MAX_VISIBLE_TAGS = 4

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const visibleTags = project.techStack.slice(0, MAX_VISIBLE_TAGS)
  const overflowCount = project.techStack.length - MAX_VISIBLE_TAGS

  const cardRef = useRef<HTMLElement>(null)
  const viewTracked = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewTracked.current) {
          viewTracked.current = true
          trackEvent('view_project_card', { project_name: project.title })
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [project.title])

  return (
    <article
      ref={cardRef}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-[#314158] bg-[#0b1225] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
      onClick={() => {
        trackEvent('click_project_card', { project_name: project.title })
        signalEngagement('project_clicked')
        onSelect(project)
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          trackEvent('click_project_card', { project_name: project.title })
          signalEngagement('project_clicked')
          onSelect(project)
        }
      }}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-[#060d1c]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04] group-hover:brightness-90"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-[#111e38] to-[#060d1c] p-3">
            <p className="font-mono text-[10px] text-slate-800">{'// no cover'}</p>
          </div>
        )}
        <div className="absolute right-2 top-2">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">

        {/* Title + meta */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-mono text-sm font-semibold text-slate-200 group-hover:text-white">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-[10px] text-slate-600">{project.year}</span>
          </div>
          <p className="font-mono text-[10px] text-slate-500">{project.role}</p>
        </div>

        {/* Summary */}
        <p className="line-clamp-2 flex-1 font-mono text-xs leading-relaxed text-slate-500">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap items-center gap-1">
          {visibleTags.map((tech) => (
            <ProjectTag key={tech} label={tech} />
          ))}
          {overflowCount > 0 && (
            <span className="font-mono text-[10px] text-slate-700">+{overflowCount}</span>
          )}
        </div>

        {/* CTA row — external links only; card click handles panel */}
        <div className="mt-auto flex items-center border-t border-[#1e2d44] pt-3">
          <span className="flex items-center gap-1 font-mono text-xs text-slate-600 transition-colors duration-150 group-hover:text-teal-500/70">
            {'// open details'}
          </span>
          <div className="ml-auto flex items-center gap-2.5">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.stopPropagation(); trackExternalLink('github', 'project_card', { project_name: project.title }) }}
                className="text-slate-600 transition hover:text-slate-300"
                aria-label="Github"
              >
                <Github size={13} />
              </a>
            )}
            {project.links.liveDemo && (
              <a
                href={project.links.liveDemo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => { e.stopPropagation(); trackExternalLink('live_demo', 'project_card', { project_name: project.title }) }}
                className="text-slate-600 transition hover:text-slate-300"
                aria-label="Live Demo"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(ProjectCard)
