// ---------------------------------------------------------------------------
// Analytics utility — centralised event tracking via GA4 (gtag)
//
// Usage:
//   import { trackEvent } from '@/lib/analytics'
//   trackEvent('click_nav_home')
//   trackEvent('view_project_card', { project_name: 'My App' })
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    // gtag is injected by @next/third-parties/google <GoogleAnalytics>
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      eventNameOrTargetId: string,
      params?: Record<string, unknown>,
    ) => void
  }
}

// ---------------------------------------------------------------------------
// Shared types — used by trackExternalLink and engagementSignal
// ---------------------------------------------------------------------------

/** Where the outbound click originated */
export type ExternalLinkLocation = 'footer' | 'project_card' | 'contact' | 'hero'

/** Which external destination was opened */
export type ExternalLinkType = 'github' | 'linkedin' | 'email' | 'live_demo'

// ---------------------------------------------------------------------------

/**
 * Fire a GA4 custom event.
 * Safe to call server-side or before gtag has loaded — calls are silently
 * dropped in those cases.
 *
 * Event naming convention (snake_case, prefixed by category):
 *   page_view_*       navigation / page visibility
 *   click_*           user click interactions
 *   click_external    unified outbound link event (type + location)
 *   view_*            element enters the viewport
 *   engagement_*      dwell time / depth signals
 *   scroll_depth      fired at 25 / 50 / 75 / 100 %
 *   time_on_page      fired at 30 s and 60 s
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, params ?? {})
  }

  window.gtag('event', eventName, params)
}
