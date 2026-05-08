import { useEffect, useRef, useState } from 'react'
import './App.css'

type SectionId = 'overview' | 'projects' | 'experience' | 'education' | 'contact'

type SectionLink = {
  id: SectionId
  label: string
  short: string
  file: string
  tab: string
}

const sectionLinks: SectionLink[] = [
  { id: 'overview', label: 'Overview', short: 'OV', file: 'portfolio.tsx', tab: 'portfolio.tsx' },
  { id: 'projects', label: 'Projects', short: 'PR', file: 'projects.tsx', tab: 'projects.tsx' },
  { id: 'experience', label: 'Experience', short: 'XP', file: 'experience.tsx', tab: 'experience.tsx' },
  { id: 'education', label: 'Education', short: 'ED', file: 'education.tsx', tab: 'education.tsx' },
  { id: 'contact', label: 'Contact', short: 'CT', file: 'contact.tsx', tab: 'contact.tsx' },
]

const experienceItems = [
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

const projects = [
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

const strengths = [
  'Frontend engineering with strong UI judgment',
  'Design systems and reusable component architecture',
  'TypeScript across product, tooling, and integration work',
  'Systems, networking, and database fundamentals from UBC CS',
]

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const paneRef = useRef<HTMLElement | null>(null)

  const activeLink = sectionLinks.find((link) => link.id === activeSection) ?? sectionLinks[0]

  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

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

        <aside className="explorer" aria-label="Section explorer">
          <div className="pane-head">
            <span>Explorer</span>
            <span className="pane-kicker">portfolio-v2</span>
          </div>
          <div className="tree">
            <div className="tree-group">
              <div className="tree-label">src</div>
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={link.id === activeSection ? 'tree-item is-active' : 'tree-item'}
                  onClick={() => setActiveSection(link.id)}
                >
                  <span className="tree-name">{link.file}</span>
                  <span className="tree-ext">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

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
            {activeSection === 'projects' && <ProjectsSection />}
            {activeSection === 'experience' && <ExperienceSection />}
            {activeSection === 'education' && <EducationSection />}
            {activeSection === 'contact' && <ContactSection />}
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

function OverviewSection() {
  return (
    <>
      <section className="hero section-block" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="section-kicker">Software engineer portfolio</p>
          <h1 id="hero-title">
            I build product UI with systems thinking and a bias toward clean,
            reusable engineering.
          </h1>
          <p className="hero-summary">
            UBC computer science student based in Vancouver, currently working on
            design systems, frontend-heavy product work, and developer-facing
            interfaces.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="mailto:winifred.wang.2004@gmail.com">
              Email me
            </a>
            <a
              className="button-secondary"
              href="/src/assets/Ziqing_resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume PDF
            </a>
          </div>
        </div>

        <aside className="hero-side" aria-label="Profile highlights">
          <div className="hero-stat">
            <span className="label">Current role</span>
            <strong>Design System Co-op at IFS Copperleaf</strong>
          </div>
          <div className="hero-stat">
            <span className="label">Focus</span>
            <strong>Frontend systems, product engineering, developer UX</strong>
          </div>
          <div className="hero-stat">
            <span className="label">Education</span>
            <strong>UBC Computer Science, GPA 3.86</strong>
          </div>
        </aside>
      </section>

      <section className="section-divider" aria-hidden="true">
        <span></span>
      </section>

      <section className="section-block intro-strip" aria-labelledby="about-title">
        <div className="section-heading">
          <p className="section-kicker">About</p>
          <h2 id="about-title">A concise portfolio, not a dashboard.</h2>
        </div>
        <div className="intro-columns">
          <p>
            I care about interfaces that feel precise under real use, not just
            visually polished in isolation. My best work usually sits at the seam
            between product decisions, component architecture, and implementation
            detail.
          </p>
          <ul className="strength-list">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function ProjectsSection() {
  return (
    <section className="section-block" aria-labelledby="projects-title">
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 id="projects-title">Case-study style project rows.</h2>
        </div>
        <p className="section-note">
          A few representative builds with enough detail to show scope and
          engineering shape.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <article key={project.name} className="project-row">
            <div className="project-meta">
              <p className="project-type">{project.type}</p>
              <h3>{project.name}</h3>
            </div>
            <div className="project-body">
              <p>{project.summary}</p>
              <p className="project-stack">{project.stack}</p>
            </div>
            <p className="project-impact">{project.impact}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="section-block" aria-labelledby="experience-title">
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">Experience</p>
          <h2 id="experience-title">
            Recent roles and what changed because of them.
          </h2>
        </div>
        <p className="section-note">
          I like work where product clarity and implementation quality reinforce
          each other.
        </p>
      </div>

      <div className="timeline">
        {experienceItems.map((item) => (
          <article key={item.company} className="timeline-item">
            <div className="timeline-period">
              <span>{item.period}</span>
            </div>
            <div className="timeline-content">
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.company}</p>
              <ul className="timeline-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section
      className="section-block section-block--compact"
      aria-labelledby="education-title"
    >
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">Education</p>
          <h2 id="education-title">Formal training with a practical bend.</h2>
        </div>
      </div>

      <div className="education-row">
        <div>
          <h3>University of British Columbia</h3>
          <p className="education-subtitle">
            Bachelor of Science in Computer Science
          </p>
        </div>
        <p className="education-detail">Sep 2022 - May 2027</p>
        <p className="education-detail">
          Dean&apos;s Honour List • Systems, databases, networking
        </p>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      className="section-block section-block--compact contact-strip"
      aria-labelledby="contact-title"
    >
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Open to software engineering conversations.</h2>
        </div>
      </div>

      <div className="contact-links" role="list" aria-label="Contact links">
        <a role="listitem" href="mailto:winifred.wang.2004@gmail.com">
          winifred.wang.2004@gmail.com
        </a>
        <a
          role="listitem"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          role="listitem"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          role="listitem"
          href="/src/assets/Ziqing_resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume PDF
        </a>
      </div>
    </section>
  )
}

export default App
