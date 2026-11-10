import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiExternalLink, FiGithub } from 'react-icons/fi'
import { personalInfo, projects } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const FILTERS = [
  'All',
  'Full Stack Development',
  'Cybersecurity',
  'Security Research',
  'Development',
  'Research',
]

/* Show the first batch of projects immediately; a future-proof
   "Load More" appears only when the data set grows. */
const INITIAL_VISIBLE = 6

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const [expanded, setExpanded] = useState(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  return (
    <section id="featured-projects" style={{ background: 'var(--color-bg)', borderTop: '3px solid var(--color-border)' }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label">02 — Portfolio</p>
          <h2 className="section-title">Featured <span className="tint">Projects</span></h2>
          <p className="section-subtitle">Real-world builds — from secure apps to security tools.</p>
        </motion.header>

        <motion.div {...reveal} className="filter-row" role="group" aria-label="Filter projects by category">
          {FILTERS.map(cat => (
            <button
              key={cat}
              type="button"
              className="filter-btn"
              aria-pressed={activeFilter === cat}
              onClick={() => { setActiveFilter(cat); setVisibleCount(INITIAL_VISIBLE) }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="project-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => {
              const isExpanded = expanded === project.id
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3), ease: 'easeOut' }}
                  className="brutal-card lift"
                  style={{ overflow: 'hidden', alignSelf: 'start' }}
                >
                  <div className="project-media">
                    <img src={project.image} alt={`Project: ${project.title}`}
                      width={600} height={338}
                      loading="lazy" decoding="async" />
                  </div>

                  <div style={{ padding: '1.15rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
                      <span className="brutal-tag" style={{ background: 'var(--color-secondary)', color: '#F5F1E8' }}>
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="brutal-tag" style={{ background: 'var(--color-primary)' }}>
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', lineHeight: 1.25, marginBottom: '0.6rem' }}>
                      {project.title}
                    </h3>

                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-fg-2)',
                      lineHeight: 1.65,
                      marginBottom: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: isExpanded ? 99 : 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {project.description}
                    </p>

                    <button type="button" className="read-more"
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? null : project.id)}>
                      {isExpanded ? 'Show less' : 'Read more'}
                      <FiChevronDown size={14} aria-hidden="true"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '0.9rem 0 1.1rem' }}>
                      {project.techStack.map(t => <span key={t} className="tech-pill">{t}</span>)}
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="brutal-btn"
                        style={{ padding: '0.5rem 0.9rem', fontSize: '0.78rem', minHeight: 44 }}
                        aria-label={`View ${project.title} source code on GitHub`}>
                        <FiGithub size={14} aria-hidden="true" /> Code
                      </a>
                      {project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="brutal-btn brutal-btn-alt"
                          style={{ padding: '0.5rem 0.9rem', fontSize: '0.78rem', minHeight: 44 }}
                          aria-label={`Open ${project.title} live demo`}>
                          <FiExternalLink size={14} aria-hidden="true" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        <motion.div {...reveal}
          style={{ marginTop: '2.25rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {hasMore && (
            <button type="button" className="brutal-btn brutal-btn-primary"
              onClick={() => setVisibleCount(filtered.length)}>
              Load More Projects <FiChevronDown aria-hidden="true" size={16} />
            </button>
          )}
          <a className="brutal-btn" href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            aria-label="View all projects on GitHub">
            <FiGithub size={16} aria-hidden="true" /> View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}
