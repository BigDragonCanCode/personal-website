import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

export type SkillId = string

export type SkillCategoryId =
  | 'programming-languages-markup'
  | 'libraries-frameworks-apis'
  | 'developer-tools'

export type SkillIconStatus = 'ready' | 'missing'

export type ReadySkillIconMatch = 'exact' | 'proxy'

export type SkillIconMatch = ReadySkillIconMatch | 'missing'

export type SkillCategory = {
  id: SkillCategoryId
  label: string
  sourceLabel: string
}

export type ResumeSkillSource = Record<SkillCategoryId, string[]>

export type SkillRelationship = {
  parentSkillId?: SkillId
  childSkillIds?: SkillId[]
  wallOnly?: boolean
}

export type BaseResumeSkill = SkillRelationship & {
  id: SkillId
  sourceLabel: string
  canonicalName: string
  category: SkillCategoryId
}

export type IconReadySkill = BaseResumeSkill & {
  icon: IconType
  iconStatus: 'ready'
  iconMatch: ReadySkillIconMatch
}

export type MissingIconSkill = BaseResumeSkill & {
  icon: null
  iconStatus: 'missing'
  iconMatch: 'missing'
}

export type ResumeSkill = IconReadySkill | MissingIconSkill

export type WallChildSkill = ResumeSkill & {
  parentSkillId: SkillId
  wallOnly: true
}

export type ExpandableWallParentSkill = ResumeSkill & {
  childSkillIds: [SkillId, ...SkillId[]]
}

export type SkillCollection = {
  category: SkillCategory
  skills: ResumeSkill[]
}

export type SkillsSectionMode = 'globe' | 'wall'

export type SkillsSectionState = {
  mode: SkillsSectionMode
  expandedSkillIds: SkillId[]
}

export type WallChildSkillsByParentId = Partial<Record<SkillId, WallChildSkill[]>>

export type SkillsSectionData = {
  allSkills: ResumeSkill[]
  iconReadySkills: IconReadySkill[]
  missingIconSkills: MissingIconSkill[]
  globeSkills: ResumeSkill[]
  wallTopLevelSkills: ResumeSkill[]
  wallChildSkillsByParentId: WallChildSkillsByParentId
  expandableWallParentSkills: ExpandableWallParentSkill[]
}

export type SkillsSectionRenderApi = {
  data: SkillsSectionData
  state: SkillsSectionState
  setMode: (mode: SkillsSectionMode) => void
  toggleExpandedSkill: (skillId: SkillId) => void
}

export type SkillsSectionProps = {
  data?: SkillsSectionData
  defaultMode?: SkillsSectionMode
  initialExpandedSkillIds?: SkillId[]
  children?: (api: SkillsSectionRenderApi) => ReactNode
}
