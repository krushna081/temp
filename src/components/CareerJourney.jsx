import { motion } from 'framer-motion'
import { experiences } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function extractYear(period) {
  const match = period.match(/(\d{4})/)
  return match ? parseInt(match[1], 10) : 2025
}

export default function CareerJourney() {
  const items = [...experiences].sort((a, b) => extractYear(b.period) - extractYear(a.period))

  return (
    <section id="journey" style={{ background: 'var(--color-bg-alt)', borderTop: '3px solid var(--color-border)' }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label">05 — Journey</p>
          <h2 className="section-title">Career <span className="tint">Timeline</span></h2>
          <p className="section-subtitle">Milestones, internships, and achievements that shaped my path.</p>
        </motion.header>

        <ol className="timeline">
          {items.map((exp, i) => (
            <li key={`${exp.title}-${exp.period}`} className="timeline-item">
              <span className="timeline-node" aria-hidden="true" />
              <motion.div {...reveal} transition={{ ...reveal.transition, delay: Math.min(i * 0.07, 0.35) }}
                className="brutal-card lift"
                style={{ padding: '1.25rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.4rem 0.75rem',
                  marginBottom: '0.65rem',
                }}>
                  <span className="brutal-tag" style={{
                    background: exp.type === 'experience' ? 'var(--color-secondary)' : 'var(--color-primary)',
                    color: exp.type === 'experience' ? '#F5F1E8' : 'var(--color-fg)',
                  }}>
                    {exp.type === 'experience' ? 'Work' : 'Achievement'}
                  </span>
                  <span className="mono-meta">{exp.period}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.15rem' }}>{exp.title}</h3>
                {exp.organization && (
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-fg-2)', marginBottom: '0.55rem' }}>
                    {exp.organization}
                  </p>
                )}
                <p style={{ fontSize: '0.88rem', color: 'var(--color-fg-2)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
