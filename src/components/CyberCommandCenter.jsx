import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

export default function CyberCommandCenter() {
  const [active, setActive] = useState('cybersecurity')
  const current = skills[active]

  return (
    <section id="command-center" style={{ background: 'var(--color-bg)', borderTop: '3px solid var(--color-border)' }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label">04 — Skills</p>
          <h2 className="section-title">Cyber <span className="tint">Command Center</span></h2>
          <p className="section-subtitle">Security tooling, full-stack development, and AI engineering skills.</p>
        </motion.header>

        <motion.div {...reveal} className="skill-tabs" role="group" aria-label="Skill categories">
          {Object.keys(skills).map(key => (
            <button key={key} type="button"
              className="skill-tab"
              aria-pressed={active === key}
              onClick={() => setActive(key)}>
              {skills[key].label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}>
            <p className="mono-meta" style={{ marginBottom: '0.9rem' }}>{current.label}</p>
            <div className="skill-list">
              {current.items.map((skill, i) => (
                <motion.div key={skill.name}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="brutal-card lift"
                  style={{ padding: '0.95rem 1.15rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.55rem',
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-fg)' }}>{skill.name}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '0.18rem 0.5rem',
                      border: '2px solid var(--color-border)',
                      background: 'var(--color-secondary)',
                      color: '#F5F1E8',
                      flexShrink: 0,
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="progress-track" role="presentation">
                    <motion.div className="progress-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.15 + i * 0.05 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div {...reveal} className="brutal-card"
          style={{ marginTop: '1.75rem', padding: '1.25rem', textAlign: 'center', background: 'var(--color-bg-alt)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-fg-2)', fontWeight: 600 }}>
            Always learning. Check my{' '}
            <a href="https://github.com/krushna081" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              GitHub
            </a>{' '}
            for the latest work.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
