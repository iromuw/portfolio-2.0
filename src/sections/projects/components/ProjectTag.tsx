interface ProjectTagProps {
  label: string
}

export default function ProjectTag({ label }: ProjectTagProps) {
  return (
    <span className="rounded border border-[#314158] px-2 py-0.5 font-mono text-[10px] text-slate-400">
      {label}
    </span>
  )
}
