export interface Project {
  slug: string
  title: string
  description: string
  image?: string
  tags: string[]
  year: number
  featured?: boolean
  links?: {
    github?: string
    live?: string
  }
}
