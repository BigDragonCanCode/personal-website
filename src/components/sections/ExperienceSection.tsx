import { experienceItems } from '../../data/portfolio'
import './ExperienceSection.css'

export function ExperienceSection() {
  return (
    <section className="section-block" aria-labelledby="experience-title">
      <div className="section-heading section-heading--split">
        <div>
          <p className="section-kicker">Experience</p>
        </div>
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
