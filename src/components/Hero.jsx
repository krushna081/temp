/**
 * Hero.jsx
 * Full-screen hero section with typing animation, animated avatar ring,
 * floating particles, and CTA buttons.
 */
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaGitAlt, FaGithub, FaLinux } from 'react-icons/fa'
import { personalInfo } from '../data'
import { ParallaxWrapper, MagneticWrapper } from './AntiGravityLayers'

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
    { icon: <FiInstagram />, href: personalInfo.instagram, label: 'Instagram' },
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

      {/* Floating Background Logos */}
      <FloatingTechLogos />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
        <ParallaxWrapper sensitivity={0.03}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
            className="hero-content"
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
                margin: '0 auto 2rem auto',
              }}
            >
              {personalInfo.about.slice(0, 160)}...
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}
            >
              <MagneticWrapper>
                <Link to="projects" smooth offset={-64} duration={600}>
                  <button className="btn-primary">
                    View My Work <FiArrowDown />
                  </button>
                </Link>
              </MagneticWrapper>
              <MagneticWrapper>
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn-outline"
                >
                  Download CV <FiDownload />
                </a>
              </MagneticWrapper>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', alignItems: 'center' }}
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
        </div>
      </ParallaxWrapper>

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
        @media (max-width: 768px) {
          .hero-content {
            padding: 1rem;
          }
          .floating-logo-item {
            font-size: clamp(32px, 5vw, 48px) !important;
            opacity: 0.2 !important;
          }
          .floating-logo-item:nth-child(3n) {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .floating-logo-item:nth-child(even) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function FloatingTechLogos() {
  const logos = [
    // Group 1 (Main evenly spaced)
    { Icon: FaHtml5, color: '#E34F26', top: '10%', left: '8%', size: 40, delay: 0 },
    { Icon: FaCss3Alt, color: '#1572B6', top: '65%', left: '12%', size: 50, delay: 1.5 },
    { Icon: FaJs, color: '#F7DF1E', top: '25%', left: '85%', size: 35, delay: 0.5 },
    { Icon: FaPython, color: '#3776AB', top: '75%', left: '80%', size: 55, delay: 2 },
    { Icon: FaGitAlt, color: '#F05032', top: '85%', left: '35%', size: 40, delay: 1 },
    { Icon: FaGithub, color: 'rgba(255,255,255,0.7)', top: '15%', left: '50%', size: 45, delay: 2.5 },
    { Icon: FaLinux, color: '#FCC624', top: '45%', left: '90%', size: 60, delay: 0.8 },
    
    // Group 2 (Scattered fillers)
    { Icon: FaHtml5, color: '#E34F26', top: '40%', left: '5%', size: 25, delay: 3 },
    { Icon: FaCss3Alt, color: '#1572B6', top: '85%', left: '60%', size: 30, delay: 4 },
    { Icon: FaJs, color: '#F7DF1E', top: '10%', left: '30%', size: 40, delay: 2.2 },
    { Icon: FaPython, color: '#3776AB', top: '50%', left: '20%', size: 65, delay: 1.8 },
    { Icon: FaGitAlt, color: '#F05032', top: '35%', left: '65%', size: 45, delay: 3.5 },
    { Icon: FaGithub, color: 'rgba(255,255,255,0.7)', top: '80%', left: '15%', size: 55, delay: 1.2 },
    { Icon: FaLinux, color: '#FCC624', top: '20%', left: '70%', size: 35, delay: 4.5 },

    // Group 3 (Edge pieces)
    { Icon: FaHtml5, color: '#E34F26', top: '90%', left: '85%', size: 45, delay: 5 },
    { Icon: FaCss3Alt, color: '#1572B6', top: '5%', left: '70%', size: 35, delay: 2.8 },
    { Icon: FaJs, color: '#F7DF1E', top: '60%', left: '45%', size: 50, delay: 3.2 },
    { Icon: FaPython, color: '#3776AB', top: '95%', left: '45%', size: 30, delay: 1.5 },
    { Icon: FaGitAlt, color: '#F05032', top: '5%', left: '90%', size: 25, delay: 0.2 },
    { Icon: FaGithub, color: 'rgba(255,255,255,0.7)', top: '55%', left: '5%', size: 38, delay: 4.8 },
    { Icon: FaLinux, color: '#FCC624', top: '30%', left: '40%', size: 50, delay: 2.6 },

    // Group 4 (Dense core and extra scattered)
    { Icon: FaHtml5, color: '#E34F26', top: '75%', left: '5%', size: 30, delay: 1.3 },
    { Icon: FaCss3Alt, color: '#1572B6', top: '25%', left: '55%', size: 55, delay: 3.8 },
    { Icon: FaJs, color: '#F7DF1E', top: '85%', left: '90%', size: 40, delay: 4.1 },
    { Icon: FaPython, color: '#3776AB', top: '15%', left: '95%', size: 30, delay: 0.9 },
    { Icon: FaGitAlt, color: '#F05032', top: '55%', left: '80%', size: 60, delay: 5.2 },
    { Icon: FaGithub, color: 'rgba(255,255,255,0.7)', top: '40%', left: '30%', size: 45, delay: 2.1 },
    { Icon: FaLinux, color: '#FCC624', top: '65%', left: '35%', size: 42, delay: 3.4 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {logos.map((logo, i) => {
        const { Icon, color, top, left, size, delay } = logo
        return (
          <motion.div
            key={i}
            className="floating-logo-item"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.15,
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 10, -10, 0],
              z: [0, 20, 0], // Simulating 3D depth
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              opacity: { duration: 2 },
              y: { duration: 15 + (i % 5) * 3, repeat: Infinity, ease: 'easeInOut', delay },
              x: { duration: 18 + (i % 5) * 3, repeat: Infinity, ease: 'easeInOut', delay },
              rotate: { duration: 20 + (i % 5) * 3, repeat: Infinity, ease: 'easeInOut', delay },
              z: { duration: 12 + (i % 5) * 3, repeat: Infinity, ease: 'easeInOut', delay },
              scale: { duration: 10 + (i % 5) * 4, repeat: Infinity, ease: 'easeInOut', delay }
            }}
            style={{
              position: 'absolute',
              top,
              left,
              fontSize: size,
              color,
              filter: 'blur(1.5px)', // softer blur to retain rich colors
            }}
          >
            <Icon />
          </motion.div>
        )
      })}
    </div>
  )
}

