import type { RawAboutData, ContactData } from '~/content/about/types'
import { bio } from './personal/bio'
// import { interests } from './personal/interests'
import { education } from './personal/education'
import { experience } from './professional/experience'
import { skills } from './professional/skills'
// import { certificates } from './professional/certificates'

// Shared contact info
const contacts: ContactData = {
  email: 'mori.moyun.wu@gmail.com',
  phone: '+61 452 509 151',
}

export const rawAboutData: RawAboutData = {
  'personal-info': {
    items: { bio, education },
    contacts,
  },
  'professional-info': {
    items: { experience, skills },
    contacts,
  },
}
