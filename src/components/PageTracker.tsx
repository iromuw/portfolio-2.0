import { useEffect } from 'react'
import { useScrollTracking } from '@/hooks/useScrollTracking'
import { useTimeOnPage } from '@/hooks/useTimeOnPage'
import { usePageViewTracking } from '@/hooks/usePageViewTracking'
import { resetEngagementSignal } from '@/lib/engagementSignal'

/**
 * Invisible component that activates all per-page analytics tracking.
 * Placed *inside* the `key={router.pathname}` div in _app.tsx so it remounts
 * on every route change — giving each page a clean slate.
 *
 * Order of effects (React guarantees top-down within a component):
 *   1. resetEngagementSignal — clears high-intent state for the new page
 *   2. usePageViewTracking   — fires page_view_* event
 *   3. useScrollTracking     — attaches scroll listener (via rAF)
 *   4. useTimeOnPage         — schedules 30 s / 60 s timers
 */
export default function PageTracker() {
  useEffect(() => {
    resetEngagementSignal()
  }, [])

  usePageViewTracking()
  useScrollTracking()
  useTimeOnPage()
  return null
}
