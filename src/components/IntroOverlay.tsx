import { useEffect, useState } from 'react'

const ANIMATION_DURATION = 3200 // ms — SVG animation ends ~3s, add 200ms buffer
const FADE_DURATION = 500       // ms — overlay fade-out

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  // Cache-bust on every page load so the browser re-parses the SVG
  // and restarts its CSS animations from t=0.
  const [svgSrc, setSvgSrc] = useState('')

  useEffect(() => {
    setSvgSrc(`/welcome.svg?t=${Date.now()}`)
    const fadeTimer = setTimeout(() => setFading(true), ANIMATION_DURATION)
    const hideTimer = setTimeout(() => setVisible(false), ANIMATION_DURATION + FADE_DURATION)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020618',
        transition: `opacity ${FADE_DURATION}ms ease`,
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {svgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={svgSrc}
          alt="MW logo animation"
          width={440}
          height={300}
          style={{ maxWidth: '90vw' }}
        />
      )}
    </div>
  )
}
