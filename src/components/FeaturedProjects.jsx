import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiExternalLink, FiGithub } from 'react-icons/fi'
import { personalInfo, projects } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const FILTERS = [
  'All',
  'AI Engineering',
  'Full Stack Development',
  'Cybersecurity',
  'Security Research',
  'Development',
  'Research',
]

/* Initially shown featured projects; the rest unfolds via
   "Explore More Projects" and collapses with "Show Less Projects". */
const FEATURED_COUNT = 3

function ProjectCardBody({ project, isHero }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ padding: isHero ? 'clamp(1.3rem, 3vw, 1.8rem)' : '1.15rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
        <span className="brutal-tag" style={{ background: 'var(--color-secondary)', color: '#F5F1E8' }}>
          {project.category}
        </span>
        {project.status && (
          <span className="brutal-tag" style={{ background: 'var(--color-fg)', color: '#F5F1E8' }}>
            {project.status}
          </span>
        )}
        {project.featured && !isHero && (
          <span className="brutal-tag" style={{ background: 'var(--color-primary)' }}>
            Featured
          </span>
        )}
      </div>

      <h3 style={{
        fontSize: isHero ? 'clamp(1.35rem, 3.2vw, 1.75rem)' : '1.2rem',
        lineHeight: 1.2,
        marginBottom: '0.6rem',
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: isHero ? '0.95rem' : '0.9rem',
        color: 'var(--color-fg-2)',
        lineHeight: 1.65,
        marginBottom: 0,
        display: '-webkit-box',
        WebkitLineClamp: expanded ? 99 : isHero ? 5 : 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {project.description}
      </p>

      <button type="button" className="read-more"
        aria-expanded={expanded}
        onClick={() => setExpanded(prev => !prev)}>
        {expanded ? 'Show less' : 'Read more'}
        <FiChevronDown size={14} aria-hidden="true"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
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
  )
}

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedAll, setExpandedAll] = useState(false)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const featured = filtered.slice(0, FEATURED_COUNT)
  const rest = filtered.slice(FEATURED_COUNT)
  const hasMore = rest.length > 0

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
              onClick={() => { setActiveFilter(cat); setExpandedAll(false) }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="featured-grid">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.3), ease: 'easeOut' }}
              className={`brutal-card lift${i === 0 && featured.length > 2 ? ' featured-hero' : ''}`}
              style={{ overflow: 'hidden', alignSelf: 'start' }}
            >
              <div className="project-media">
                <img src={project.image} alt={`Project: ${project.title}`}
                  width={600} height={338}
                  loading="lazy" decoding="async" />
              </div>
              <ProjectCardBody project={project} isHero={i === 0 && featured.length > 2} />
            </motion.article>
          ))}
        </motion.div>

        <AnimatePresence initial={false}>
          {expandedAll && rest.length > 0 && (
            <motion.div layout
              id="all-projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div layout className="project-grid" style={{ marginTop: '2rem' }}>
                {rest.map((project, i) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3), ease: 'easeOut' }}
                    className="brutal-card lift"
                    style={{ overflow: 'hidden', alignSelf: 'start' }}
                  >
                    <div className="project-media">
                      <img src={project.image} alt={`Project: ${project.title}`}
                        width={600} height={338}
                        loading="lazy" decoding="async" />
                    </div>
                    <ProjectCardBody project={project} isHero={false} />
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div {...reveal}
          style={{ marginTop: '2.25rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {hasMore && (
            <button type="button" className="brutal-btn brutal-btn-primary"
              aria-expanded={expandedAll}
              aria-controls="all-projects-grid"
              onClick={() => setExpandedAll(prev => !prev)}>
              {expandedAll
                ? <>Show Less Projects <FiChevronUp aria-hidden="true" size={16} /></>
                : <>Explore More Projects <FiChevronDown aria-hidden="true" size={16} /></>}
            </button>
          )}
          <a className="brutal-btn" href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            aria-label="View all projects on GitHub">
            <FiGithub size={16} aria-hidden="true" /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
