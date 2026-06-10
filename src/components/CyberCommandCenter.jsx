import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data'

const panels = [
  { key: 'cybersecurity', label: 'Cybersecurity', emoji: '🛡️', color: 'var(--accent)' },
  { key: 'programming', label: 'Programming', emoji: '⚡', color: 'var(--accent-alt)' },
  { key: 'webdev', label: 'Web Dev', emoji: '🌐', color: 'var(--accent-green)' },
  { key: 'aiml', label: 'AI / ML', emoji: '🧠', color: 'var(--accent-yellow)' },
  { key: 'tools', label: 'Tools', emoji: '🔧', color: 'var(--accent-coral)' },
]

export default function CyberCommandCenter() {
  const [active, setActive] = useState('cybersecurity')

  const current = skills[active]
  const meta = panels.find(p => p.key === active)

  return (
    <section id="command-center" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Skills</div>
          <h2 className="section-title">Cyber Command Center</h2>
          <p className="section-subtitle">My arsenal of tools, technologies, and expertise.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {panels.map(p => (
            <button key={p.key} onClick={() => setActive(p.key)}
              style={{
                padding: '0.5rem 1rem', minHeight: 44,
                fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                cursor: 'pointer',
                border: '3px solid var(--border)',
                background: active === p.key ? p.color : 'var(--bg-card)',
                color: active === p.key ? '#fff' : 'var(--text-primary)',
                boxShadow: active === p.key ? '4px 4px 0px var(--shadow)' : 'none',
                transition: 'all 0.1s ease',
              }}>
              {p.emoji} {p.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {current.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="brutal-card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{skill.name}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                    border: '2px solid var(--border)',
                    background: meta?.color || 'var(--accent)',
                    color: '#fff',
                  }}>{skill.level}%</span>
                </div>
                <div className="progress-track">
                  <motion.div className="progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                    style={{ background: meta?.color || 'var(--accent)' }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="brutal-card" style={{ marginTop: '1.5rem', padding: '1.25rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            🚀 Always learning. Check my{' '}
            <a href="https://github.com/krushna081" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              GitHub
            </a>{' '}
            for the latest work.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
