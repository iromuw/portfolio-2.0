/** Count lines by counting Shiki's per-line span wrappers. */
function countLines(html: string): number {
  return (html.match(/class="line"/g) ?? []).length || 1
}

interface ContentPanelProps {
  contentHtml: string
  isMarkdown?: boolean
}

export default function ContentPanel({ contentHtml, isMarkdown }: ContentPanelProps) {
  // ── Markdown / prose rendering ────────────────────────────────────────────
  if (isMarkdown) {
    return (
      <section className="flex min-h-0 flex-1 overflow-y-auto">
        <div
          className="hl-prose w-full max-w-[68ch] px-6 py-6"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>
    )
  }

  // ── Code / Shiki rendering ────────────────────────────────────────────────
  const lineCount = countLines(contentHtml)

  return (
    <section className="flex min-h-0 flex-1 overflow-y-auto">
      <div className="flex min-w-0 flex-1">
        {/* Line numbers — desktop only; wrapped lines break the 1:1 alignment */}
        <div className="hidden select-none px-3 py-4 text-right font-mono text-xs leading-normal text-slate-600 md:block">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div
          className="hl-content min-w-0 flex-1 py-4 pl-2 md:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </section>
  )
}
