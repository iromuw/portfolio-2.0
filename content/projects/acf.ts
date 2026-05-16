import type { Project } from '~/content/projects/types'

export const acf: Project = {
  slug: 'acf',
  title: 'Australia Career Forum Portal',
  summary:
    'A membership portal for a non-profit community supporting career development among Taiwanese professionals in Australia.',
  description:
    'Collaborated with the founding team of Australia Career Forum to design a members-only portal for their growing community. Worked directly with the organisation founder and internal stakeholders to translate their vision into a complete product design, covering everything from the public-facing sign-up flow to the full internal member experience. Delivered hi-fi mockups across all key flows in both desktop and mobile, which were implemented by the internal development team and shipped to production.',
  category: ['UI/UX'],
  role: 'UI/UX Designer',
  year: '2023',
  status: 'Design',
  techStack: ['Figma', 'UI Design', 'Accessibility'],
  tags: ['Design', 'Community'],
  image: '/projects/acf/cover.png',
  links: {
    caseStudy: '/projects/acf',
    liveDemo: 'https://australiacareerforum.com/',
  },
  contributions: [
    'Designed the end-to-end member experience across the full product: membership landing page, login and sign-up flows, member dashboard, member directory, resources hub, and subscription management.',
    'Delivered hi-fi mockups for all flows in Figma covering desktop and mobile, which were adopted directly by the internal development team and shipped to production.',
    'Designed the member directory to surface professional profiles with name, title, and social links, enabling networking across the Australia-wide community.',
    'Created a resources hub consolidating past events and articles, including recorded sessions and presentation slides.',
    'Built a responsive design system covering typography, colour tokens, and reusable components to ensure visual consistency across the portal.',
  ],
  features: [
    'Membership landing page with subscription plans and onboarding flow',
    'Login, sign-up, and subscription management including order history',
    'Member dashboard with news feed and event calendar',
    'Member directory with professional profiles and social links',
    'Resources hub with past event recordings, slides, and articles',
  ],
  challenges:
    'Designing for a bilingual audience required careful typographic hierarchy decisions and layout flexibility to accommodate varying text lengths between English and Traditional Chinese content, while maintaining a clean and professional appearance.',
  caseStudy: {
    overview:
      'Australia Career Forum is a non-profit community connecting Mandarin-speaking professionals in Australia. As the community grew, the founding team needed a members-only portal to centralise resources, enable networking, and manage subscriptions. I was brought in to design the end-to-end member experience, from the public-facing sign-up flow to the full internal portal, delivering hi-fi mockups across all key screens in both desktop and mobile.',
    sections: [
      {
        type: 'text',
        title: 'The Brief',
        content:
          "Working directly with the organisation founder and core team, the goal was clear: build a portal that felt professional and trustworthy enough to justify a paid membership, while remaining accessible to a bilingual audience. There was no existing design system or prior product to reference. Everything was designed from scratch based on stakeholder discussions and the community's existing brand identity.",
      },
      {
        type: 'image',
        title: 'Onboarding Flow',
        content:
          'The sign-up and membership activation flow was designed as a guided three-step process: create an account, complete a professional profile, then activate membership. Each step was designed to reduce friction and set clear expectations, with the profile step structured to collect the data needed to power the member directory.',
        image: '/projects/acf/signup.png',
        caption: 'Sign-up and membership activation flow',
      },
      {
        type: 'image',
        title: 'Member Directory',
        content:
          'The member directory was the centrepiece of the networking value proposition. Each card surfaces name, job title, employer, and social links at a glance. Advanced filters allow members to search by job title, state, industry, and occupation, making it easy to find relevant connections across Australia.',
        image: '/projects/acf/directory.png',
        caption: 'Member directory with search and filter',
      },
      {
        type: 'image',
        title: 'Resources Hub',
        content:
          "The resources section consolidates the organisation's archive of past events and articles in one place. Each event entry links directly to its recording, slides, or photos, preserving the value of content that would otherwise be scattered across social media and email threads.",
        image: '/projects/acf/resources.png',
        caption: 'Resources hub with past events and articles',
      },
      {
        type: 'image',
        title: 'Key Screens',
        image: '/projects/acf/key-screens.png',
        caption: 'Profile completion and dashboard',
      },
      {
        type: 'text',
        title: 'Outcome',
        content:
          'All designs were delivered as hi-fi Figma mockups covering desktop and mobile, and were implemented directly by the internal development team. The portal launched and remains live as the membership hub for the ACF community.',
      },
    ],
  },
}