export type SectionId =
  | 'overview'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact'

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
