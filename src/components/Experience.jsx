/**
 * Experience.jsx
 * Experience & Achievements timeline section.
 * Alternating left/right layout on desktop, vertical on mobile.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '../data'

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="section-container" ref={ref}>
        <div className="divider-pill"><span>Journey</span></div>
        <h2 className="section-title">Experience & Achievements</h2>
        <p className="section-subtitle">
          Milestones, internships, and moments that shaped my career.
        </p>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Center line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2,
              top: 0,
              background: 'linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))',
              zIndex: 0,
            }}
            className="timeline-line"
          />

          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} inView={inView} isRight={i % 2 === 1} />
          ))}
        </div>
      </div>

      <style>{`
        .timeline-line { left: 50%; }
        @media (max-width: 640px) {
          .timeline-line { left: 20px !important; transform: none !important; }
          .timeline-item-left, .timeline-item-right {
            flex-direction: row !important;
            text-align: left !important;
            justify-content: flex-start !important;
            padding-left: 50px !important;
            padding-right: 0 !important;
          }
          .timeline-dot { left: 12px !important; right: auto !important; }
        }
      `}</style>
    </section>
  )
}

function TimelineItem({ exp, index, inView, isRight }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}
      className={isRight ? 'timeline-item-right' : 'timeline-item-left'}
    >
      {/* Center Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 200 }}
        className="timeline-dot"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 16,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          zIndex: 2,
          boxShadow: '0 0 0 4px var(--bg-primary), 0 0 20px var(--accent-glow)',
        }}
      >
        {exp.icon}
      </motion.div>

      {/* Card */}
      <div
        className="glass-card"
        style={{
          width: 'calc(50% - 36px)',
          padding: '1.25rem 1.5rem',
          marginRight: isRight ? 0 : 'calc(50% + 36px)',
          marginLeft: isRight ? 'calc(50% + 36px)' : 0,
        }}
      >
        {/* Type Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          borderRadius: '50px',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.6rem',
          background: exp.type === 'experience'
            ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)',
          color: exp.type === 'experience' ? 'var(--accent)' : '#f59e0b',
          border: `1px solid ${exp.type === 'experience' ? 'rgba(99,102,241,0.3)' : 'rgba(245,158,11,0.3)'}`,
        }}>
          {exp.type === 'experience' ? '💼 Experience' : '🏆 Achievement'}
        </div>

        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
          {exp.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.2rem' }}>
          {exp.organization}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          📅 {exp.period}
        </p>
        <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {exp.description}
        </p>
      </div>
    </motion.div>
  )
}
