import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { contactActions, strengths } from '../data/portfolio'

function getActionIcon(actionId: 'email' | 'linkedin' | 'github') {
  switch (actionId) {
    case 'email':
      return <HiOutlineMail aria-hidden="true" />
    case 'linkedin':
      return <FaLinkedinIn aria-hidden="true" />
    case 'github':
      return <FaGithub aria-hidden="true" />
  }
}

export function OverviewSection() {
  return (
    <>
      <section className="hero section-block" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="section-kicker">Software engineer portfolio</p>
          <h2 id="hero-title">
            I build product UI with systems thinking and a bias toward clean,
            reusable engineering.
          </h2>
          <p className="hero-summary">
            UBC computer science student based in Vancouver, currently working on
            design systems, frontend-heavy product work, and developer-facing
            interfaces.
          </p>

          <div className="hero-actions" role="group" aria-label="Contact actions">
            {contactActions.map((action) => (
              <a
                key={action.id}
                className="hero-action-button"
                href={action.href}
                aria-label={action.label}
                title={action.label}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noreferrer' : undefined}
              >
                {getActionIcon(action.id)}
              </a>
            ))}
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
