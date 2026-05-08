export function ContactSection() {
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
