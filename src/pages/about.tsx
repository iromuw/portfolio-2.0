import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AboutSection from '@/sections/about'
import type { HighlightedAboutData } from '@/sections/about/types'

interface AboutPageProps {
  aboutData: HighlightedAboutData
}

export default function AboutPage({ aboutData }: AboutPageProps) {
  return <AboutSection data={aboutData} />
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  const { rawAboutData } = await import('~/content/about')
  const { prepareAboutProps } = await import('@/sections/about/lib/prepareProps')

  const aboutData = await prepareAboutProps(rawAboutData)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      aboutData,
    },
  }
}
