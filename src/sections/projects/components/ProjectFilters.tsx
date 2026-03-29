import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { TAG_META } from '@/sections/projects/data/tags'

interface ProjectFiltersProps {
  availableTags: string[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export default function ProjectFilters({ availableTags, selectedTags, onChange }: ProjectFiltersProps) {
  const { t } = useTranslation('common')

  const toggle = (tag: string) => {
    onChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag],
    )
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col overflow-y-auto border-r border-[#314158]">
      {/* Header */}
      <div className="flex items-center gap-1 px-2 py-2">
        <ChevronDown size={12} className="shrink-0 text-slate-500" />
        <span className="font-mono text-xs text-slate-400">{t('projects.filterByTag')}</span>
      </div>

      {/* Checkboxes */}
      <div className="space-y-0.5 px-3 pb-4">
        {availableTags.map((tag) => {
          const meta = TAG_META[tag]
          const checked = selectedTags.includes(tag)
          return (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 font-mono text-xs transition hover:bg-white/5"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(tag)}
                className="h-3 w-3 shrink-0 accent-teal-400"
              />
              {/* Brand color dot */}
              <span className={`h-3.5 w-3.5 shrink-0 rounded-sm ${meta?.color ?? 'bg-slate-500'}`} />
              <span className={checked ? 'text-slate-200' : 'text-slate-500'}>
                {meta?.label ?? tag}
              </span>
            </label>
          )
        })}
      </div>
    </aside>
  )
}
