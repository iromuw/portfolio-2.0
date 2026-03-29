import type { RawFolderNode } from '@/sections/about/types'
import { MASTER_SNIPPETS, TECHNICAL_SNIPPETS, BACHELOR_SNIPPETS, ACHIEVEMENT_SNIPPETS } from '@/sections/about/snippets/personal/education'

export const education: RawFolderNode = {
  type: 'folder',
  iconColor: 'bg-purple-400',
  children: {
    master: {
      type: 'file',
      iconColor: 'bg-slate-500',
      content: `/**
 * Master of Computer Science (Major in Big Data and Machine Learning)
 * University of Wollongong
 * Jul 2023 – Jul 2025
 *
 * Graduated with Distinction
 *
 * Focused on building practical skills in web development, backend systems,
 * and data-driven applications.
 *
 * Capstone project: SLACA — a full-stack platform integrating frontend,
 * backend, and AI-powered features using a RAG-based chatbot system.
 *
 * Also developed a WordPress website with custom PHP plugins,
 * and completed multiple data analysis projects.
 *
 * Relevant coursework:
 * - Web Development
 * - Programming and Data Structures
 * - Web Server Programming
 * - Data Mining and Knowledge Discovery
 * - Big Data Analytics
 */`,
      snippets: [MASTER_SNIPPETS, TECHNICAL_SNIPPETS],
    },
    bachelor: {
      type: 'file',
      iconColor: 'bg-slate-500',
      content: `/**
 * Bachelor of Product Design
 * Ming Chuan University
 * Sep 2011 – Jun 2015
 *
 * Built a foundation in design thinking, user experience, and visual communication.
 *
 * Gained experience in product design, 3D modeling, and human-centered design,
 * which later shaped my approach to building intuitive and user-focused interfaces.
 */`,
      snippets: [BACHELOR_SNIPPETS, ACHIEVEMENT_SNIPPETS],
    },
  },
}
