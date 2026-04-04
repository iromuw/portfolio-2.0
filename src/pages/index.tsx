import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HelloSection from '@/sections/hello'

export default function IndexPage() {
  return (
    <>
      <Head><title>Mori Wu</title></Head>
      <HelloSection />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})
