import type { HighlightedSnippet } from '@/sections/about/types'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

interface SnippetCardProps {
  snippet: HighlightedSnippet
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const { t } = useTranslation('common')
  
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs text-indigo-400">@{snippet.username}</span>
          <p className="font-mono text-xs text-slate-600">
            {t('about.createdAt')} {snippet.createdAt}
          </p>
        </div>
      </div>

      {/* Shiki-highlighted code */}
      <div className="rounded border border-[#314158] bg-[#020618]">
        <div
          className="hl-snippet"
          dangerouslySetInnerHTML={{ __html: snippet.html }}
        />
      </div>
    </div>
  )
}
