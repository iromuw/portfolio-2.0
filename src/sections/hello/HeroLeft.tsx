import { useTranslation } from 'next-i18next'

export default function HeroLeft() {
  const { t } = useTranslation('common')
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="font-mono text-sm text-slate-500">{t('hello.greeting')}</p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-200 md:text-6xl">
          Mori Wu
        </h1>
        <p className="flex items-center gap-2 font-mono text-xl text-indigo-400">
          <span>{'>'}</span>
          {t('hello.role')}
        </p>
      </div>
      <div className="space-y-2 font-mono text-sm leading-relaxed">
        <div className="text-slate-500">{t('hello.gameHint')}</div>
        <div className="text-slate-500">{t('hello.githubHint')}</div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-indigo-400">const</span>
          <span className="text-emerald-400">githubLink</span>
          <span className="text-slate-400">=</span>
          <a
            className="text-rose-400 underline decoration-rose-300/70 underline-offset-4 hover:text-rose-300/70"
            href="https://github.com/iromuw"
            target="_blank"
            rel="noreferrer"
          >
            &quot;https://github.com/iromuw&quot;
          </a>
        </div>
      </div>
    </section>
  )
}
