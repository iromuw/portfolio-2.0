import type { ProjectStatus } from '~/content/projects/types'

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Featured: 'border-amber-400/40 bg-amber-400/10 text-amber-400',
  Production: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  Design: 'border-violet-400/40 bg-violet-400/10 text-violet-400',
  Academic: 'border-sky-400/40 bg-sky-400/10 text-sky-400',
}

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}
