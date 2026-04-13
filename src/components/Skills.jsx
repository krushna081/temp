/**
 * Skills.jsx
 * Skills section with animated progress bars and categorized tabs.
 * Categories: Frontend, Backend, Tools, AI/ML
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data'

const categoryMeta = {
  frontend: { label: 'Frontend', emoji: '🎨', color: '#6366f1' },
  backend: { label: 'Backend', emoji: '⚙️', color: '#22c55e' },
  tools: { label: 'Tools', emoji: '🛠️', color: '#f59e0b' },
  aiml: { label: 'AI / ML', emoji: '🤖', color: '#ec4899' },
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const currentSkills = skills[activeTab]
  const meta = categoryMeta[activeTab]

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="section-container" ref={ref}>
        <div className="divider-pill"><span>Skills</span></div>
        <h2 className="section-title">My Tech Stack</h2>
        <p className="section-subtitle">
          Technologies I work with day-to-day, across the full development spectrum.
        </p>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {Object.entries(categoryMeta).map(([key, { label, emoji }]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeTab === key ? 'none' : '1px solid var(--border)',
                background: activeTab === key
                  ? `linear-gradient(135deg, ${categoryMeta[key].color}cc, ${categoryMeta[key].color})`
                  : 'var(--bg-card)',
                color: activeTab === key ? '#fff' : 'var(--text-secondary)',
                boxShadow: activeTab === key ? `0 4px 15px ${categoryMeta[key].color}44` : 'none',
              }}
            >
              {emoji} {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Bars */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1.25rem',
          }}
          className="skills-grid"
        >
          {currentSkills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={i}
              inView={inView}
              color={meta.color}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            🚀 Always learning. Check my{' '}
            <a href="https://github.com/krushna081" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              GitHub
            </a>{' '}
            for the latest projects and contributions.
          </p>
        </motion.div>
      </div>

      <style>{`
        .skills-grid { grid-template-columns: repeat(2,1fr); }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function SkillBar({ skill, index, inView, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-card"
      style={{ padding: '1.1rem 1.25rem' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.6rem',
      }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: color,
          background: `${color}18`,
          padding: '0.15rem 0.5rem',
          borderRadius: '50px',
        }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress Track */}
      <div style={{
        height: 7,
        borderRadius: '50px',
        backgroundColor: 'var(--border)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.07, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: '50px',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </motion.div>
  )
}
