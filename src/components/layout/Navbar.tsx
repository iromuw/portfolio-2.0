import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const pathname = router.pathname

  return (
    <header className="flex text-xs items-center border-b border-[#314158] bg-[#0f172b]/80 py-0 font-mono text-sm">
      {/* brand name — pl-4 moves padding inside the cell so its right border
          lands exactly at --left-shell-width, aligning with the body panels */}
      <div className="flex shrink-0 items-center border-r border-[#314158] py-3 pl-4 pr-8 w-[var(--left-shell-width)] text-slate-400">
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
                'relative shrink-0 border-r border-[#314158] px-8 py-3 transition',
                active
                  ? 'bg-white/5 text-slate-100'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              ].join(' ')}
            >
              {tab.key}
              {active && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400/90"
                  aria-hidden
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* right side */}
      <div className="flex shrink-0 items-center">
        <Link
          href={CONTACT_TAB.href}
          className={[
            'relative shrink-0 border-l border-[#314158] px-8 py-3 transition',
            isActive(CONTACT_TAB.href, pathname)
              ? 'bg-white/5 text-slate-100'
              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
          ].join(' ')}
        >
          {CONTACT_TAB.key}
          {isActive(CONTACT_TAB.href, pathname) && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400/90"
              aria-hidden
            />
          )}
        </Link>
        {/* Language toggle — hidden until Chinese content is ready
        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-md ml-3 px-2 text-slate-400 hover:bg-white/5 hover:text-slate-200"
          aria-label={t('nav.switchLanguage')}
        >
          <Globe className="h-4 w-4" />
        </button>
        */}
      </div>
    </header>
  )
}
