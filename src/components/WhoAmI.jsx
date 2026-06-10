import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiBook, FiDownload } from 'react-icons/fi'
import { personalInfo } from '../data'

const traits = [
  { icon: <FiMapPin size={16} />, label: 'Location', value: personalInfo.location },
  { icon: <FiMail size={16} />, label: 'Email', value: personalInfo.email },
  { icon: <FiBook size={16} />, label: 'Learning', value: 'Cyber & Digital Science' },
]

export default function WhoAmI() {
  return (
    <section id="whoami" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">About</div>
          <h2 className="section-title">Who Am I?</h2>
          <p className="section-subtitle">A builder, a researcher, and a problem solver.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="brutal-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>My Story</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1rem' }}>{personalInfo.about}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>I believe great software is a blend of clean code, thoughtful UX, and genuine passion. I'm always looking for ways to grow and make an impact.</p>
            <div style={{ marginTop: '1.25rem' }}>
              <a href={personalInfo.resumeUrl} download className="brutal-btn" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
                <FiDownload size={14} /> Download Resume
              </a>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {traits.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                className="brutal-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--accent)' }}>{t.icon}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</span>
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="brutal-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {personalInfo.education.map((edu, i) => (
                <div key={i} style={{
                  borderLeft: '3px solid var(--accent)',
                  paddingLeft: '1rem',
                }}>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{edu.institution}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{edu.year}{edu.grade ? ` · ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[
              { value: '6+', label: 'Projects Built' },
              { value: '1y+', label: 'Dev Experience' },
              { value: '15+', label: 'PRs & Contributions' },
            ].map(stat => (
              <div key={stat.label} className="brutal-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <p className="stat-number">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
