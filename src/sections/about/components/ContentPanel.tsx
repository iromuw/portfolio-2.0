/** Count lines by counting Shiki's per-line span wrappers. */
function countLines(html: string): number {
  return (html.match(/class="line"/g) ?? []).length || 1
}

interface ContentPanelProps {
  contentHtml: string
}

export default function ContentPanel({ contentHtml }: ContentPanelProps) {
  const lineCount = countLines(contentHtml)

  return (
    <section className="flex min-h-0 flex-1 overflow-y-auto">
      <div className="flex min-w-0 flex-1">
        {/* Line numbers — must match Shiki line-height exactly */}
        <div className="select-none px-3 py-4 text-right font-mono text-xs leading-normal text-slate-600">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Shiki-highlighted content */}
        <div
          className="hl-content flex-1 overflow-x-auto py-4 pl-2"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </section>
  )
}
