/**
 * Navbar.jsx
 * Sticky navigation bar with smooth scroll links, dark/light toggle,
 * mobile hamburger menu, and active section highlighting.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled
          ? (isDark ? 'rgba(3,7,18,0.9)' : 'rgba(248,250,252,0.9)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="hero" smooth spy offset={-64} style={{ cursor: 'pointer' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.3rem',
                background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {'<KB />'}
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                spy
                offset={-64}
                duration={600}
                activeClass="nav-link-active"
              >
                <motion.span
                  whileHover={{ color: 'var(--accent)' }}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="show-mobile">
            <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--border)',
                paddingBottom: '1rem',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    spy
                    offset={-64}
                    duration={600}
                    onClick={() => setIsOpen(false)}
                  >
                    <div style={{
                      padding: '0.75rem 0.5rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      borderRadius: '8px',
                    }}>
                      {link.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}

function ThemeButton({ isDark, toggleTheme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
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
        fontSize: '1.05rem',
        transition: 'all 0.2s ease',
      }}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </motion.button>
  )
}
