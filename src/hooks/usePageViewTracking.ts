import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { trackEvent } from '@/lib/analytics'

// Explicit page-view events for cleaner GA segmentation.
// These complement (not replace) the automatic page_view GA4 fires.
const PAGE_VIEW_MAP: Record<string, string> = {
  '/': 'page_view_home',
  '/projects': 'page_view_projects',
  '/contact': 'page_view_contact',
  '/about': 'page_view_about',
}

/**
 * Fires an explicit page_view_* event once per page mount.
 *
 * This hook lives in PageTracker which is inside `key={router.pathname}`,
 * so it remounts (and therefore re-fires) on every route change automatically.
 * Using router.pathname as the dep is a belt-and-suspenders guard.
 */
export function usePageViewTracking(): void {
  const { pathname } = useRouter()

  useEffect(() => {
    const event = PAGE_VIEW_MAP[pathname]
    if (event) trackEvent(event)
  }, [pathname])
}
