import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiDownload, FiGithub, FiInstagram, FiLinkedin, FiMail,
  FiMenu, FiMove, FiMoon, FiSun, FiTwitter, FiX,
} from 'react-icons/fi'
import { Link } from 'react-scroll'
import { useTheme } from '../context/ThemeContext'
import { personalInfo } from '../data'

const NAV_ITEMS = [
  { num: '01', label: 'Home', to: 'identity' },
  { num: '02', label: 'Projects', to: 'featured-projects' },
  { num: '03', label: 'About', to: 'whoami' },
  { num: '04', label: 'Skills', to: 'command-center' },
  { num: '05', label: 'Journey', to: 'journey' },
  { num: '06', label: 'Research', to: 'research' },
  { num: '07', label: 'Connect', to: 'collab' },
]

const SOCIALS = [
  { icon: <FiGithub />, href: personalInfo.github, label: 'GitHub' },
  { icon: <FiLinkedin />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <FiTwitter />, href: personalInfo.twitter, label: 'Twitter' },
  { icon: <FiInstagram />, href: personalInfo.instagram, label: 'Instagram' },
  { icon: <FiMail />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Header({ gravityEnabled, onToggleGravity }) {
  const { isDark, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="identity" smooth offset={-84} duration={500} className="brand"
            aria-label="Krushna081 — back to top">
            <span className="brand-mark" aria-hidden="true">KJ</span>
            <span className="brand-name">KRUSHNA081</span>
          </Link>

          <nav className="header-nav" aria-label="Primary navigation">
            {NAV_ITEMS.map(item => (
              <Link key={item.to} to={item.to} smooth spy offset={-84} duration={500}
                className="header-link" activeClass="active">
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onToggleGravity}
              aria-pressed={gravityEnabled}
              aria-label={gravityEnabled ? 'Disable gravity experiment' : 'Enable gravity experiment'}
              title={gravityEnabled ? 'Disable gravity experiment' : 'Enable gravity experiment'}
              className={`icon-btn header-extra${gravityEnabled ? ' is-accent' : ''}`}
            >
              <FiMove aria-hidden="true" />
            </button>

            <a className="icon-btn header-extra" href={personalInfo.resumeUrl} download
              aria-label="Download resume (PDF)">
              <FiDownload aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="icon-btn menu-btn"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <FiMenu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, x: '-6%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-6%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="menu-overlay-top">
              <span className="brand">
                <span className="brand-mark" aria-hidden="true">KJ</span>
                <span className="brand-name">KRUSHNA081</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="icon-btn"
                aria-label="Close navigation menu"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <ul className="menu-list">
              {NAV_ITEMS.map(item => (
                <li key={item.to}>
                  <Link to={item.to} smooth offset={-84} duration={450}
                    className="menu-item" onClick={() => setOpen(false)}>
                    <span className="menu-item-num" aria-hidden="true">{item.num}</span>
                    <span className="menu-item-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="menu-foot">
              <button type="button" onClick={toggleTheme} className="icon-btn"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={onToggleGravity}
                aria-pressed={gravityEnabled}
                aria-label={gravityEnabled ? 'Disable gravity experiment' : 'Enable gravity experiment'}
                className={`icon-btn${gravityEnabled ? ' is-accent' : ''}`}
              >
                <FiMove aria-hidden="true" />
              </button>
              <a className="brutal-btn brutal-btn-ink" href={personalInfo.resumeUrl} download
                onClick={() => setOpen(false)}>
                Resume <FiDownload aria-hidden="true" size={16} />
              </a>
            </div>

            <div className="menu-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
