import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Project, CaseStudySection } from '~/content/projects/types'
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

// ── Case study section renderer ─────────────────────────────────────────────

function CaseStudySectionBlock({ section }: { section: CaseStudySection }) {
  if (section.type === 'text') {
    return (
      <section className="space-y-3">
        {section.title && (
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
            {section.title}
          </h3>
        )}
        {section.content && (
          <p className="font-mono text-sm leading-relaxed text-slate-400">{section.content}</p>
        )}
      </section>
    )
  }

  if (section.type === 'image') {
    return (
      <section className="space-y-3">
        {section.title && (
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
            {section.title}
          </h3>
        )}
        {section.content && (
          <p className="font-mono text-sm leading-relaxed text-slate-400">{section.content}</p>
        )}
        {section.image && (
          <div className="space-y-2">
            <div className="relative w-full overflow-hidden rounded-lg bg-[#0d1b2e]" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={section.image}
                alt={section.title ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
              />
            </div>
            {section.caption && (
              <p className="font-mono text-[10px] text-slate-600">{section.caption}</p>
            )}
          </div>
        )}
      </section>
    )
  }

  if (section.type === 'image-grid') {
    const cols = section.images && section.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
    return (
      <section className="space-y-3">
        {section.title && (
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
            {section.title}
          </h3>
        )}
        <div className={`grid gap-3 ${cols}`}>
          {section.images?.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg bg-[#0d1b2e]" style={{ paddingBottom: '177%' }}>
              <Image
                src={src}
                alt={`${section.title ?? 'image'} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 300px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (section.type === 'compare') {
    return (
      <section className="space-y-3">
        {section.title && (
          <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
            {section.title}
          </h3>
        )}
        {section.content && (
          <p className="font-mono text-sm leading-relaxed text-slate-400">{section.content}</p>
        )}
        {section.image && (
          <div className="relative w-full overflow-hidden rounded-lg bg-[#0d1b2e]" style={{ paddingBottom: '56.25%' }}>
            <Image
              src={section.image}
              alt={section.title ?? 'compare'}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain"
            />
          </div>
        )}
      </section>
    )
  }

  return null
}

// ── Case study layout ────────────────────────────────────────────────────────

function CaseStudyLayout({ project }: { project: Project }) {
  const cs = project.caseStudy!
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-6 py-8 md:px-10">
      {/* Cover image */}
      {project.image && (
        <div className="relative w-full overflow-hidden rounded-lg bg-[#0d1b2e]" style={{ paddingBottom: '56.25%' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
          />
        </div>
      )}

      {/* Overview */}
      <section className="space-y-3">
        <SectionLabel>Overview</SectionLabel>
        <p className="font-mono text-sm leading-relaxed text-slate-400">{cs.overview}</p>
      </section>

      {/* Details strip */}
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

      {/* Divider */}
      <div className="border-t border-[#314158]" />

      {/* Case study sections */}
      {cs.sections.map((section, i) => (
        <CaseStudySectionBlock key={i} section={section} />
      ))}
    </div>
  )
}

// ── Summary layout (existing content) ───────────────────────────────────────

function SummaryLayout({ project }: { project: Project }) {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8 md:px-10">

      {/* Cover image */}
      {project.image && (
        <div className="relative h-56 overflow-hidden rounded-lg bg-[#0c1526]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
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

  // When project changes: reset scroll and re-focus close button.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    closeButtonRef.current?.focus({ preventScroll: true })
  }, [project.slug])

  return (
    <div className="flex h-full flex-col bg-[#0c1526] shadow-[0_-12px_40px_rgba(0,0,0,0.55)]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#314158] px-5 py-4">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[10px] text-slate-600">{project.year}</span>
          </div>
          <h2 className="font-mono text-sm font-semibold text-slate-100">
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
        {project.caseStudy ? (
          <CaseStudyLayout project={project} />
        ) : (
          <SummaryLayout project={project} />
        )}
      </div>

    </div>
  )
}
