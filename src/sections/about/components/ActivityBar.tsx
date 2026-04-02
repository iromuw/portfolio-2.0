import { User, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SectionId } from '@/sections/about/types'

const SECTIONS: { id: SectionId; Icon: LucideIcon }[] = [
  { id: 'personal-info', Icon: User },
  { id: 'professional-info', Icon: Briefcase },
]

interface ActivityBarProps {
  activeSection: SectionId
  onChange: (section: SectionId) => void
}

export default function ActivityBar({ activeSection, onChange }: ActivityBarProps) {
  return (
    <aside className="hidden w-[var(--activity-bar-width)] shrink-0 flex-col items-center gap-2 border-r border-[#314158] py-4 md:flex">
      {SECTIONS.map(({ id, Icon }) => (
        <button
          key={id}
          type="button"
          title={id}
          onClick={() => onChange(id)}
          className={[
            'flex h-9 w-9 items-center justify-center rounded transition',
            activeSection === id
              ? 'text-slate-200'
              : 'text-slate-600 hover:text-slate-400',
          ].join(' ')}
        >
          <Icon size={18} />
        </button>
      ))}
    </aside>
  )
}
