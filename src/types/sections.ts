export type SectionId =
  | 'overview'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'

export type SectionLink = {
  id: SectionId
  label: string
  short: string
  file: string
  tab: string
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  points: string[]
}

export type Project = {
  name: string
  type: string
  stack: string
  summary: string
  impact: string
}

export type ContactActionId = 'email' | 'linkedin' | 'github'

export type ContactAction = {
  id: ContactActionId
  label: string
  href: string
  external?: boolean
}
