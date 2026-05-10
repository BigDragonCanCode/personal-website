import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Explorer } from './components/Explorer'
import { sectionLinks } from './data/portfolio'
import { EducationSection } from './components/sections/EducationSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { OverviewSection } from './components/sections/OverviewSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import type { SectionId } from './types/sections'

function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>('overview')
  const [explorerSection, setExplorerSection] = useState<SectionId>('overview')
  const [openTabs, setOpenTabs] = useState<SectionId[]>(['overview'])
  const paneRef = useRef<HTMLElement | null>(null)

  const activeLink =
    sectionLinks.find((link) => link.id === activeSection) ??
    sectionLinks.find((link) => link.id === explorerSection) ??
    sectionLinks[0]

  const activateSection = (section: SectionId) => {
    setExplorerSection(section)
    setOpenTabs((currentTabs) => (
      currentTabs.includes(section) ? currentTabs : [...currentTabs, section]
    ))
    setActiveSection(section)
  }

  const closeTab = (section: SectionId) => {
    setOpenTabs((currentTabs) => {
      const closingIndex = currentTabs.indexOf(section)

      if (closingIndex === -1) {
        return currentTabs
      }

      const remainingTabs = currentTabs.filter((tab) => tab !== section)

      if (activeSection === section) {
        const nextActive =
          remainingTabs[closingIndex] ?? remainingTabs[closingIndex - 1] ?? null

        setActiveSection(nextActive)

        if (nextActive) {
          setExplorerSection(nextActive)
        }
      }

      return remainingTabs
    })
  }

  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  return (
    <div className="app-shell">

      <header className="topbar">
        <div className="traffic" aria-hidden="true">
          <span className="dot red"></span>
          <span className="dot amber"></span>
          <span className="dot green"></span>
        </div>
        <div className="topbar-meta">
        </div>
      </header>

      <div className="workspace">
        <aside className="rail" aria-label="Workspace shortcuts">
          <div className="rail-badge">ZW</div>
        </aside>

        <Explorer activeSection={explorerSection} onSelectSection={activateSection} />

        <div className="editor">
          <div className="tabs" role="tablist" aria-label="Open files">
            {openTabs.length > 0 ? (
              openTabs.map((tabId) => {
                const link = sectionLinks.find((sectionLink) => sectionLink.id === tabId)

                if (!link) {
                  return null
                }

                return (
                  <div
                    key={link.id}
                    className={link.id === activeSection ? 'tab-shell tab-shell-active' : 'tab-shell'}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={link.id === activeSection}
                      className={link.id === activeSection ? 'tab tab-active' : 'tab'}
                      onClick={() => activateSection(link.id)}
                    >
                      {link.tab}
                    </button>
                    <button
                      type="button"
                      aria-label={`Close ${link.tab}`}
                      className="tab-close"
                      onClick={(event) => {
                        event.stopPropagation()
                        closeTab(link.id)
                      }}
                    >
                      ×
                    </button>
                  </div>
                )
              })
            ) : (
              <div className="tabs-empty" aria-live="polite">
                No open files
              </div>
            )}
          </div>

          <main id="main-content" ref={paneRef} className="editor-pane">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'skills' && <SkillsSection />}
            {activeSection === 'projects' && <ProjectsSection />}
            {activeSection === 'experience' && <ExperienceSection />}
            {activeSection === 'education' && <EducationSection />}
            {!activeSection && (
              <section className="editor-empty-state" aria-live="polite">
                <p className="editor-empty-kicker">editor idle</p>
                <h1>Select a file from the explorer</h1>
                <p>
                  Open any portfolio section on the left to restore the workspace.
                </p>
              </section>
            )}
          </main>
        </div>
      </div>

      <footer className="statusbar">
      </footer>
    </div>
  )
}

export default App
