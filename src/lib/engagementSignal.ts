// ---------------------------------------------------------------------------
// High-intent engagement signal
//
// Tracks which engagement conditions have been met on the current page and
// fires `engagement_high_intent` exactly ONCE when any qualifying combination
// is satisfied.
//
// Condition groups (OR logic between groups, AND within):
//
//   A)  scroll_75  AND  time_60
//   B)  project_clicked  AND  external_clicked
//   C)  contact_action  (email or linkedin click)
//
// Call resetEngagementSignal() on each route change (PageTracker does this).
// Call signalEngagement(condition) from hooks/components when a condition fires.
// ---------------------------------------------------------------------------

import { trackEvent } from '@/lib/analytics'

export type EngagementCondition =
  | 'scroll_75'         // scroll depth reached 75 %
  | 'time_60'           // 60 s elapsed on page
  | 'project_clicked'   // user opened a project detail panel
  | 'external_clicked'  // user clicked a project's external link
  | 'contact_action'    // user clicked email or LinkedIn

// Module-level — intentionally not React state (no re-renders needed).
// Reset per route via resetEngagementSignal().
let fired = false
const conditions = new Set<EngagementCondition>()

function checkAndFire(): void {
  if (fired) return

  const conditionA = conditions.has('scroll_75') && conditions.has('time_60')
  const conditionB = conditions.has('project_clicked') && conditions.has('external_clicked')
  const conditionC = conditions.has('contact_action')

  if (conditionA || conditionB || conditionC) {
    fired = true
    trackEvent('engagement_high_intent', {
      // Surface which condition triggered it for easier GA segmentation
      trigger: conditionC ? 'contact_action' : conditionB ? 'project_deep_dive' : 'dwell',
    })
  }
}

/** Reset all state for a fresh page session. Called by PageTracker on mount. */
export function resetEngagementSignal(): void {
  fired = false
  conditions.clear()
}

/**
 * Signal that a condition has been met.
 * Immediately evaluates whether high-intent threshold is reached.
 * Safe to call multiple times — conditions are deduplicated.
 */
export function signalEngagement(condition: EngagementCondition): void {
  if (fired) return // already fired; nothing more to track
  conditions.add(condition)
  checkAndFire()
}
