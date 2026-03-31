interface ProjectTagProps {
  label: string
  size?: 'sm' | 'md'
}

export default function ProjectTag({ label, size = 'sm' }: ProjectTagProps) {
  if (size === 'md') {
    return (
      <span className="rounded border border-[#314158] bg-[#0f172b]/60 px-2 py-0.5 font-mono text-[10px] text-slate-400">
        {label}
      </span>
      
    )
  }
  return (
    <span className="rounded border border-[#2a3a52] px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
      {label}
    </span>
  )
}
