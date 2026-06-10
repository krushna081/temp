import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiEye, FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { personalInfo } from '../data'
import useAutoScroll from './useAutoScroll'
import { showDotGrid } from '../config'

export default function DigitalIdentity() {
  const stats = [
    { value: '6+', label: 'Projects' },
    { value: '1y+', label: 'Experience' },
    { value: '15+', label: 'PRs Merged' },
    { value: '4', label: 'Research' },
  ]

  const roles = [
    'Cyber & Digital Science Student',
    'Web & Security Developer',
    'Cybersecurity Researcher',
    'Ethical Hacker',
  ]

  const statScrollRef = useAutoScroll({ speed: 0.4, mobileOnly: true })

  return (
    <section id="identity" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      paddingTop: '3rem',
      paddingBottom: '2rem',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Layer 1: Solid background (via section background) */}

      {/* Layer 2: Dot Grid */}
      {showDotGrid && <div className="dot-grid" />}

      {/* Layer 3: Hero Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 800,
        margin: '0 auto',
        width: '100%',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <div className="badge-primary" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: 7, height: 7, background: '#fff', display: 'inline-block' }} className="status-pulse" />
            AVAILABLE FOR WORK
          </div>

          <h1 style={{ fontSize: 'clamp(2.8rem, 12vw, 5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--accent)' }}>{personalInfo.name.split(' ')[0]}</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>{personalInfo.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <div style={{ marginBottom: '1.5rem' }}>
            {roles.map((role, i) => (
              <motion.div key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>▸</span>
                <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 600, color: 'var(--text-secondary)' }}>{role}</span>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 480, marginBottom: '1.5rem' }}>
            {personalInfo.about.slice(0, 180)}...
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
            <Link to="featured-projects" smooth offset={-40} duration={500}>
              <button className="brutal-btn brutal-btn-primary"><FiEye size={16} /> View Work</button>
            </Link>
            <a href={personalInfo.resumeUrl} download className="brutal-btn"><FiDownload size={16} /> Resume</a>
            <Link to="collab" smooth offset={-40} duration={500}>
              <button className="brutal-btn brutal-btn-alt"><FiMail size={16} /> Contact</button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Quick Stats</span>
          </div>
          <div ref={statScrollRef} className="stat-scroll" style={{ scrollBehavior: 'smooth' }}>
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}
                className="brutal-card" style={{ padding: '1rem 1.25rem', minWidth: 120, flexShrink: 0 }}>
                <p className="stat-number">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', paddingBottom: '0.25rem' }}>
        <Link to="featured-projects" smooth offset={-40} duration={500} style={{ cursor: 'pointer' }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>
            <FiArrowDown size={18} />
            <span>SCROLL</span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
