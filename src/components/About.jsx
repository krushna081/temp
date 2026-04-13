/**
 * About.jsx
 * About Me section — bio, education timeline, and personal traits.
 * Uses scroll-triggered animations via framer-motion + IntersectionObserver.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMapPin, FiMail, FiCode, FiBook } from 'react-icons/fi'
import { personalInfo } from '../data'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const traits = [
    { icon: <FiMapPin />, label: 'Location', value: personalInfo.location },
    { icon: <FiMail />, label: 'Email', value: personalInfo.email },
    { icon: <FiCode />, label: 'Passion', value: 'Building great products' },
    { icon: <FiBook />, label: 'Learning', value: 'Always something new' },
  ]

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="section-container" ref={ref}>
        {/* Heading */}
        <div className="divider-pill"><span>About Me</span></div>
        <h2 className="section-title">Who I Am</h2>
        <p className="section-subtitle">
          A passionate developer building the future, one line at a time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}
          className="about-grid"
        >
          {/* Left — Bio */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                My Story
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                {personalInfo.about}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                I believe great software is a blend of clean code, thoughtful UX, and genuine passion.
                I'm always looking for ways to grow and make an impact.
              </p>
            </div>

            {/* Quick Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {traits.map((t, i) => (
                <motion.div
                  key={t.label}
                  custom={i + 1}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="glass-card"
                  style={{ padding: '1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '1rem' }}>{t.icon}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Education & Stats */}
          <div>
            {/* Education Timeline */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass-card"
              style={{ padding: '2rem', marginBottom: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                🎓 Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {personalInfo.education.map((edu, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    {/* Timeline dot */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 16 }}>
                      <div style={{
                        width: 14, height: 14,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                        flexShrink: 0,
                        marginTop: 4,
                      }} />
                      {i < personalInfo.education.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {edu.degree}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.2rem' }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {edu.year} · {edu.grade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}
            >
              {[
                { value: '6+', label: 'Projects' },
                { value: '1y+', label: 'Experience' },
                { value: '15+', label: 'PRs Merged' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card"
                  style={{ padding: '1.25rem', textAlign: 'center' }}
                >
                  <p style={{
                    fontSize: '1.8rem', fontWeight: 900,
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{stat.value}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
