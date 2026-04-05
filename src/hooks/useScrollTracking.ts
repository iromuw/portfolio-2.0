import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'
import { signalEngagement } from '@/lib/engagementSignal'

const DEPTH_THRESHOLDS = [25, 50, 75, 100] as const

/**
 * Tracks scroll depth at 25 %, 50 %, 75 %, and 100 % milestones.
 * Each milestone fires only once per page mount.
 *
 * Scroll container detection:
 *   1. Looks for an element with [data-scroll-container] (e.g. the projects list)
 *   2. Falls back to window / document.documentElement
 *
 * Uses rAF on mount so the DOM is fully rendered before we query for the
 * container (important when this hook lives in a parent like _app).
 */
export function useScrollTracking(): void {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    // Reset per page mount so each route gets fresh depth tracking
    fired.current = new Set()

    let removeListener: (() => void) | null = null

    const rafId = requestAnimationFrame(() => {
      const container =
        document.querySelector<HTMLElement>('[data-scroll-container]') ?? null

      // Scroll % helper — works for both a specific element and the document
      const getScrollPct = (): number => {
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container
          if (scrollHeight <= clientHeight) return 100
          return ((scrollTop + clientHeight) / scrollHeight) * 100
        }
        const el = document.documentElement
        if (el.scrollHeight <= el.clientHeight) return 100
        return ((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100
      }

      const handleScroll = () => {
        const pct = getScrollPct()
        for (const depth of DEPTH_THRESHOLDS) {
          if (pct >= depth && !fired.current.has(depth)) {
            fired.current.add(depth)
            trackEvent('scroll_depth', { depth: `${depth}%` })
            if (depth === 75) signalEngagement('scroll_75')
          }
        }
      }

      const target: EventTarget = container ?? window
      target.addEventListener('scroll', handleScroll as EventListener, { passive: true })
      removeListener = () =>
        target.removeEventListener('scroll', handleScroll as EventListener)

      // Fire immediately in case the page is shorter than the viewport
      handleScroll()
    })

    return () => {
      cancelAnimationFrame(rafId)
      removeListener?.()
    }
  }, [])
}
