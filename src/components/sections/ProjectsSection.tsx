import { projects } from '../../data/portfolio'
import './ProjectsSection.css'

export function ProjectsSection() {
  return (
    <section className="section-block" aria-labelledby="projects-title">
      <div className="project-list">
        {projects.map((project) => (
          <article key={project.name} className="project-row">
            <div className="project-meta">
              <p className="project-type">{project.type}</p>
              <h3>
                {project.href ? (
                  <a
                    className="project-title-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
            </div>
            <div className="project-body">
              <ul className="project-summary">
                {project.summary.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="project-stack">{project.stack}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
