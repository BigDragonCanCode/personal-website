import { useRef, useEffect, useId, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import './SkillsSection.css'
import { skillCategories, skillsSectionData } from '../../data/skills'
import type {
  IconReadySkill,
  SkillId,
  SkillsSectionMode,
  SkillsSectionProps,
  SkillsSectionState,
  WallChildSkill,
} from '../../types/skills'

type SphereRotation = {
  x: number
  y: number
}

type SpherePoint = {
  x: number
  y: number
  z: number
}

const initialSphereRotation: SphereRotation = {
  x: -0.34,
  y: 0.78,
}

function dedupeSkillIds(skillIds: SkillId[]) {
  return [...new Set(skillIds)]
}

function createInitialState(
  defaultMode: SkillsSectionMode,
  initialExpandedSkillIds: SkillId[],
): SkillsSectionState {
  return {
    mode: defaultMode,
    expandedSkillIds: dedupeSkillIds(initialExpandedSkillIds),
  }
}

export function SkillsSection({
  data = skillsSectionData,
  defaultMode = 'wall',
  initialExpandedSkillIds = [],
  children,
}: SkillsSectionProps) {
  const sectionId = useId()
  const [state, setState] = useState<SkillsSectionState>(() =>
    createInitialState(defaultMode, initialExpandedSkillIds),
  )

  const setMode = (mode: SkillsSectionMode) => {
    setState((currentState) =>
      currentState.mode === mode ? currentState : { ...currentState, mode },
    )
  }

  const toggleExpandedSkill = (skillId: SkillId) => {
    setState((currentState) => {
      const isExpanded = currentState.expandedSkillIds.includes(skillId)

      return {
        ...currentState,
        expandedSkillIds: isExpanded
          ? currentState.expandedSkillIds.filter((currentSkillId) => currentSkillId !== skillId)
          : [...currentState.expandedSkillIds, skillId],
      }
    })
  }

  if (children) {
    return children({ data, state, setMode, toggleExpandedSkill })
  }

  const topLevelIconReadySkills = data.wallTopLevelSkills.filter(
    (skill): skill is IconReadySkill => skill.iconStatus === 'ready',
  )
  const globeSkills = data.globeSkills.filter((skill) => !skill.parentSkillId)

  const wallCategories = skillCategories
    .map((category) => ({
      category,
      skills: topLevelIconReadySkills.filter((skill) => skill.category === category.id),
    }))
    .filter(({ skills }) => skills.length > 0)

  return (
    <section
      className={`skills-section section-block skills-section--${state.mode}`}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="section-heading section-heading--split skills-section__heading">
        <div>
          <p className="section-kicker">Technical Skills</p>
          <h2 id={`${sectionId}-title`}>Resume-derived stack, with readable and decorative views.</h2>
        </div>

        <div className="skills-section__controls">
          <p className="section-note skills-section__note">
            Wall mode stays scan-first. Globe mode stays decorative and spatial.
          </p>

          <div className="skills-section__toggle" role="tablist" aria-label="Skills view">
            {(['wall', 'globe'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={state.mode === mode}
                className={
                  state.mode === mode
                    ? 'skills-section__toggle-button is-active'
                    : 'skills-section__toggle-button'
                }
                onClick={() => setMode(mode)}
              >
                {mode === 'wall' ? 'Wall' : 'Globe'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="skills-section__viewport">
        {state.mode === 'wall' ? (
          <div className="skills-wall__categories">
            {wallCategories.map(({ category, skills }) => (
              <section
                key={category.id}
                className="skills-wall__category"
                aria-labelledby={`${sectionId}-${category.id}`}
              >
                <div className="skills-wall__category-header">
                  <p id={`${sectionId}-${category.id}`} className="skills-wall__category-label">
                    {category.label}
                  </p>
                  <span className="skills-wall__category-rule" aria-hidden="true" />
                </div>

                <ul className="skills-wall__grid" role="list">
                  {skills.map((skill) => {
                    const childSkills = data.wallChildSkillsByParentId[skill.id] ?? []
                    const isExpandable = childSkills.length > 0
                    const isExpanded = state.expandedSkillIds.includes(skill.id)

                    return (
                      <li
                        key={skill.id}
                        className={[
                          'skills-wall__tile',
                          isExpandable ? 'skills-wall__tile--expandable' : '',
                          isExpanded ? 'skills-wall__tile--expanded' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {isExpandable ? (
                          <button
                            type="button"
                            className="skills-wall__trigger"
                            onClick={() => toggleExpandedSkill(skill.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`${sectionId}-${skill.id}-children`}
                          >
                            <SkillTileContent skill={skill} childSkills={childSkills} />
                          </button>
                        ) : (
                          <div className="skills-wall__static-tile">
                            <SkillTileContent skill={skill} childSkills={childSkills} />
                          </div>
                        )}

                        {isExpandable ? (
                          <div
                            id={`${sectionId}-${skill.id}-children`}
                            className="skills-wall__children"
                            hidden={!isExpanded}
                          >
                            {childSkills.map((childSkill) => (
                              <span
                                key={childSkill.id}
                                className={[
                                  'skills-wall__child-chip',
                                  childSkill.iconStatus === 'ready'
                                    ? 'skills-wall__child-chip--ready'
                                    : 'skills-wall__child-chip--missing',
                                ].join(' ')}
                              >
                                {childSkill.canonicalName}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <SkillsGlobe sectionId={sectionId} skills={globeSkills} />
        )}
      </div>
    </section>
  )
}

type SkillTileContentProps = {
  skill: IconReadySkill
  childSkills: WallChildSkill[]
}

function SkillTileContent({ skill, childSkills }: SkillTileContentProps) {
  const Icon = skill.icon

  return (
    <>
      <div className="skills-wall__icon-frame" aria-hidden="true">
        <Icon className="skills-wall__icon" />
      </div>
      <div className="skills-wall__tile-copy">
        <span className="skills-wall__tile-label">{skill.canonicalName}</span>
        {childSkills.length > 0 ? (
          <span className="skills-wall__tile-meta">
            <span className="skills-wall__tile-count">{childSkills.length}</span>
            <span>{childSkills.length === 1 ? 'linked tool' : 'linked tools'}</span>
          </span>
        ) : (
          <span className="skills-wall__tile-meta skills-wall__tile-meta--quiet">
            {skill.category === 'developer-tools' ? 'workflow tool' : 'core skill'}
          </span>
        )}
      </div>
      {childSkills.length > 0 ? (
        <span className="skills-wall__expand-indicator" aria-hidden="true">
          {skill.canonicalName} tools
        </span>
      ) : null}
    </>
  )
}

type SkillsGlobeProps = {
  sectionId: string
  skills: IconReadySkill[]
}

function SkillsGlobe({ sectionId, skills }: SkillsGlobeProps) {
  return (
    <section className="skills-globe" aria-labelledby={`${sectionId}-globe-title`}>
      <div className="skills-globe__stage" aria-labelledby={`${sectionId}-globe-title`}>
        <h3 id={`${sectionId}-globe-title`} className="skills-globe__sr-only">
          Interactive skills globe
        </h3>
        <div className="skills-globe__atmosphere" aria-hidden="true" />
        <SpherePrototypeGlobe skills={skills} />
      </div>
    </section>
  )
}

type SpherePrototypeGlobeProps = {
  skills: IconReadySkill[]
}

function SpherePrototypeGlobe({ skills }: SpherePrototypeGlobeProps) {
  const [rotation, setRotation] = useState<SphereRotation>(initialSphereRotation)
  const targetRotationRef = useRef<SphereRotation>(initialSphereRotation)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRotation(initialSphereRotation)
      return
    }

    let frameId = 0
    let currentRotation = initialSphereRotation

    const animate = () => {
      const targetRotation = targetRotationRef.current

      currentRotation = {
        x: currentRotation.x + (targetRotation.x - currentRotation.x) * 0.06,
        y: currentRotation.y + (targetRotation.y - currentRotation.y) * 0.06 + 0.003,
      }

      setRotation(currentRotation)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5

    targetRotationRef.current = {
      x: initialSphereRotation.x + pointerY * 1.1,
      y: initialSphereRotation.y + pointerX * 1.8,
    }
  }

  const handlePointerLeave = () => {
    targetRotationRef.current = initialSphereRotation
  }

  return (
    <div
      className="skills-globe-sphere"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      aria-hidden="true"
    >
      <div className="skills-globe-sphere__wireframe">
        <span className="skills-globe-sphere__ring skills-globe-sphere__ring--equator" />
        <span className="skills-globe-sphere__ring skills-globe-sphere__ring--meridian" />
        <span className="skills-globe-sphere__ring skills-globe-sphere__ring--tilt" />

        {skills.map((skill, index) => {
          const Icon = skill.icon
          const point = projectSpherePoint(createSpherePoint(index, skills.length), rotation)
          const depth = (point.z + 1) / 2
          const isBackNode = point.z < 0.02

          return (
            <span
              key={skill.id}
              className={isBackNode ? 'skills-globe-sphere__node is-back' : 'skills-globe-sphere__node'}
              style={createSphereNodeStyle(point, depth)}
            >
              <span className="skills-globe-sphere__node-core">
                <Icon className="skills-globe-sphere__node-icon" />
              </span>
              <span className="skills-globe-sphere__node-label">{skill.canonicalName}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function createSpherePoint(index: number, total: number): SpherePoint {
  const offset = 2 / total
  const y = 1 - index * offset - offset / 2
  const radius = Math.sqrt(1 - y * y)
  const theta = Math.PI * (3 - Math.sqrt(5)) * index

  return {
    x: Math.cos(theta) * radius,
    y,
    z: Math.sin(theta) * radius,
  }
}

function projectSpherePoint(point: SpherePoint, rotation: SphereRotation): SpherePoint {
  const cosY = Math.cos(rotation.y)
  const sinY = Math.sin(rotation.y)
  const rotatedX = point.x * cosY - point.z * sinY
  const rotatedZ = point.x * sinY + point.z * cosY

  const cosX = Math.cos(rotation.x)
  const sinX = Math.sin(rotation.x)
  const projectedY = point.y * cosX - rotatedZ * sinX
  const projectedZ = point.y * sinX + rotatedZ * cosX

  return {
    x: rotatedX,
    y: projectedY,
    z: projectedZ,
  }
}

function createSphereNodeStyle(point: SpherePoint, depth: number): CSSProperties {
  return {
    left: `${50 + point.x * 30}%`,
    top: `${50 + point.y * 30}%`,
    opacity: 0.26 + depth * 0.88,
    transform: `translate(-50%, -50%) scale(${0.6 + depth * 0.74})`,
    zIndex: Math.round(depth * 100),
  }
}
