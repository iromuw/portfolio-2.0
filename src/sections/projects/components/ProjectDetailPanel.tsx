import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ArrowRight, Github, ExternalLink } from 'lucide-react'
import type { Project } from '~/content/projects/types'
import StatusBadge from './StatusBadge'
import ProjectTag from './ProjectTag'

// ── Small section header ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 font-mono text-[10px] uppercase tracking-widest text-slate-600">
      {children}
    </p>
  )
}

// ── Detail grid row ─────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-20 shrink-0 font-mono text-[10px] text-slate-600">{label}</span>
      <span className="font-mono text-xs text-slate-300">{value}</span>
    </div>
  )
}

// ── Main panel ─────────────────────────────────────────────────────────────

interface ProjectDetailPanelProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // When project changes (panel stays mounted): reset scroll and re-focus close button.
  // preventScroll avoids the browser scrolling ancestor containers to reveal the button.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    closeButtonRef.current?.focus({ preventScroll: true })
  }, [project.slug])

  return (
    <div className="flex h-full flex-col border-l border-[#314158] bg-[#0c1526] shadow-[-12px_0_40px_rgba(0,0,0,0.55)]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#314158] p-5">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[10px] text-slate-600">{project.year}</span>
          </div>
          <h2 className="truncate font-mono text-sm font-semibold text-slate-100">
            {project.title}
          </h2>
          <p className="mt-0.5 font-mono text-[10px] text-slate-500">{project.role}</p>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="mt-0.5 shrink-0 rounded p-1 text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-500"
          aria-label="Close panel"
        >
          <X size={15} />
        </button>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-5">

          {/* Cover image */}
          {project.image && (
            <div className="relative h-44 overflow-hidden rounded-lg bg-[#060d1c]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          )}

          {/* Overview */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <p className="font-mono text-xs leading-relaxed text-slate-400">
              {project.description}
            </p>
          </section>

          {/* Details */}
          <section>
            <SectionLabel>Details</SectionLabel>
            <div className="space-y-1.5">
              <DetailRow label="Role" value={project.role} />
              <DetailRow label="Year" value={project.year} />
              <DetailRow label="Category" value={project.category.join(', ')} />
              <DetailRow label="Status" value={project.status} />
            </div>
          </section>

          {/* Tech stack */}
          <section>
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <ProjectTag key={tech} label={tech} size="md" />
              ))}
            </div>
          </section>

          {/* Key contributions */}
          {project.contributions && project.contributions.length > 0 && (
            <section>
              <SectionLabel>Key Contributions</SectionLabel>
              <ul className="space-y-2">
                {project.contributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-[10px] text-teal-500">{'>'}</span>
                    <span className="font-mono text-xs leading-relaxed text-slate-400">{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <SectionLabel>Features</SectionLabel>
              <ul className="space-y-1.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-[10px] text-slate-600">—</span>
                    <span className="font-mono text-xs leading-relaxed text-slate-400">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && (
            <section>
              <SectionLabel>Challenge</SectionLabel>
              <p className="font-mono text-xs leading-relaxed text-slate-400">
                {project.challenges}
              </p>
            </section>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <section>
              <SectionLabel>Tags</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#314158] px-2 py-0.5 font-mono text-[10px] text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links - Hidden until completed */} 
          {/* {(project.links.caseStudy || project.links.github || project.links.liveDemo) && (
            <section className="flex flex-wrap gap-2 pb-2">
              {project.links.caseStudy && (
                <a
                  href={project.links.caseStudy}
                  className="flex items-center gap-1.5 rounded border border-[#40E0D0]/35 bg-[#40E0D0]/[0.08] px-4 py-1.5 font-mono text-xs text-[#40E0D0] transition-all duration-200 hover:bg-[#40E0D0]/[0.15] hover:border-[#40E0D0]/60"
                >
                  Case Study
                  <ArrowRight size={11} />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded border border-[#314158] px-4 py-1.5 font-mono text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
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
                  className="flex items-center gap-1.5 rounded border border-[#314158] px-4 py-1.5 font-mono text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
                >
                  <ExternalLink size={11} />
                  Live Demo
                </a>
              )}
            </section>
          )} */}

        </div>
      </div>
    </div>
  )
}
