import type { ProjectStatus } from '~/content/projects/types'

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Featured:   'bg-amber-500   text-white',
  Production: 'bg-emerald-500 text-white',
  Academic:   'bg-blue-500    text-white',
  Design:     'bg-pink-500    text-white',
}

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`rounded text-[11px] font-semibold px-2.5 py-0.5 tracking-wide ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}
