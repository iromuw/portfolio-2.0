import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import {
  FILTER_GROUPS,
  INITIAL_FILTERS,
  type FilterKey,
  type FilterState,
} from '@/sections/projects/filters'

interface MobileFilterDropdownProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export default function MobileFilterDropdown({ filters, onChange }: MobileFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeValues = Object.values(filters).flat()
  const activeCount = activeValues.length

  const toggle = (group: FilterKey, value: string) => {
    const current = filters[group]
    onChange({
      ...filters,
      [group]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    })
  }

  return (
    <div className="shrink-0 border-b border-[#314158] md:hidden">
      {/* ── Trigger ──────────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-2.5 font-mono text-xs transition hover:bg-white/[0.03]"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-slate-400">filters</span>
          {activeCount > 0 && (
            <>
              <span className="shrink-0 text-slate-600">·</span>
              <span className="truncate text-teal-400">{activeValues.join('; ')}</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); onChange(INITIAL_FILTERS) }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onChange(INITIAL_FILTERS) } }}
                className="shrink-0 text-slate-600 transition hover:text-slate-400"
                aria-label="Clear filters"
              >
                <X size={10} />
              </span>
            </>
          )}
        </span>
        <ChevronDown
          size={12}
          className={[
            'ml-3 shrink-0 text-slate-500 transition-transform duration-200',
            isOpen ? '-rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {/* ── Inline expandable filter groups ──────────────────────────────────── */}
      {/* Inline expansion avoids absolute-positioning issues inside
          the parent's overflow-hidden flex container.                          */}
      <div
        className={[
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-[50vh]' : 'max-h-0',
        ].join(' ')}
      >
        <div className="overflow-y-auto">
          {FILTER_GROUPS.map((group) => {
            const selected = filters[group.key]
            return (
              <div key={group.key} className="border-t border-[#314158]/60">
                {/* Group label */}
                <div className="flex items-center justify-between px-4 py-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {group.label}
                  </span>
                  {selected.length > 0 && (
                    <span className="font-mono text-[10px] text-teal-500">{selected.length}</span>
                  )}
                </div>
                {/* Option pills */}
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {group.options.map((option) => {
                    const active = selected.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggle(group.key, option)}
                        className={[
                          'rounded border px-2 py-0.5 font-mono text-xs transition',
                          active
                            ? 'border-teal-500/50 bg-teal-500/[0.12] text-teal-400'
                            : 'border-[#314158] text-slate-500 hover:border-slate-500 hover:text-slate-300',
                        ].join(' ')}
                      >
                        {option}
                      </button>
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
