export interface ProjectLinks {
  caseStudy?: string
  github?: string
  liveDemo?: string
}

export type ProjectStatus = 'Featured' | 'Production' | 'Design' | 'Academic'

export type CaseStudySection = {
  type: 'text' | 'image' | 'image-grid' | 'compare'
  title?: string
  content?: string
  image?: string
  images?: string[]
  caption?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  category: string[]
  role: string
  year: string
  status: ProjectStatus
  techStack: string[]
  tags: string[]
  image?: string
  links: ProjectLinks
  featured?: boolean
  // ── Enriched panel content ────────────────────────────────────────────────
  contributions?: string[]
  features?: string[]
  challenges?: string
  gallery?: string[]
  caseStudy?: {
    overview: string
    sections: CaseStudySection[]
  }
}
