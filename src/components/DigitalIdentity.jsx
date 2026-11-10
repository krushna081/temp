import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiEye, FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { personalInfo } from '../data'
import { showDotGrid } from '../config'

const STATS = [
  { value: '6+', label: 'Projects' },
  { value: '1y+', label: 'Experience' },
  { value: '15+', label: 'PRs Merged' },
  { value: '4', label: 'Research' },
]

const ROLES = [
  'Cyber & Digital Science Student',
  'Web & Security Developer',
  'Cybersecurity Researcher',
  'Ethical Hacker',
]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

export default function DigitalIdentity() {
  const firstName = personalInfo.name.split(' ')[0]
  const lastName = personalInfo.name.split(' ').slice(1).join(' ')

  return (
    <section id="identity" className="hero" style={{
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {showDotGrid && <div className="dot-grid" aria-hidden="true" />}

      <div className="container-x" style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'clamp(2.5rem, 8vw, 5rem)',
      }}>
        <motion.div {...fadeUp(0)} className="brutal-tag"
          style={{ alignSelf: 'flex-start', gap: '0.55rem', marginBottom: '1.5rem' }}>
          <span aria-hidden="true" className="status-pulse"
            style={{ width: 8, height: 8, background: 'var(--color-primary)', border: '2px solid var(--color-border)', display: 'inline-block' }} />
          Available for work &amp; collaboration
        </motion.div>

        <motion.h1 {...fadeUp(0.08)}
          style={{ fontSize: 'clamp(3.2rem, 15.5vw, 7rem)', lineHeight: 0.92, marginBottom: '1.4rem' }}>
          <span style={{ color: 'var(--color-primary)' }}>{firstName}</span>
          <br />
          <span>{lastName}</span>
        </motion.h1>

        <motion.div {...fadeUp(0.16)} className="role-strip" style={{ marginBottom: '1.4rem' }}>
          {ROLES.map((role, i) => (
            <Fragment key={role}>
              {i > 0 && <span className="role-sep" aria-hidden="true">/</span>}
              <span className="role-item">{role}</span>
            </Fragment>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.24)}
          style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.06rem)', lineHeight: 1.7, color: 'var(--color-fg-2)', maxWidth: 580, marginBottom: '1.9rem' }}>
          {personalInfo.about.slice(0, 180)}...
        </motion.p>

        <motion.div {...fadeUp(0.3)}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: 'clamp(2rem, 6vw, 3rem)' }}>
          <Link to="featured-projects" smooth offset={-84} duration={500}>
            <button type="button" className="brutal-btn brutal-btn-primary">
              <FiEye aria-hidden="true" size={16} /> View Work
            </button>
          </Link>
          <a href={personalInfo.resumeUrl} download className="brutal-btn brutal-btn-ink">
            <FiDownload aria-hidden="true" size={16} /> Resume
          </a>
          <Link to="collab" smooth offset={-84} duration={500}>
            <button type="button" className="brutal-btn brutal-btn-alt">
              <FiMail aria-hidden="true" size={16} /> Contact
            </button>
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.38)}>
          <hr className="rule" style={{ marginBottom: '1.1rem' }} />
          <p className="mono-meta" style={{ marginBottom: '0.75rem' }}>Quick stats</p>
          <div className="stat-grid">
            {STATS.map(s => (
              <div key={s.label} className="brutal-card" style={{ padding: '1rem 1.1rem' }}>
                <p className="stat-number">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.5)}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2.25rem', paddingBottom: '1rem' }}>
        <Link to="featured-projects" smooth offset={-84} duration={500} aria-label="Scroll down to projects"
          style={{ textDecoration: 'none' }}>
          <div className="scroll-cue" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.15rem',
            color: 'var(--color-fg-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}>
            <FiArrowDown aria-hidden="true" size={18} />
            <span>Scroll</span>
          </div>
        </Link>
      </motion.div>
    </section>
  )
}
