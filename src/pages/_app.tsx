import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import Layout from '@/components/layout/Layout'
import IntroOverlay from '@/components/IntroOverlay'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <IntroOverlay />
      <Layout>
        {/* Re-keying on pathname triggers React to remount the page, which
            replays the .page-enter CSS animation on every route change.
            Locale switches (same pathname) intentionally do not re-trigger. */}
        <div key={router.pathname} className="page-enter flex min-h-0 flex-1 flex-col">
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  )
}

export default appWithTranslation(MyApp)
