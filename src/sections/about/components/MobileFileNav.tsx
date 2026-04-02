import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type {
  HighlightedAboutData,
  HighlightedFolderNode,
  SectionId,
} from '@/sections/about/types'

interface MobileFileNavProps {
  data: HighlightedAboutData
  activeSection: SectionId
  activeFile: string
  onSelect: (sectionId: SectionId, fileId: string) => void
}

export default function MobileFileNav({
  data,
  activeSection,
  activeFile,
  onSelect,
}: MobileFileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Derive the breadcrumb shown in the collapsed header.
  // Nested file  → "folderName / > fileName"
  // Root file    → "sectionId / > fileName"
  const segments = activeFile.split('/')
  const parentLabel = segments.length > 1 ? segments[0] : activeSection
  const fileLabel = segments[segments.length - 1]

  const handleSelect = (sectionId: SectionId, fileId: string) => {
    onSelect(sectionId, fileId)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* ── Collapsed header ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between border-b border-[#314158] bg-[#0f172b]/40 px-4 py-2.5 font-mono text-xs transition hover:bg-white/[0.03]"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 text-slate-500">{parentLabel}</span>
          <span className="shrink-0 text-slate-600">/</span>
          <span className="truncate text-teal-400">{'> '}{fileLabel}</span>
        </span>
        <ChevronDown
          size={12}
          className={[
            'ml-3 shrink-0 text-slate-500 transition-transform duration-200',
            isOpen ? '-rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {/* ── Inline expandable tree ─────────────────────────────────────────── */}
      {/* Uses max-h transition instead of absolute positioning so it works
          correctly inside the parent's overflow-hidden flex column.           */}
      <div
        className={[
          'overflow-hidden border-b border-[#314158] transition-all duration-200',
          isOpen ? 'max-h-[50vh]' : 'max-h-0',
        ].join(' ')}
      >
        <div className="overflow-y-auto bg-[#080f1c]">
          {(['personal-info', 'professional-info'] as SectionId[]).map((sectionId) => {
            const section = data[sectionId]
            return (
              <div key={sectionId} className="py-1">
                {/* Section group label */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-slate-600">
                  <ChevronDown size={10} className="shrink-0" />
                  {sectionId}
                </div>

                <div className="space-y-0.5 px-2 pb-1">
                  {Object.entries(section.items).map(([name, node]) => {
                    // ── Root file ────────────────────────────────────────────
                    if (node.type === 'file') {
                      const isActive = sectionId === activeSection && activeFile === name
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => handleSelect(sectionId, name)}
                          className={[
                            'flex w-full items-center gap-2 rounded pl-6 pr-2 py-1.5 text-left font-mono text-xs transition',
                            isActive ? 'bg-white/5 text-slate-200' : 'text-slate-500',
                          ].join(' ')}
                        >
                          <span className={`h-2 w-2 shrink-0 rounded-sm ${node.iconColor}`} />
                          {'> '}{name}
                        </button>
                      )
                    }

                    // ── Folder ───────────────────────────────────────────────
                    const folder = node as HighlightedFolderNode
                    return (
                      <div key={name}>
                        <div className="flex items-center gap-1.5 pl-5 pr-2 py-1.5 font-mono text-xs text-slate-500">
                          <ChevronRight size={10} className="shrink-0" />
                          <span className={`h-2 w-2 shrink-0 rounded-sm ${folder.iconColor}`} />
                          {name}
                        </div>

                        <div className="space-y-0.5 pl-4">
                          {Object.entries(folder.children).map(([childName, child]) => {
                            const fileId = `${name}/${childName}`
                            const isActive = sectionId === activeSection && activeFile === fileId
                            return (
                              <button
                                key={childName}
                                type="button"
                                onClick={() => handleSelect(sectionId, fileId)}
                                className={[
                                  'flex w-full items-center gap-2 rounded pl-6 pr-2 py-1.5 text-left font-mono text-xs transition',
                                  isActive ? 'bg-white/5 text-slate-200' : 'text-slate-500',
                                ].join(' ')}
                              >
                                <span className={`h-2 w-2 shrink-0 rounded-sm ${child.iconColor}`} />
                                {'> '}{childName}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
