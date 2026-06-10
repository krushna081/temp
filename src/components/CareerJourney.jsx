import { useState } from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../data'
import useAutoScroll from './useAutoScroll'

function extractYear(period) {
  const match = period.match(/(\d{4})/)
  return match ? parseInt(match[1]) : 2025
}

const yearColors = {
  2023: 'var(--accent-coral)',
  2024: 'var(--accent-alt)',
  2025: 'var(--accent-green)',
  2026: 'var(--accent-yellow)',
}

function getYearColor(year) {
  const keys = Object.keys(yearColors).sort((a, b) => b - a)
  for (const k of keys) {
    if (year >= parseInt(k)) return yearColors[k]
  }
  return yearColors['2026']
}

export default function CareerJourney() {
  const [selected, setSelected] = useState(null)

  const grouped = [...experiences].sort((a, b) => extractYear(b.period) - extractYear(a.period))

  const roadmapRef = useAutoScroll({ speed: 0.3, mobileOnly: false })

  return (
    <section id="journey" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Journey</div>
          <h2 className="section-title">Career Timeline</h2>
          <p className="section-subtitle">Milestones, internships, and achievements that shaped my path.</p>
        </motion.div>

        <div ref={roadmapRef} className="roadmap-scroll" style={{ scrollBehavior: 'smooth' }}>
          {grouped.map((exp, i) => {
            const year = extractYear(exp.period)
            const color = getYearColor(year)
            const isSelected = selected === i

            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(isSelected ? null : i)}
                className="brutal-card"
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  borderTop: `6px solid ${color}`,
                  minHeight: isSelected ? 'auto' : 180,
                  transition: 'min-height 0.2s ease',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.2rem 0.5rem', border: '2px solid var(--border)', background: color, color: '#fff' }}>{exp.type === 'experience' ? '💼 Work' : '🏆 Award'}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>{exp.period}</span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{exp.title}</h3>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: color, marginBottom: '0.5rem' }}>{exp.organization}</p>

                <motion.p animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                  style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
                  {exp.description}
                </motion.p>

                {!isSelected && (
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.5rem' }}>
                    Tap to expand ▾
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
