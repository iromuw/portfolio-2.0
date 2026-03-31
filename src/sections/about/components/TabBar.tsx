import { X } from 'lucide-react'

interface TabBarProps {
  activeFile: string
}

export default function TabBar({ activeFile }: TabBarProps) {
  const displayName = activeFile.split('/').pop() ?? activeFile

  return (
    <div className="flex shrink-0 border-b border-[#314158]">
      <div className="flex items-center gap-2 border-r border-[#314158] px-4 py-2">
        <span className="font-mono text-xs text-slate-300">{displayName}</span>
        <div className="rounded p-0.5 text-slate-600">
          <X size={12} />
        </div>
      </div>
    </div>
  )
}
