// ---------------------------------------------------------------------------
// Unified external / outbound link tracker
//
// Replaces the scattered click_project_github, click_project_live_demo,
// click_contact_linkedin, click_contact_email events with a single
// `click_external` event that carries type + location metadata.
//
// This file sits between analytics.ts (pure gtag wrapper) and
// engagementSignal.ts (high-intent state) so neither needs to import the
// other (avoids circular deps).
//
// Usage:
//   import { trackExternalLink } from '@/lib/trackExternalLink'
//
//   trackExternalLink('github',    'project_card', { project_name: 'My App' })
//   trackExternalLink('live_demo', 'project_card', { project_name: 'My App' })
//   trackExternalLink('linkedin',  'footer')
//   trackExternalLink('github',    'footer')
//   trackExternalLink('email',     'contact')
// ---------------------------------------------------------------------------

import { trackEvent, type ExternalLinkType, type ExternalLinkLocation } from '@/lib/analytics'
import { signalEngagement } from '@/lib/engagementSignal'

interface ExternalLinkParams {
  project_name?: string
}

export function trackExternalLink(
  type: ExternalLinkType,
  location: ExternalLinkLocation,
  params?: ExternalLinkParams,
): void {
  // 1. Fire the unified GA event
  trackEvent('click_external', {
    type,
    location,
    ...(params?.project_name ? { project_name: params.project_name } : {}),
  })

  // 2. Feed relevant conditions into the high-intent signal
  //    — email / linkedin: direct contact intent (condition C)
  if (type === 'email' || type === 'linkedin') {
    signalEngagement('contact_action')
  }
  //    — any external link from a project card: deep-dive signal (part of B)
  if (location === 'project_card') {
    signalEngagement('external_clicked')
  }
}
