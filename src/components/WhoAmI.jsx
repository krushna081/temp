import { motion } from 'framer-motion'
import { FiBook, FiDownload, FiMail, FiMapPin } from 'react-icons/fi'
import { personalInfo } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const TRAITS = [
  { icon: <FiMapPin size={16} aria-hidden="true" />, label: 'Location', value: personalInfo.location },
  { icon: <FiMail size={16} aria-hidden="true" />, label: 'Email', value: personalInfo.email },
  { icon: <FiBook size={16} aria-hidden="true" />, label: 'Learning', value: 'Cyber & Digital Science' },
]

const STATS = [
  { value: '6+', label: 'Projects Built' },
  { value: '1y+', label: 'Dev Experience' },
  { value: '15+', label: 'PRs & Contributions' },
]

export default function WhoAmI() {
  return (
    <section id="whoami" style={{ background: 'var(--color-bg-alt)', borderTop: '3px solid var(--color-border)' }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label">03 — About</p>
          <h2 className="section-title">Who Am I<span className="tint">?</span></h2>
          <p className="section-subtitle">Ethical hacker, security researcher, and React developer based in Maharashtra, India.</p>
        </motion.header>

        <div className="about-grid">
          <motion.article {...reveal} className="brutal-card"
            style={{ padding: 'clamp(1.25rem, 4vw, 2.25rem)' }}>
            <p className="mono-meta" style={{ marginBottom: '0.9rem' }}>// my story</p>
            <p style={{
              fontSize: 'clamp(1rem, 2.4vw, 1.15rem)',
              fontWeight: 500,
              lineHeight: 1.65,
              color: 'var(--color-fg)',
              marginBottom: '1rem',
            }}>
              {personalInfo.about}
            </p>
            <p style={{
              color: 'var(--color-fg-2)',
              lineHeight: 1.7,
              fontSize: '0.95rem',
              marginBottom: '1.1rem',
            }}>
              {personalInfo.aboutLegacy}
            </p>
            <p style={{
              color: 'var(--color-fg-2)',
              lineHeight: 1.7,
              fontSize: '0.95rem',
              marginBottom: '1.6rem',
            }}>
              I believe great software is a blend of clean code, thoughtful UX, and genuine passion.
              I'm always looking for ways to grow and make an impact.
            </p>
            <a href={personalInfo.resumeUrl} download className="brutal-btn brutal-btn-ink">
              <FiDownload aria-hidden="true" size={16} /> Download Resume
            </a>
          </motion.article>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.aside {...reveal} className="brutal-card" style={{ padding: '1.35rem' }}>
              <p className="mono-meta" style={{ marginBottom: '0.9rem' }}>// quick facts</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                {TRAITS.map((t, i) => (
                  <li key={t.label} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.7rem',
                    padding: '0.7rem 0',
                    borderTop: i === 0 ? 'none' : '2px solid var(--color-bg-alt)',
                  }}>
                    <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                    <span style={{ minWidth: 0 }}>
                      <span className="stat-label" style={{ display: 'block', marginBottom: '0.1rem' }}>{t.label}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, overflowWrap: 'anywhere' }}>{t.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            <motion.aside {...reveal} className="brutal-card" style={{ padding: '1.35rem' }}>
              <p className="mono-meta" style={{ marginBottom: '0.9rem' }}>// education</p>
              <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.05rem' }}>
                {personalInfo.education.map((edu, i) => (
                  <li key={i} style={{ borderLeft: '3px solid var(--color-secondary)', paddingLeft: '0.9rem' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.96rem', lineHeight: 1.35, color: 'var(--color-fg)' }}>
                      {edu.degree}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-fg-2)', fontWeight: 600 }}>
                      {edu.institution}
                    </p>
                    <p className="mono-meta" style={{ marginTop: '0.15rem' }}>
                      {edu.year}{edu.grade ? ` · ${edu.grade}` : ''}
                    </p>
                  </li>
                ))}
              </ol>
            </motion.aside>
          </div>
        </div>

        <motion.div {...reveal}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginTop: '1.5rem' }}>
          {STATS.map(stat => (
            <div key={stat.label} className="brutal-card" style={{ padding: '1.1rem 0.6rem', textAlign: 'center' }}>
              <p className="stat-number">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
