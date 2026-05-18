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
    company: 'BC Centre for Disease Control',
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
    name: 'agent-forge',
    type: 'AI workflow tooling',
    stack: 'Markdown, Agent skills, Agent workflows',
    summary: [
      'Built a reusable workflow for composing custom agent skills.',
      '`spec` skill turns rough ideas into staged Markdown plans with clear subagents to assign to.',
      '`implement` skill executes stage in the plan, updates checklists, and logs decisions to reduce black-box coding.',
    ],
    href: 'https://github.com/BigDragonCanCode/agent-forge',
  },
  {
    name: 'Diamond Cut Grades Machine Learning Project',
    type: 'Classification and data analysis',
    stack: 'R, Git, Tidyverse',
    summary: [
      'Tidied the dataset and selected predictors with box plots to balance accuracy and training time.',
      'Trained and compared two KNN classification models, reaching 72% accuracy on diamond cut grade prediction.',
      'Used GitHub for collaboration and co-authored a 1600-word report with plots.',
    ],
    href: 'https://github.com/rubydelang/sonar_data',
  },
  {
    name: 'UBC Course Navigator',
    type: 'Full-stack student tool',
    stack: 'TypeScript, React, Chart.js, Mocha, Chai',
    summary: [
      'Built a full-stack tool for querying UBC course data across multiple views.',
      'Lets students compare past averages by section, professor ratings, and other course details.',
    ],
  },
  {
    name: 'Concert Ticket Management Service',
    type: 'Database-backed service',
    stack: 'JavaScript, SQL, Oracle, Node.js, HTML',
    summary: [
      'Designed a concert and ticket management system with guided querying and reliable data operations.',
      'Modeled 8 databases and normalized them with 3NF for efficient storage.',
    ],
  },
  {
    name: 'Tic Tac Toe',
    type: 'Networked desktop game',
    stack: 'Python, pyFLTK, Socket',
    summary: [
      'Designed the class structure with a UML diagram to keep inheritance and interactions clear.',
      'Built a 3x3 pyFLTK game with socket-based real-time play for two players.',
      'Used TDD with black-box and white-box testing to improve reliability.',
    ],
    href: 'https://github.com/BigDragonCanCode/TicTacToe',
  },
]

export const strengths = [
  'Frontend engineering with strong UI judgment',
  'Design systems and reusable component architecture',
  'TypeScript across product, tooling, and integration work',
  'Systems, networking, and database fundamentals from UBC CS',
]
