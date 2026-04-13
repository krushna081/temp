/**
 * Projects.jsx
 * Projects section with category filter tabs, project cards with
 * image, tech stack tags, and links to GitHub + live demo.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data'

const categories = ['All', 'Cybersecurity', 'Research', 'Development']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="section-container" ref={ref}>
        <div className="divider-pill"><span>Portfolio</span></div>
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A curated selection of things I've built — from web apps to AI tools.
        </p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                border: activeFilter === cat ? 'none' : '1px solid var(--border)',
                background: activeFilter === cat
                  ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))'
                  : 'var(--bg-card)',
                color: activeFilter === cat ? '#fff' : 'var(--text-secondary)',
                boxShadow: activeFilter === cat ? '0 4px 15px var(--accent-glow)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .projects-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Project Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 180 }}>
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
        {/* Overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(99,102,241,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <IconLink href={project.github} icon={<FiGithub />} label="GitHub" />
          {project.live !== '#' && (
            <IconLink href={project.live} icon={<FiExternalLink />} label="Live Demo" />
          )}
        </motion.div>

        {/* Category Badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '0.2rem 0.6rem',
          borderRadius: '50px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 600,
        }}>
          {project.category}
        </div>

        {project.featured && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            padding: '0.2rem 0.6rem',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 700,
          }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: '1rem',
          flex: 1,
          whiteSpace: 'pre-wrap',
        }}>
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)',
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <FiGithub /> Code
          </a>
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function IconLink({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 48, height: 48,
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff',
        fontSize: '1.2rem',
        textDecoration: 'none',
      }}
    >
      {icon}
    </motion.a>
  )
}
