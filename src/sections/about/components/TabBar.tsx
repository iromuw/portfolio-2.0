import { X } from 'lucide-react'

interface TabBarProps {
  activeFile: string
  onClose: () => void
}

export default function TabBar({ activeFile, onClose }: TabBarProps) {
  const displayName = activeFile.split('/').pop() ?? activeFile

  return (
    <div className="flex shrink-0 border-b border-[#314158]">
      <div className="flex items-center gap-2 border-r border-[#314158] px-4 py-2">
        <span className="font-mono text-xs text-slate-300">{displayName}</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-0.5 text-slate-600 transition hover:text-slate-300"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  )
}
