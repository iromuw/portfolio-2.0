import { X } from 'lucide-react'
import { tagLabel } from '@/sections/projects/data/tags'

interface ProjectTabBarProps {
  selectedTags: string[]
  onClear: () => void
}

export default function ProjectTabBar({ selectedTags, onClear }: ProjectTabBarProps) {
  if (selectedTags.length === 0) return null

  const label = selectedTags.map(tagLabel).join('; ')

  return (
    <div className="flex shrink-0 border-b border-[#314158]">
      <div className="flex items-center gap-2 border-r border-[#314158] px-4 py-2">
        <span className="font-mono text-xs text-slate-300">{label}</span>
        <button
          type="button"
          onClick={onClear}
          className="rounded p-0.5 text-slate-600 transition hover:text-slate-300"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}
