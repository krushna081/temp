/**
 * Footer.jsx
 * Footer with social links, quick nav, copyright, and a back-to-top button.
 */
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi'
import { personalInfo } from '../data'

const socials = [
  { icon: <FiGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiTwitter size={18} />, href: personalInfo.twitter, label: 'Twitter' },
  { icon: <FiMail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const quickLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '2rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '1.5rem',
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem',
            }}>
              {'<KB />'}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 260, marginBottom: '1.25rem' }}>
              Computer Science student & Full Stack Developer building elegant, impactful solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, color: 'var(--accent)' }}
                  style={{
                    width: 36, height: 36,
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    backgroundColor: 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} smooth offset={-64} duration={600}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's Connect */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Open To
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Freelance Projects', 'Full-Time Roles', 'Open Source', 'Hackathons'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.87rem', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            © {year} {personalInfo.name}. Built with React & Tailwind CSS. ❤️
          </p>
          <Link to="hero" smooth offset={-64} duration={800} style={{ cursor: 'pointer' }}>
            <motion.div
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
            >
              Back to Top <FiArrowUp />
            </motion.div>
          </Link>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1.5fr 1fr 1fr; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
