import { Link } from 'react-scroll'
import {
  FiArrowUp, FiGithub, FiInstagram, FiLinkedin, FiMail, FiTwitter,
} from 'react-icons/fi'
import { personalInfo } from '../data'

const SOCIALS = [
  { icon: <FiGithub size={18} aria-hidden="true" />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin size={18} aria-hidden="true" />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiTwitter size={18} aria-hidden="true" />, href: personalInfo.twitter, label: 'Twitter' },
  { icon: <FiInstagram size={18} aria-hidden="true" />, href: personalInfo.instagram, label: 'Instagram' },
  { icon: <FiMail size={18} aria-hidden="true" />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const QUICK_LINKS = [
  { label: 'Home', to: 'identity' },
  { label: 'Projects', to: 'featured-projects' },
  { label: 'About', to: 'whoami' },
  { label: 'Skills', to: 'command-center' },
  { label: 'Journey', to: 'journey' },
  { label: 'Research', to: 'research' },
  { label: 'Connect', to: 'collab' },
  { label: 'Resume', href: personalInfo.resumeUrl },
]

/* Footer keeps its Warm-Porcelain-on-Midnight-Ink identity in both themes. */
const INK = '#171B24'
const PORCELAIN = '#F5F1E8'

export default function BrutalistFooter() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '3px solid var(--color-border)', background: INK, color: PORCELAIN }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(2.5rem, 7vw, 3.5rem) 1.125rem 1.5rem' }}>
        <div className="footer-grid" style={{
          paddingBottom: '2rem',
          borderBottom: `3px solid ${PORCELAIN}`,
          marginBottom: '1.25rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.7rem',
              fontWeight: 700,
              color: PORCELAIN,
              marginBottom: '0.6rem',
              lineHeight: 1,
            }}>
              &lt;KJ <span style={{ color: '#E65B36' }}>/</span>&gt;
            </div>
            <p style={{ color: '#C9C4B6', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 280, marginBottom: '1.1rem' }}>
              Cybersecurity Engineer &amp; Developer building secure, impactful solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#8C8D7C',
              marginBottom: '0.8rem',
            }}>
              Navigate
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      className="footer-link">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} smooth offset={-84} duration={450}
                      className="footer-link"
                      style={{ cursor: 'pointer' }}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#8C8D7C',
              marginBottom: '0.8rem',
            }}>
              Current Focus
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[
                { label: 'Status', value: 'Available' },
                { label: 'Learning', value: 'Cyber & Digital Science' },
                { label: 'Building', value: 'Secure Applications' },
                { label: 'Researching', value: 'Dark Web Security' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8C8D7C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: PORCELAIN, textAlign: 'right' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: '#C9C4B6', fontSize: '0.75rem', fontWeight: 500 }}>
            © {year} {personalInfo.name}. Built with <span aria-hidden="true">❤️</span> love
          </p>
          <Link to="identity" smooth offset={-84} duration={800} style={{ cursor: 'pointer' }}>
            <button
              type="button"
              className="footer-social"
              style={{ width: 'auto', padding: '0.55rem 0.9rem', gap: '0.45rem', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}
              aria-label="Back to top">
              Back to Top <FiArrowUp size={14} aria-hidden="true" />
            </button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
