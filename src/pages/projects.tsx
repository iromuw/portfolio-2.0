import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { Project } from '~/content/projects/types'
import ProjectsSection from '@/sections/projects'

interface ProjectsPageProps {
  projects: Project[]
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <>
      <Head><title>Projects | Mori Wu</title></Head>
      <ProjectsSection projects={projects} />
    </>
  )
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async ({ locale }) => {
  const { PROJECTS } = await import('~/content/projects')

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      projects: PROJECTS,
    },
  }
}
