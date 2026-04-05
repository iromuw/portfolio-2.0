import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next' // i18n HOC required by next-i18next
import Layout from '@/components/layout/Layout'
import IntroOverlay from '@/components/IntroOverlay' // Full-screen intro animation on first visit
import { Analytics } from '@vercel/analytics/react' // Vercel Analytics — tracks page views
import { GoogleAnalytics } from '@next/third-parties/google' // Google Analytics via next/third-parties
import PageTracker from '@/components/PageTracker' // Scroll depth + time-on-page tracking

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      {/* Renders above all content; fades out after the intro sequence completes */}
      <IntroOverlay />
      
      <Layout>
        {/* Re-keying on pathname triggers React to remount the page, which
            replays the .page-enter CSS animation on every route change.
            Locale switches (same pathname) intentionally do not re-trigger. */}
        <div key={router.pathname} className="page-enter flex min-h-0 flex-1 flex-col">
          <PageTracker />
          <Component {...pageProps} />
        </div>

        {/* Analytics components inject tracking scripts and render no visible UI */}
        <Analytics />
        <GoogleAnalytics gaId="G-XE93F8B0QV" />
      </Layout>
    </>
  )
}

// Wrap with appWithTranslation to enable useTranslation hooks across all pages
export default appWithTranslation(MyApp)
