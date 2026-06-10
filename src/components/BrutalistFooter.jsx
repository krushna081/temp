import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp, FiInstagram } from 'react-icons/fi'
import { personalInfo } from '../data'

const socials = [
  { icon: <FiGithub size={16} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiTwitter size={16} />, href: personalInfo.twitter, label: 'Twitter' },
  { icon: <FiInstagram size={16} />, href: personalInfo.instagram, label: 'Instagram' },
  { icon: <FiMail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const quickLinks = [
  { label: 'Identity', to: 'identity' },
  { label: 'Projects', to: 'featured-projects' },
  { label: 'Journey', to: 'journey' },
  { label: 'Skills', to: 'command-center' },
  { label: 'Terminal', to: 'terminal' },
  { label: 'Connect', to: 'collab' },
  { label: 'Resume', href: personalInfo.resumeUrl, isExternal: true },
]

export default function BrutalistFooter() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '3px solid var(--border)', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem 1.5rem' }}>
        <div className="footer-grid" style={{ paddingBottom: '1.5rem', borderBottom: '3px solid var(--border)', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)', marginBottom: '0.5rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {'<KJ />'}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: 260, marginBottom: '1rem' }}>
              Cybersecurity Engineer & Developer building secure, impactful solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {socials.map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  whileHover={{ y: -2 }}
                  className="brutal-btn" style={{ width: 36, height: 36, padding: 0, minHeight: 36, minWidth: 36, fontSize: '0.9rem' }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Navigate</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {quickLinks.map(l => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} smooth offset={-40} duration={500}
                      style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'color 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Current Focus</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Status', value: 'Available' },
                { label: 'Learning', value: 'Cyber & Digital Science' },
                { label: 'Building', value: 'Secure Applications' },
                { label: 'Researching', value: 'Dark Web Security' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            © {year} {personalInfo.name}. Built with React & Tailwind.
          </p>
          <Link to="identity" smooth offset={0} duration={800} style={{ cursor: 'pointer' }}>
            <motion.div whileHover={{ y: -2 }} className="brutal-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', minHeight: 36 }}>
              Back to Top <FiArrowUp size={14} />
            </motion.div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
