import { strengths } from '../data/portfolio'

export function OverviewSection() {
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
