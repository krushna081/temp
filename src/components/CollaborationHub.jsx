import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiCalendar, FiBriefcase, FiCode, FiUsers } from 'react-icons/fi'
import { personalInfo } from '../data'

const opportunities = [
  { icon: <FiBriefcase size={20} />, title: 'Freelance', desc: 'Available for web dev & security projects', color: 'var(--accent)' },
  { icon: <FiCode size={20} />, title: 'Internship', desc: 'Open to cybersecurity & dev roles', color: 'var(--accent-alt)' },
  { icon: <FiUsers size={20} />, title: 'Open Source', desc: 'Contributing to security tools', color: 'var(--accent-green)' },
  { icon: <FiCalendar size={20} />, title: 'Hackathons', desc: 'Always looking for teams', color: 'var(--accent-yellow)' },
]

const contactCards = [
  { icon: <FiMail size={18} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: <FiMapPin size={18} />, label: 'Location', value: personalInfo.location, href: null },
  { icon: <FiGithub size={18} />, label: 'GitHub', value: '@krushna081', href: personalInfo.github },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin },
]

export default function CollaborationHub() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Min 10 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const formData = new FormData(e.target)
      formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()
      setLoading(false)
      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        alert('Something went wrong: ' + (data.message || 'Please try again.'))
      }
    } catch (error) {
      setLoading(false)
      alert('Failed to send message. Please check your connection.')
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <section id="collab" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Connect</div>
          <h2 className="section-title">Collaboration Hub</h2>
          <p className="section-subtitle">Let's build something together.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {opportunities.map((opp, i) => (
            <motion.div key={opp.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="brutal-card opp-card" style={{ padding: '1rem', textAlign: 'center' }}
              onClick={() => document.getElementById('collab-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <div style={{ color: opp.color, marginBottom: '0.35rem' }}>{opp.icon}</div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{opp.title}</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>{opp.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }} className="collab-grid">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="brutal-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Let's work together</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                I'm open to freelance projects, internships, full-time roles, and research collaborations.
              </p>
              <a href="https://calendly.com/krushnacjadhav0807" target="_blank" rel="noopener noreferrer"
                className="brutal-btn brutal-btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                <FiCalendar size={16} /> Schedule a Meeting
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {contactCards.map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="brutal-card" style={{ padding: '0.85rem 1rem' }}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--accent)' }}>{c.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{c.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--accent)' }}>{c.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{c.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} id="collab-form">
            <div className="brutal-card" style={{ padding: '1.5rem' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <FiCheckCircle size={48} style={{ color: 'var(--accent-green)', marginBottom: '0.75rem' }} />
                  <h3 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>I'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="brutal-btn">Send Another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Send a Message</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <FormField label="Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                    <FormField label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                  </div>

                  <FormField label="Subject" name="subject" placeholder="Project Inquiry" value={form.subject} onChange={handleChange}
                    style={{ marginBottom: '0.75rem' }} />

                  <FormField label="Message" name="message" placeholder="Tell me about your project..." value={form.message}
                    onChange={handleChange} error={errors.message} isTextarea style={{ marginBottom: '1.25rem' }} />

                  <button type="submit" disabled={loading}
                    className="brutal-btn brutal-btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <style>{`
          .collab-grid { grid-template-columns: 1fr 1.2fr; }
          @media (max-width: 768px) { .collab-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  )
}

function FormField({ label, name, placeholder, value, onChange, error, type = 'text', isTextarea = false, style = {} }) {
  const base = {
    width: '100%',
    padding: '0.65rem 0.8rem',
    border: '3px solid var(--border)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    borderRadius: 0,
    boxShadow: error ? '4px 4px 0px var(--accent-coral)' : 'none',
    minHeight: isTextarea ? '100px' : undefined,
    resize: isTextarea ? 'vertical' : undefined,
  }

  return (
    <div style={style}>
      <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} style={base} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} style={base} />
      )}
      {error && <p style={{ color: 'var(--accent-coral)', fontSize: '0.7rem', fontWeight: 600, marginTop: '0.2rem' }}>{error}</p>}
    </div>
  )
}
