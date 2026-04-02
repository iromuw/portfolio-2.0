import { useState, useMemo, useEffect, useCallback, memo } from 'react'
import { X } from 'lucide-react'
import type { Project } from '~/content/projects/types'
import { matchesFilters, INITIAL_FILTERS, type FilterState } from '@/sections/projects/filters'
import FilterPanel from './components/FilterPanel'
import MobileFilterDropdown from './components/MobileFilterDropdown'
import FeaturedProjectCard from './components/FeaturedProjectCard'
import ProjectGrid from './components/ProjectGrid'
import ProjectDetailPanel from './components/ProjectDetailPanel'

interface ProjectsSectionProps {
  projects: Project[]
}

// ── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar({ filters, onClear }: { filters: FilterState; onClear: () => void }) {
  const activeValues = Object.values(filters).flat()
  const label = activeValues.length > 0 ? activeValues.join('; ') : 'all-projects'

  return (
    <div className="flex shrink-0 border-b border-[#314158]">
      <div className="flex items-center gap-2 border-r border-[#314158] px-4 py-2">
        <span className="font-mono text-xs text-slate-300">{label}</span>
        {activeValues.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded p-0.5 text-slate-600 transition hover:text-slate-300"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Stable workspace content ──────────────────────────────────────────────────
// Isolated in its own memo boundary so it never re-renders when panel state
// changes. This prevents React from touching any workspace DOM nodes during
// panel open/close, which eliminates CSS-transition re-triggers on the cards.

interface WorkspaceContentProps {
  filtered: Project[]
  featuredProject: Project | undefined
  gridProjects: Project[]
  onSelect: (project: Project) => void
}

const WorkspaceContent = memo(function WorkspaceContent({
  filtered,
  featuredProject,
  gridProjects,
  onSelect,
}: WorkspaceContentProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {filtered.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="font-mono text-xs text-slate-700">
            {'// no projects match the selected filters'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-6">
          {featuredProject && (
            <FeaturedProjectCard project={featuredProject} onSelect={onSelect} />
          )}
          <ProjectGrid projects={gridProjects} onSelect={onSelect} />
        </div>
      )}
    </div>
  )
})

// ── Main section ─────────────────────────────────────────────────────────────

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  // panelProject holds the last-set project so it stays rendered during slide-out
  const [panelProject, setPanelProject] = useState<Project | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilters(p, filters)),
    [projects, filters],
  )

  // useMemo ensures stable references so WorkspaceContent's memo is not defeated
  // by new array/object references on every panel-state re-render
  const featuredProject = useMemo(
    () => filtered.find((p) => p.featured),
    [filtered],
  )
  const gridProjects = useMemo(
    () => filtered.filter((p) => !p.featured),
    [filtered],
  )

  // Open or switch panel without closing/reopening
  const handleSelect = useCallback((project: Project) => {
    setPanelProject(project)
    setIsPanelOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsPanelOpen(false)
  }, [])

  // Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isPanelOpen, handleClose])

  return (
    // Outer wrapper is the single positioning context + overflow-hidden clips
    // the panel during slide-in. Workspace and overlay are direct children
    // (siblings), so the overlay never wraps or shares a stacking context with
    // the workspace content.
    <div className="relative flex min-h-0 flex-1 overflow-hidden">

      {/* ── Stable workspace — unaffected by panel state ─────────────────── */}
      <FilterPanel filters={filters} onChange={setFilters} />
      <div className="flex min-h-0 flex-1 flex-col">
        <MobileFilterDropdown filters={filters} onChange={setFilters} />
        <div className="hidden md:block">
          <TabBar filters={filters} onClear={() => setFilters(INITIAL_FILTERS)} />
        </div>
        <WorkspaceContent
          filtered={filtered}
          featuredProject={featuredProject}
          gridProjects={gridProjects}
          onSelect={handleSelect}
        />
      </div>

      {/* ── Overlay layer — completely isolated from workspace DOM ────────── */}

      {/* Backdrop: dims workspace when panel is open; click to close */}
      <div
        className={[
          'absolute inset-0 z-10 bg-[#020618]/50 transition-opacity duration-200',
          isPanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={handleClose}
        aria-hidden
      />

      {/* Detail panel — slides in from the right */}
      <div
        className={[
          'absolute inset-y-0 right-0 z-20 w-full sm:w-[460px] md:w-[500px]',
          'transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          isPanelOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {panelProject && (
          <ProjectDetailPanel
            project={panelProject}
            onClose={handleClose}
          />
        )}
      </div>

    </div>
  )
}
