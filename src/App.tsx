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
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const paneRef = useRef<HTMLElement | null>(null)

  const activeLink = sectionLinks.find((link) => link.id === activeSection) ?? sectionLinks[0]

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
          <span className="topbar-pill">portfolio mode</span>
          <span className="topbar-pill">dark workspace</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="rail" aria-label="Workspace shortcuts">
          <div className="rail-badge">ZW</div>
        </aside>

        <Explorer activeSection={activeSection} onSelectSection={setActiveSection} />

        <div className="editor">
          <div className="tabs" role="tablist" aria-label="Open files">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                role="tab"
                aria-selected={link.id === activeSection}
                className={link.id === activeSection ? 'tab tab-active' : 'tab'}
                onClick={() => setActiveSection(link.id)}
              >
                {link.tab}
              </button>
            ))}
          </div>

          <main id="main-content" ref={paneRef} className="editor-pane">
            {activeSection === 'overview' && <OverviewSection />}
            {activeSection === 'skills' && <SkillsSection />}
            {activeSection === 'projects' && <ProjectsSection />}
            {activeSection === 'experience' && <ExperienceSection />}
            {activeSection === 'education' && <EducationSection />}
          </main>
        </div>
      </div>

      <footer className="statusbar">
        <span>active file: {activeLink.tab}</span>
        <span>active section: {activeLink.label}</span>
      </footer>
    </div>
  )
}

export default App
