export interface TagMeta {
  label: string
  /** Tailwind bg-* class for the brand color dot */
  color: string
}

export const TAG_META: Record<string, TagMeta> = {
  react: { label: 'React', color: 'bg-sky-400' },
  nextjs: { label: 'Next.js', color: 'bg-slate-300' },
  typescript: { label: 'TypeScript', color: 'bg-blue-500' },
  tailwind: { label: 'Tailwind CSS', color: 'bg-cyan-400' },
  nodejs: { label: 'Node.js', color: 'bg-green-500' },
  postgresql: { label: 'PostgreSQL', color: 'bg-blue-700' },
  prisma: { label: 'Prisma', color: 'bg-slate-400' },
  near: { label: 'NEAR Protocol', color: 'bg-emerald-400' },
  rust: { label: 'Rust', color: 'bg-orange-500' },
  figma: { label: 'Figma', color: 'bg-purple-400' },
  python: { label: 'Python', color: 'bg-yellow-400' },
  'ui-ux': { label: 'UI/UX', color: 'bg-pink-400' },
}

/** Convenience helper: tag key → display label */
export function tagLabel(key: string): string {
  return TAG_META[key]?.label ?? key
}
