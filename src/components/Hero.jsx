/**
 * Hero.jsx
 * Full-screen hero section with typing animation, animated avatar ring,
 * floating particles, and CTA buttons.
 */
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { personalInfo } from '../data'

/* Build the typing sequence from taglines array */
function buildTypeSequence(taglines) {
  const seq = []
  taglines.forEach((t) => { seq.push(t); seq.push(2000) })
  return seq
}

export default function Hero() {
  const socials = [
    { icon: <FiGithub />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FiLinkedin />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <FiTwitter />, href: personalInfo.twitter, label: 'Twitter' },
  ]

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Background Glow Orbs */}
      <div
        className="glow-orb"
        style={{ width: 600, height: 600, top: -200, left: -200, background: 'var(--gradient-start)' }}
      />
      <div
        className="glow-orb"
        style={{ width: 400, height: 400, bottom: -100, right: -100, background: 'var(--gradient-end)' }}
      />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.5,
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2.5rem',
          alignItems: 'center',
        }}
          className="hero-grid"
        >

          {/* Left — Text Content */}
          <div>
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 1rem',
                borderRadius: '50px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 900,
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>{personalInfo.name.split(' ').slice(1).join(' ')}</span>
              <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'clamp(1rem, 4vw, 1.6rem)', fontWeight: 600, marginTop: '0.5rem' }}>
                (Krushna081)
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
                minHeight: '2rem',
              }}
            >
              I'm a{' '}
              <TypeAnimation
                sequence={buildTypeSequence(personalInfo.taglines)}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: 'var(--accent)' }}
              />
            </motion.div>

            {/* About Blurb */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '2rem',
              }}
            >
              {personalInfo.about.slice(0, 160)}...
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}
            >
              <Link to="projects" smooth offset={-64} duration={600}>
                <button className="btn-primary">
                  View My Work <FiArrowDown />
                </button>
              </Link>
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-outline"
              >
                Download CV <FiDownload />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
            >
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Find me on:</span>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, color: 'var(--accent)' }}
                  style={{
                    width: 40, height: 40,
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="hero-avatar-wrapper"
          >
            <HeroAvatar />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Link to="about" smooth offset={-64} duration={600} style={{ cursor: 'pointer' }}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
              }}
            >
              <FiArrowDown style={{ fontSize: '1.2rem' }} />
              <span>Scroll</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .hero-grid { grid-template-columns: 1fr auto; }
        .hero-avatar-wrapper { display: block; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; justify-items: center; text-align: center; gap: 1.5rem !important; }
          .hero-grid > div:first-child { order: 2; display: flex; flex-direction: column; align-items: center; }
          .hero-avatar-wrapper { order: 1; }
        }
        @media (max-width: 480px) {
          .floating-badge { display: none !important; }
        }
      `}</style>
    </section>
  )
}

function HeroAvatar() {
  return (
    <div style={{ position: 'relative', width: 'clamp(180px, 30vw, 280px)', height: 'clamp(180px, 30vw, 280px)' }} className="animate-float">
      {/* Spinning gradient ring */}
      <div
        className="animate-spin-slow"
        style={{
          position: 'absolute', inset: -6,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)',
          zIndex: 0,
        }}
      />
      {/* White gap ring */}
      <div style={{
        position: 'absolute', inset: -2,
        borderRadius: '50%',
        backgroundColor: 'var(--bg-primary)',
        zIndex: 1,
      }} />
      {/* Avatar image */}
      <div
        className="hero-avatar-inner"
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          color: 'rgba(255,255,255,0.9)',
          userSelect: 'none',
        }}>
          KJ
        </span>
      </div>

      {/* Floating Tech Badges — hidden on very small screens via CSS */}
      <FloatingBadge label="Defense" icon="🛡️" style={{ top: 10, right: -30 }} delay={0} />
      <FloatingBadge label="Security" icon="🔒" style={{ bottom: 40, left: -40 }} delay={0.3} />
      <FloatingBadge label="Research" icon="🔬" style={{ bottom: 10, right: -20 }} delay={0.6} />
    </div>
  )
}

function FloatingBadge({ label, icon, style, delay }) {
  return (
    <motion.div
      className="floating-badge"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.8, type: 'spring' }}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '50px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        whiteSpace: 'nowrap',
        zIndex: 10,
        minHeight: 'unset', minWidth: 'unset',
        ...style,
      }}
    >
      {icon} {label}
    </motion.div>
  )
}
