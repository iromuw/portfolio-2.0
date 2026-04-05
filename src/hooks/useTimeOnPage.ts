import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { signalEngagement } from '@/lib/engagementSignal'

const MILESTONES_SECONDS = [30, 60] as const

/**
 * Fires `time_on_page` events at 30 s and 60 s after mount.
 * Timers are cleared if the component unmounts before the milestone is reached
 * (e.g. user navigates away), so no phantom events are sent.
 * Also signals the engagement state machine at 60 s (condition A).
 */
export function useTimeOnPage(): void {
  useEffect(() => {
    const timers = MILESTONES_SECONDS.map((seconds) =>
      setTimeout(() => {
        trackEvent('time_on_page', { seconds })
        if (seconds === 60) signalEngagement('time_60')
      }, seconds * 1000),
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])
}
