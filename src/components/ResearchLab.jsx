import { motion } from 'framer-motion'
import { FiExternalLink, FiFileText, FiGithub } from 'react-icons/fi'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, ease: 'easeOut' },
}

const items = [
  {
    title: 'Dark Web Security Analysis',
    status: 'In Progress',
    highlight: true,
    year: '2026',
    description: 'Working on an upcoming cybersecurity research paper on Dark Web analysis and security concepts with a research team member.',
    tags: ['Cybersecurity', 'Dark Web', 'Research'],
  },
  {
    title: 'End-to-End Encryption Protocols',
    status: 'Published',
    highlight: false,
    year: '2025',
    description: 'Developed a secure real-time messaging platform implementing true end-to-end encryption with client-side cryptographic operations and zero-knowledge architecture using AES-256-GCM.',
    tags: ['Cryptography', 'E2EE', 'Security'],
    links: { github: 'https://github.com/krushna081/chat', live: 'https://chat-khaki-two-48.vercel.app/' },
  },
  {
    title: 'Decentralized Identity Systems',
    status: 'Prototype',
    highlight: false,
    year: '2024',
    description: 'Engineered a Proof-of-Concept leveraging blockchain for distributed identity verification, demonstrating a tamper-proof authentication model mitigating massive data breach risks.',
    tags: ['Blockchain', 'Web3', 'Identity'],
  },
  {
    title: 'Vulnerability Research & Automation',
    status: 'Ongoing',
    highlight: false,
    year: '2024',
    description: 'Developed automated script suite to scan web applications for common OWASP Top 10 vulnerabilities. Independently discovered and disclosed security vulnerabilities in open-source projects.',
    tags: ['Security', 'Automation', 'OWASP'],
  },
]

export default function ResearchLab() {
  return (
    <section id="research" style={{ background: 'var(--color-bg)', borderTop: '3px solid var(--color-border)' }}>
      <div className="container-x section">
        <motion.header {...reveal}>
          <p className="section-label">06 — Research</p>
          <h2 className="section-title">Research <span className="tint">Lab</span></h2>
          <p className="section-subtitle">Security research, experiments, and ongoing explorations.</p>
        </motion.header>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {items.map((item, i) => (
            <motion.article key={item.title} {...reveal}
              transition={{ ...reveal.transition, delay: Math.min(i * 0.08, 0.32) }}
              className="research-card lift">
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '0.55rem',
                flexWrap: 'wrap',
              }}>
                <span aria-hidden="true" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '1.15rem', flex: '1 1 auto', minWidth: 0 }}>{item.title}</h3>
                <span className="brutal-tag" style={{
                  background: item.highlight ? 'var(--color-primary)' : 'var(--color-secondary)',
                  color: item.highlight ? 'var(--color-fg)' : '#F5F1E8',
                }}>
                  {item.status}
                </span>
              </div>

              <p className="mono-meta" style={{ marginBottom: '0.55rem' }}>{item.year}</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-fg-2)', lineHeight: 1.65, marginBottom: '0.8rem' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: item.links ? '0.9rem' : 0 }}>
                {item.tags.map(t => <span key={t} className="tech-pill">{t}</span>)}
              </div>

              {item.links && (
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {item.links.github && (
                    <a href={item.links.github} target="_blank" rel="noopener noreferrer"
                      className="brutal-btn" style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', minHeight: 44 }}>
                      <FiGithub size={13} aria-hidden="true" /> Code
                    </a>
                  )}
                  {item.links.live && (
                    <a href={item.links.live} target="_blank" rel="noopener noreferrer"
                      className="brutal-btn brutal-btn-alt" style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', minHeight: 44 }}>
                      <FiExternalLink size={13} aria-hidden="true" /> Demo
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.div {...reveal} className="brutal-card"
          style={{ marginTop: '1.75rem', padding: '1.4rem', textAlign: 'center', background: 'var(--color-bg-alt)' }}>
          <FiFileText size={24} aria-hidden="true" style={{ color: 'var(--color-primary)', margin: '0 auto 0.5rem' }} />
          <p style={{ fontSize: '0.9rem', color: 'var(--color-fg-2)', fontWeight: 600 }}>
            Research interests: Network Security, Cryptography, Dark Web Analysis,
            Vulnerability Assessment, and Ethical Hacking methodologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
