import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiBriefcase, FiCalendar, FiCheckCircle, FiCode, FiGithub, FiLinkedin,
  FiMail, FiMapPin, FiSend, FiUsers,
} from 'react-icons/fi'
import { personalInfo } from '../data'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const OPPORTUNITIES = [
  { icon: <FiBriefcase size={20} aria-hidden="true" />, title: 'Freelance', desc: 'Available for web dev & security projects', color: '#E65B36' },
  { icon: <FiCode size={20} aria-hidden="true" />, title: 'Internship', desc: 'Open to cybersecurity & dev roles', color: '#174F50' },
  { icon: <FiUsers size={20} aria-hidden="true" />, title: 'Open Source', desc: 'Contributing to security tools', color: '#A4A58C' },
  { icon: <FiCalendar size={20} aria-hidden="true" />, title: 'Hackathons', desc: 'Always looking for teams', color: '#174F50' },
]

const CONTACT_CARDS = [
  { icon: <FiMail size={18} aria-hidden="true" />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: <FiMapPin size={18} aria-hidden="true" />, label: 'Location', value: personalInfo.location, href: null },
  { icon: <FiGithub size={18} aria-hidden="true" />, label: 'GitHub', value: '@krushna081', href: personalInfo.github },
  { icon: <FiLinkedin size={18} aria-hidden="true" />, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin },
]

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || 'New Portfolio Message',
          message: form.message,
        }),
      })
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
    <section id="collab" className="on-accent" style={{
      background: 'var(--color-primary)',
      borderTop: '3px solid var(--color-border)',
    }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label" style={{ background: 'var(--color-fg)' }}>07 — Connect</p>
          <h2 className="section-title" style={{ color: 'var(--color-fg)' }}>
            Collaboration <span style={{ color: '#F5F1E8' }}>Hub</span>
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--color-fg)' }}>
            Let's build something together.
          </p>
        </motion.header>

        <motion.div {...reveal}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {OPPORTUNITIES.map((opp, i) => (
            <motion.div key={opp.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.07, 0.28), duration: 0.4, ease: 'easeOut' }}
              className="brutal-card lift"
              style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => document.getElementById('collab-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <div style={{ color: opp.color, marginBottom: '0.35rem' }}>{opp.icon}</div>
              <h3 style={{ fontSize: '0.92rem', marginBottom: '0.2rem' }}>{opp.title}</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--color-fg-2)', fontWeight: 500 }}>{opp.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="collab-split">
          <motion.div {...reveal}>
            <div className="brutal-card" style={{ padding: '1.35rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Let's work together</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-fg-2)', lineHeight: 1.65, marginBottom: '1rem' }}>
                I'm open to freelance projects, internships, full-time roles, and research collaborations.
              </p>
              <a href="https://calendly.com/krushnacjadhav0807" target="_blank" rel="noopener noreferrer"
                className="brutal-btn brutal-btn-alt"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                <FiCalendar size={16} aria-hidden="true" /> Schedule a Meeting
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CONTACT_CARDS.map((c, i) => (
                <motion.div key={c.label}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.06, 0.25), duration: 0.4, ease: 'easeOut' }}
                  className="brutal-card"
                  style={{ padding: '0.85rem 1rem' }}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', minHeight: 44 }}>
                      <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>{c.icon}</span>
                      <span>
                        <span className="stat-label" style={{ display: 'block' }}>{c.label}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-fg)', overflowWrap: 'anywhere' }}>{c.value}</span>
                      </span>
                    </a>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minHeight: 44 }}>
                      <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>{c.icon}</span>
                      <span>
                        <span className="stat-label" style={{ display: 'block' }}>{c.label}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-fg)' }}>{c.value}</span>
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} id="collab-form">
            <div className="brutal-card" style={{ padding: '1.5rem' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <FiCheckCircle size={48} aria-hidden="true"
                    style={{ color: 'var(--color-secondary)', margin: '0 auto 0.75rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--color-fg-2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    I'll get back to you within 24 hours.
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="brutal-btn">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Send a Message</h3>

                  <div className="form-row-2" style={{ display: 'grid', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <FormField label="Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                    <FormField label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                  </div>

                  <FormField label="Subject" name="subject" placeholder="Project Inquiry" value={form.subject} onChange={handleChange}
                    style={{ marginBottom: '0.75rem' }} />

                  <FormField label="Message" name="message" placeholder="Tell me about your project..." value={form.message}
                    onChange={handleChange} error={errors.message} isTextarea style={{ marginBottom: '1.25rem' }} />

                  <button type="submit" disabled={loading}
                    className="brutal-btn brutal-btn-primary"
                    style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : <><FiSend size={16} aria-hidden="true" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, placeholder, value, onChange, error, type = 'text', isTextarea = false, style }) {
  const inputClass = `field-input${error ? ' field-error' : ''}`

  return (
    <div style={style}>
      <label htmlFor={name} className="stat-label" style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--color-fg-2)' }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea id={name} name={name} placeholder={placeholder} value={value} onChange={onChange}
          className={inputClass} aria-invalid={!!error} rows={5} style={{ resize: 'vertical' }} />
      ) : (
        <input id={name} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
          className={inputClass} aria-invalid={!!error} />
      )}
      {error && (
        <p role="alert" style={{ color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 600, marginTop: '0.25rem' }}>
          {error}
        </p>
      )}
    </div>
  )
}
