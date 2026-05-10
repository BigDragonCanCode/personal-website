import { projects } from '../../data/portfolio'
import './ProjectsSection.css'

export function ProjectsSection() {
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
