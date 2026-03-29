import type { HighlightedSnippet } from '@/sections/about/types'
import SnippetCard from './SnippetCard'

interface SummaryPanelProps {
  snippets: HighlightedSnippet[]
}

export default function SummaryPanel({ snippets }: SummaryPanelProps) {
  return (
    <aside className="flex w-[480px] flex-shrink-0 shrink-0 flex-col gap-4 overflow-y-auto border-l border-[#314158] p-4">
      {snippets.length > 0 ? (
        snippets.map((snippet, i) => <SnippetCard key={i} snippet={snippet} />)
      ) : (
        <p className="font-mono text-xs text-slate-700">{'// no snippets'}</p>
      )}
    </aside>
  )
}
