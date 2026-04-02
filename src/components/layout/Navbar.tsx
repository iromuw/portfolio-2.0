import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="flex items-center border-b border-[#314158] bg-[#0f172b]/80 font-mono text-sm">
        {/* Brand — full width on mobile, fixed column on desktop */}
        <div
          className={[
            'flex items-center py-3 pl-4 text-slate-400',
            // mobile: fill remaining space, no right border
            'flex-1 pr-4',
            // desktop: fixed-width column with right border separator
            'md:flex-initial md:w-[var(--left-shell-width)] md:shrink-0 md:pr-8 md:border-r md:border-[#314158]',
          ].join(' ')}
        >
          <Link href="/" className="transition hover:text-slate-200">
            mori-wu
          </Link>
        </div>

        {/* Center navigation tabs — desktop only */}
        <nav className="hidden md:flex min-w-0 flex-1 items-center overflow-x-auto">
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

        {/* Right side */}
        <div className="flex shrink-0 items-center">
          {/* Contact tab — desktop only */}
          <Link
            href={CONTACT_TAB.href}
            className={[
              'hidden md:block relative shrink-0 border-l border-[#314158] px-8 py-3 transition',
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

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded p-2 mr-3 text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
