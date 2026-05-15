import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { contactActions } from '../../data/portfolio'
import './OverviewSection.css'

type TypedTextProps = {
  as?: 'span' | 'strong'
  className?: string
  text: string
  delay: number
  duration?: number
  block?: boolean
}

function TypedText({
  as: Component = 'span',
  className,
  text,
  delay,
  duration = Math.max(text.length * 0.045, 0.9),
  block = false,
}: TypedTextProps) {
  const [visibleText, setVisibleText] = useState('')
  const [showCaret, setShowCaret] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setVisibleText(text)
      setShowCaret(false)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleText(text)
      setShowCaret(false)
      return
    }

    let typingInterval: number | null = null
    let caretTimeout: number | null = null

    const startDelay = window.setTimeout(() => {
      setShowCaret(true)

      if (text.length === 0) {
        setShowCaret(false)
        return
      }

      const stepDuration = Math.max((duration * 1000) / text.length, 28)
      let index = 0

      typingInterval = window.setInterval(() => {
        index += 1
        setVisibleText(text.slice(0, index))

        if (index >= text.length) {
          if (typingInterval !== null) {
            window.clearInterval(typingInterval)
          }
          caretTimeout = window.setTimeout(() => setShowCaret(false), 450)
        }
      }, stepDuration)
    }, delay * 1000)

    return () => {
      window.clearTimeout(startDelay)
      if (typingInterval !== null) {
        window.clearInterval(typingInterval)
      }
      if (caretTimeout !== null) {
        window.clearTimeout(caretTimeout)
      }
    }
  }, [delay, duration, text])

  return (
    <Component
      className={
        className
          ? `typed-line${block ? ' typed-line-block' : ''} ${className}`
          : `typed-line${block ? ' typed-line-block' : ''}`
      }
    >
      <span className={showCaret ? 'typed-line-text typed-line-text-caret' : 'typed-line-text'}>
        {visibleText}
      </span>
    </Component>
  )
}

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
          <p className="section-kicker">
            <TypedText text="Welcome" delay={0.1} />
          </p>
          <h2 id="hero-title">
            <TypedText text="Hi, I'm Ziqing -" delay={0.45} duration={1.2} />
          </h2>
          <h2>
            <TypedText
              text="I enjoy challenging problems and turning ideas into reality."
              delay={1.85}
              duration={2.7}
            />
          </h2>

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
            <span className="label">
              <TypedText text="Current role" delay={3.9} duration={0.9} />
            </span>
            <TypedText as="strong" text="Research Assistant" delay={4.35} duration={1.1} block />
            <TypedText
              as="strong"
              text="at BC Centre of Disease Control"
              delay={5}
              duration={1.8}
              block
            />
          </div>
          <div className="hero-stat">
            <span className="label">
              <TypedText text="Focus" delay={5.95} duration={0.7} />
            </span>
            <TypedText as="strong" text="Modernization" delay={6.35} duration={0.9} block />
            <TypedText as="strong" text="Machine Learning" delay={6.85} duration={1.05} block />
            <TypedText
              as="strong"
              text="Environmental & Public Health"
              delay={7.45}
              duration={1.7}
              block
            />
          </div>
          <div className="hero-stat">
            <span className="label">
              <TypedText text="Education" delay={8.4} duration={0.8} />
            </span>
            <TypedText as="strong" text="UBC Computer Science" delay={8.85} duration={1.15} block />
            <TypedText as="strong" text="4th year" delay={9.5} duration={0.75} block />
          </div>
        </aside>
      </section>
    </>
  )
}
