import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { projects } from '../data'

const categories = ['All', 'Cybersecurity', 'Research', 'Development']

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="featured-projects" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Real-world builds — from secure apps to security tools.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.5rem 1.2rem', minHeight: 44,
                fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                cursor: 'pointer',
                border: '3px solid var(--border)',
                background: activeFilter === cat ? 'var(--accent)' : 'var(--bg-card)',
                color: activeFilter === cat ? '#fff' : 'var(--text-primary)',
                boxShadow: activeFilter === cat ? '4px 4px 0px var(--shadow)' : 'none',
                transition: 'all 0.1s ease',
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isExpanded = expanded === project.id
              return (
                <motion.div key={project.id} layout
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="brutal-card"
                  style={{ overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setExpanded(isExpanded ? null : project.id)}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={project.image} alt={project.title}
                        style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', borderBottom: '3px solid var(--border)' }}
                        loading="lazy" />
                      <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: '0.4rem' }}>
                        <span className="brutal-tag" style={{ background: 'var(--accent)', color: '#fff', border: '2px solid #000' }}>{project.category}</span>
                        {project.featured && <span className="brutal-tag" style={{ background: 'var(--accent-yellow)', color: '#000', border: '2px solid #000' }}>Featured</span>}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{project.title}</h3>
                        {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: isExpanded ? 10 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                        {project.techStack.map(t => <span key={t} className="tech-pill">{t}</span>)}
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="brutal-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.78rem', minHeight: 40 }}>
                          <FiGithub size={14} /> Code
                        </a>
                        {project.live !== '#' && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="brutal-btn brutal-btn-alt" style={{ padding: '0.5rem 1rem', fontSize: '0.78rem', minHeight: 40 }}>
                            <FiExternalLink size={14} /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
