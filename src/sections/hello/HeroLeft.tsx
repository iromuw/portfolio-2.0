import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Download, FolderOpen } from 'lucide-react'

export default function HeroLeft() {
  const { t } = useTranslation('common')
  return (
    <section className="space-y-8">

      {/* Identity: Name → Role */}
      <div className="space-y-2">
        <p className="font-mono text-sm text-slate-500">{t('hello.greeting')}</p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-100 md:text-6xl">
          Mori Wu
        </h1>
        <p className="flex items-center gap-2 font-mono text-xl text-indigo-400">
          <span>{'>'}</span>
          {t('hello.role')}
        </p>
      </div>

      {/* Social proof */}
      <div className="space-y-2 font-mono text-sm leading-relaxed">
        <div className="text-slate-500">{t('hello.valueHint')}</div>
        <div className="text-slate-500">{t('hello.findMeOnline')}</div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-indigo-400">const</span>
          <span className="text-teal-400">githubLink</span>
          <span className="text-slate-400">=</span>
          <a
            className="text-rose-300 underline decoration-rose-300/70 underline-offset-4 hover:text-rose-300/70"
            href="https://github.com/iromuw"
            target="_blank"
            rel="noreferrer"
          >
            &quot;https://github.com/iromuw&quot;
          </a>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded border border-teal-500/50 bg-teal-500/[0.08] px-4 py-2 font-mono text-sm text-teal-400 transition-all duration-300 hover:border-teal-400/70 hover:bg-teal-500/[0.14] hover:shadow-[0_0_16px_rgba(64,224,208,0.20)]"
        >
          <FolderOpen size={14} />
          view-projects
        </Link>
        <a
          href="/cv.pdf"
          download
          className="flex items-center gap-2 rounded border border-[#314158] px-4 py-2 font-mono text-sm text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
        >
          <Download size={14} />
          download-cv
        </a>
      </div>
    </section>
  )
}
