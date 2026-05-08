import type {
  ExperienceItem,
  Project,
  SectionLink,
} from '../types/sections'

export const sectionLinks: SectionLink[] = [
  { id: 'overview', label: 'Overview', short: 'OV', file: 'portfolio.tsx', tab: 'portfolio.tsx' },
  { id: 'projects', label: 'Projects', short: 'PR', file: 'projects.tsx', tab: 'projects.tsx' },
  { id: 'experience', label: 'Experience', short: 'XP', file: 'experience.tsx', tab: 'experience.tsx' },
  { id: 'education', label: 'Education', short: 'ED', file: 'education.tsx', tab: 'education.tsx' },
  { id: 'contact', label: 'Contact', short: 'CT', file: 'contact.tsx', tab: 'contact.tsx' },
]

export const experienceItems: ExperienceItem[] = [
  {
    company: 'IFS Copperleaf',
    role: 'Software Engineer, Design System Co-op',
    period: 'Sep 2025 - Present',
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
      'Ran tutorials and office hours covering TCP, UDP, IP, routing, and VPN fundamentals.',
      'Helped students debug systems concepts with clear, practical explanations.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'CoChat MVP',
    type: '0 to 1 product build',
    stack: 'React, TypeScript, CockroachDB, Cloudflare, Vercel',
    summary:
      'Built the first product version end to end, shaping the UI, data model, and deployment path with direct user feedback.',
    impact: 'Strongest signal: product thinking plus execution across the full stack.',
  },
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
