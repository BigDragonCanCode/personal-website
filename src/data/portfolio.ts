import type {
  ContactAction,
  ExperienceItem,
  Project,
  SectionLink,
} from '../types/sections'

export const sectionLinks: SectionLink[] = [
  { id: 'overview', label: 'Overview', short: 'OV', file: 'portfolio.tsx', tab: 'portfolio.tsx' },
  { id: 'skills', label: 'Skills', short: 'SK', file: 'skills.tsx', tab: 'skills.tsx' },
  { id: 'projects', label: 'Projects', short: 'PR', file: 'projects.tsx', tab: 'projects.tsx' },
  { id: 'experience', label: 'Experience', short: 'XP', file: 'experience.tsx', tab: 'experience.tsx' },
  { id: 'education', label: 'Education', short: 'ED', file: 'education.tsx', tab: 'education.tsx' },
]

export const contactActions: ContactAction[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:winifred.wang.2004@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ziqing-wang-99a6802ab/',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/BigDragonCanCode',
    external: true,
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    company: 'BC Centre of Disease Control',
    role: 'Research Assistant',
    period: 'May 2026 - Present',
    points: [
      'Modernizing project management by building github version control',
      'Enforcing best practices and clear patterns by setting up branches rulesets and CI checks.',
      'Deploying application on internal and public servers for clients meetings',
      'Automating daily data fetch from Google Earth Engine with Python scripts and cron jobs.',
    ],
  },
  {
    company: 'IFS Copperleaf',
    role: 'Software Engineer, Design System Co-op',
    period: 'Sep 2025 - May 2026',
    points: [
      'Built reusable Angular and TypeScript components for a production design system.',
      'Refactored legacy flows to improve performance, maintainability, and safer integration patterns.',
      'Worked across frontend UI, Prisma-backed data flows, REST APIs, and C# services.',
    ],
  },
  {
    company: 'CoChat',
    role: 'Lead Full-stack Developer',
    period: 'May 2025 - Sep 2025',
    points: [
      'Led MVP product direction across interface design, schema design, and core workflows.',
      'Shipped with React, TypeScript, Vite, Tailwind, Vercel, and Railway under tight iteration cycles.',
      'Turned early user feedback into concrete product and UX decisions.',
    ],
  },
  {
    company: 'University of British Columbia',
    role: 'Teaching Assistant, Computer Networking',
    period: 'Jan 2025 - May 2025',
    points: [
      'Ran weekly tutorials and office hours covering concepts like TCP/IP, UDP, routing, and VPN etc.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'UBC Course Navigator',
    type: 'Data-heavy student tool',
    stack: 'TypeScript, React, Chart.js, Mocha, Chai',
    summary:
      'Implemented query, validation, and visualization flows around a structured course dataset with an emphasis on clarity and correctness.',
    impact: 'Strongest signal: frontend organization around dense data and interaction logic.',
  },
  {
    name: 'Concert Ticket Management Service',
    type: 'Database-backed service',
    stack: 'JavaScript, SQL, Oracle, Node.js',
    summary:
      'Designed a concert and ticket management system with guided querying and reliable data operations.',
    impact: 'Strongest signal: relational modeling, backend workflows, and query design.',
  },
]

export const strengths = [
  'Frontend engineering with strong UI judgment',
  'Design systems and reusable component architecture',
  'TypeScript across product, tooling, and integration work',
  'Systems, networking, and database fundamentals from UBC CS',
]
