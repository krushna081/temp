/**
 * Navbar.jsx
 * Sticky navigation bar with:
 * - Frosted-glass effect on scroll
 * - Full-screen slide-in mobile menu with backdrop overlay
 * - Dark/Light mode toggle
 * - Active section highlighting via react-scroll spy
 * - Smooth close on link click or outside tap
 * - "Terminal" link added for new section
 */
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon, FiTerminal } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'Home',       to: 'hero' },
  { label: 'About',      to: 'about' },
  { label: 'Projects',   to: 'projects' },
  { label: 'Skills',     to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Terminal',   to: 'terminal', icon: <FiTerminal size={13} /> },
  { label: 'Contact',    to: 'contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isOpen, setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: scrolled
            ? (isDark ? 'rgba(3,7,18,0.92)' : 'rgba(248,250,252,0.92)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

            {/* Logo */}
            <Link to="hero" smooth spy offset={-64} style={{ cursor: 'pointer', minHeight: 'unset', minWidth: 'unset' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {'<KJ />'}
              </motion.div>
            </Link>

            {/* Desktop Nav Links */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}
              className="nav-desktop"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  spy
                  offset={-64}
                  duration={600}
                  activeClass="nav-link-active"
                  style={{ minHeight: 'unset', minWidth: 'unset' }}
                >
                  <motion.span
                    whileHover={{ color: 'var(--accent)' }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.icon && link.icon}
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
            </div>

            {/* Mobile Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="nav-mobile">
              <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setIsOpen(o => !o)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen
                    ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><HiX /></motion.span>
                    : <motion.span key="m"  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><HiMenu /></motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(280px, 85vw)',
              zIndex: 999,
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              borderLeft: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem',
              overflowY: 'auto',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {'<KJ />'}
              </span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={close}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                }}
                aria-label="Close menu"
              >
                <HiX />
              </motion.button>
            </div>

            {/* Drawer Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.22 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    spy
                    offset={-64}
                    duration={600}
                    onClick={close}
                    style={{ minHeight: 'unset', minWidth: 'unset' }}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease, color 0.15s ease',
                      }}
                      onHoverStart={e => { e.target.style.background = 'var(--bg-secondary)'; e.target.style.color = 'var(--accent)' }}
                      onHoverEnd={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-secondary)' }}
                    >
                      {link.icon && <span style={{ color: 'var(--accent)' }}>{link.icon}</span>}
                      {link.label}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '10px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              textAlign: 'center',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', marginRight: '0.4rem' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Available for opportunities</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile  { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
        .nav-link-active span {
          color: var(--accent) !important;
          background: rgba(99,102,241,0.08);
        }
      `}</style>
    </>
  )
}

function ThemeButton({ isDark, toggleTheme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-secondary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </motion.button>
  )
}
