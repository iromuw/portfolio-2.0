import Link from 'next/link'
import { useRouter } from 'next/router'
import { Globe } from 'lucide-react'
import { useTranslation } from 'next-i18next'

const CENTER_TABS = [
  { key: '_hello', href: '/' },
  { key: '_about-me', href: '/about' },
  { key: '_projects', href: '/projects' },
]

const CONTACT_TAB = { key: '_contact-me', href: '/contact' }

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname === href
}

export default function Navbar() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const pathname = router.pathname

  const toggleLocale = async () => {
    const cur = router.locale ?? 'en'
    const next = cur === 'en' ? 'zh' : 'en'
    await router.push(router.asPath, router.asPath, { locale: next })
  }

  return (
    <header className="flex items-center border-b border-white/10 bg-[#0d1320]/80 px-4 py-0 font-mono text-sm">
      {/* brand name */}
      <div className="flex shrink-0 items-center border-r border-white/10 py-3 pr-8 w-48 text-slate-400">
        mori-wu
      </div>

      {/* center navigation tabs */}
      <nav className="flex min-w-0 flex-1 items-center overflow-x-auto">
        {CENTER_TABS.map((tab) => {
          const active = isActive(tab.href, pathname)
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={[
                'relative shrink-0 border-r border-white/10 px-8 py-3 transition',
                active
                  ? 'bg-white/5 text-slate-100'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              ].join(' ')}
            >
              {tab.key}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400/90"
                  aria-hidden
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* right side: contact tab + language toggle */}
      <div className="flex shrink-0 items-center">
        <Link
          href={CONTACT_TAB.href}
          className={[
            'relative shrink-0 border-l border-r border-white/10 px-8 py-3 transition',
            isActive(CONTACT_TAB.href, pathname)
              ? 'bg-white/5 text-slate-100'
              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
          ].join(' ')}
        >
          {CONTACT_TAB.key}
          {isActive(CONTACT_TAB.href, pathname) && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400/90"
              aria-hidden
            />
          )}
        </Link>
        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-md ml-3 px-2 text-slate-400 hover:bg-white/5 hover:text-slate-200"
          aria-label={t('nav.switchLanguage')}
        >
          <Globe className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
