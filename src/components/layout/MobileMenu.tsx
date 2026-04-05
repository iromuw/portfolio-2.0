import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const ALL_TABS = [
  { key: '_hello', href: '/', event: 'click_nav_home' },
  { key: '_about-me', href: '/about', event: 'click_nav_about' },
  { key: '_projects', href: '/projects', event: 'click_nav_projects' },
  { key: '_contact-me', href: '/contact', event: 'click_nav_contact' },
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname === href
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useRouter()

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={[
        'fixed inset-0 z-50 flex flex-col',
        'bg-[#070e1c]/[0.96] backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[#314158] px-6 py-4">
        <span className="font-mono text-sm text-slate-400">mori-wu</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col justify-center px-6">
        {ALL_TABS.map((tab, i) => {
          const active = isActive(tab.href, pathname)
          return (
            <Link
              key={tab.key}
              href={tab.href}
              onClick={() => trackEvent(tab.event)}
              style={{
                transitionDelay: isOpen ? `${60 + i * 55}ms` : '0ms',
              }}
              className={[
                'flex items-center gap-3 border-b border-[#314158]/40 py-5 font-mono text-xl',
                'transition-all duration-300',
                isOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0',
                active
                  ? 'text-teal-400'
                  : 'text-slate-300 active:text-slate-100',
              ].join(' ')}
            >
              <span className={['text-sm', active ? 'text-teal-400/70' : 'text-slate-600'].join(' ')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {tab.key}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
