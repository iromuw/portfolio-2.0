import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import {
  FILTER_GROUPS,
  INITIAL_FILTERS,
  type FilterKey,
  type FilterState,
} from '@/sections/projects/filters'

interface FilterPanelProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

function FilterGroupSection({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="border-b border-[#314158]/60">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-1.5 px-3 py-2 text-left transition hover:bg-white/[0.03]"
      >
        {collapsed
          ? <ChevronRight size={10} className="shrink-0 text-slate-600" />
          : <ChevronDown size={10} className="shrink-0 text-slate-600" />}
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
          {label}
        </span>
        {selected.length > 0 && (
          <span className="ml-auto font-mono text-[10px] text-teal-500">
            {selected.length}
          </span>
        )}
      </button>

      {!collapsed && (
        <div className="space-y-0.5 px-2 pb-2">
          {options.map((option) => {
            const checked = selected.includes(option)
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 font-mono text-xs transition hover:bg-white/[0.04]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option)}
                  className="h-3 w-3 shrink-0 accent-teal-400"
                />
                <span className={checked ? 'text-slate-200' : 'text-slate-500'}>
                  {option}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const totalActive = Object.values(filters).flat().length

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
    <aside className="flex w-[var(--left-shell-width)] shrink-0 flex-col overflow-y-auto border-r border-[#314158]">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#314158] px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <ChevronDown size={12} className="shrink-0 text-slate-500" />
          <span className="font-mono text-xs text-slate-400">filters</span>
        </div>
        {totalActive > 0 && (
          <button
            type="button"
            onClick={() => onChange(INITIAL_FILTERS)}
            className="flex items-center gap-1 font-mono text-[10px] text-slate-600 transition hover:text-slate-400"
          >
            <X size={10} />
            clear {totalActive}
          </button>
        )}
      </div>

      {/* Filter groups */}
      {FILTER_GROUPS.map((group) => (
        <FilterGroupSection
          key={group.key}
          label={group.label}
          options={group.options}
          selected={filters[group.key]}
          onToggle={(value) => toggle(group.key, value)}
        />
      ))}
    </aside>
  )
}
