import type { Project } from './types'
import { slaca } from './projects/slaca'
import { near } from './projects/near'
import { online } from './projects/online'
import { acfPortal } from './projects/acf-portal'

export const PROJECTS: Project[] = [slaca, online, near, acfPortal]
