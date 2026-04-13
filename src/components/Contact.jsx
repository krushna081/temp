/**
 * Contact.jsx
 * Contact section with a styled form and contact info cards.
 * Form includes validation and a simulated submitted state.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi'
import { personalInfo } from '../data'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const contactCards = [
    { icon: <FiMail size={22} />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <FiMapPin size={22} />, label: 'Location', value: personalInfo.location, href: null },
    { icon: <FiGithub size={22} />, label: 'GitHub', value: '@krushna081', href: personalInfo.github },
    { icon: <FiLinkedin size={22} />, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin },
  ]

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="section-container" ref={ref}>
        <div className="divider-pill"><span>Get In Touch</span></div>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">
          Have a project in mind or just want to say hi? I'd love to hear from you!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2.5rem', alignItems: 'start' }}
          className="contact-grid"
        >
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Let's work together
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                I'm currently open to freelance projects, internships, and full-time opportunities.
                If you have an interesting project or just want to connect, drop me a message!
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))', border: '1px solid rgba(99,102,241,0.3)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Schedule a Meeting
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Interested in cybersecurity consulting, research collaboration, or project opportunities? Schedule a direct meeting with me.
              </p>
              <a href="https://calendly.com/krushnacjadhav0807" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
                Schedule Now
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {contactCards.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: '1rem 1.25rem' }}
                >
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <ContactCardInner c={c} />
                    </a>
                  ) : (
                    <ContactCardInner c={c} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            {submitted ? (
              <SuccessMessage onReset={() => setSubmitted(false)} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                  Send a Message
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}
                  className="form-row"
                >
                  <FormField id="contact-name" label="Your Name" name="name" placeholder="John Doe"
                    value={form.name} onChange={handleChange} error={errors.name} />
                  <FormField id="contact-email" label="Email Address" name="email" type="email"
                    placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
                </div>

                <FormField id="contact-subject" label="Subject (optional)" name="subject"
                  placeholder="Project Inquiry" value={form.subject} onChange={handleChange}
                  style={{ marginBottom: '1rem' }} />

                <FormField id="contact-message" label="Message" name="message"
                  placeholder="Tell me about your project or just say hello..." value={form.message}
                  onChange={handleChange} error={errors.message} isTextarea style={{ marginBottom: '1.5rem' }} />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.75 : 1 }}
                >
                  {loading ? (
                    <>Sending... <LoadingSpinner /></>
                  ) : (
                    <>Send Message <FiSend /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.4fr; }
        .form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ContactCardInner({ c }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
      <div style={{
        width: 42, height: 42, borderRadius: '10px', flexShrink: 0,
        background: 'rgba(99,102,241,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
      }}>
        {c.icon}
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</p>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.value}</p>
      </div>
    </div>
  )
}

function FormField({ id, label, name, placeholder, value, onChange, error, type = 'text', isTextarea = false, style = {} }) {
  const inputStyle = {
    width: '100%',
    padding: '0.7rem 0.9rem',
    borderRadius: '10px',
    border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'var(--font-sans)',
    resize: isTextarea ? 'vertical' : undefined,
    minHeight: isTextarea ? '120px' : undefined,
  }

  return (
    <div style={style}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} style={inputStyle}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#ef4444' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
        />
      ) : (
        <input id={id} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} style={inputStyle}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)' }}
          onBlur={e => { e.target.style.borderColor = error ? '#ef4444' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
        />
      )}
      {error && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  )
}

function SuccessMessage({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '3rem 1rem' }}
    >
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
        <FiCheckCircle style={{ fontSize: '3.5rem', color: '#22c55e', marginBottom: '1rem' }} />
      </motion.div>
      <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        Message Sent! 🎉
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Thanks for reaching out! I'll get back to you within 24 hours.
      </p>
      <button onClick={onReset} className="btn-outline">Send Another</button>
    </motion.div>
  )
}

function LoadingSpinner() {
  return (
    <div style={{
      width: 16, height: 16,
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid #fff',
      borderRadius: '50%',
      animation: 'spin-slow 0.8s linear infinite',
    }} />
  )
}
