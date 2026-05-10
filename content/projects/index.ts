import type { Project } from '~/content/projects/types'
import { slaca } from './slaca'
import { near } from './near'
import { online } from './online'
import { acf } from './acf'
import { flowpath } from './flowpath'

export const PROJECTS: Project[] = [slaca, near, online, acf, flowpath]
