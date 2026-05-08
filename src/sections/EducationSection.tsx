export function EducationSection() {
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
