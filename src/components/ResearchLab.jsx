import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiFileText } from 'react-icons/fi'
import { projects, experiences } from '../data'

export default function ResearchLab() {
  const researchProjects = projects.filter(p => p.category === 'Research' || p.category === 'Security Research')
  const upcoming = experiences.filter(e => e.title.toLowerCase().includes('research') || e.title.toLowerCase().includes('paper'))

  const items = [
    {
      title: 'Dark Web Security Analysis',
      status: 'In Progress',
      year: '2026',
      description: 'Working on an upcoming cybersecurity research paper on Dark Web analysis and security concepts with a research team member.',
      tags: ['Cybersecurity', 'Dark Web', 'Research'],
      color: 'var(--accent-yellow)',
    },
    {
      title: 'End-to-End Encryption Protocols',
      status: 'Published',
      year: '2025',
      description: 'Developed a secure real-time messaging platform implementing true end-to-end encryption with client-side cryptographic operations and zero-knowledge architecture using AES-256-GCM.',
      tags: ['Cryptography', 'E2EE', 'Security'],
      color: 'var(--accent-green)',
      links: { github: 'https://github.com/krushna081/chat', live: 'https://chat-khaki-two-48.vercel.app/' },
    },
    {
      title: 'Decentralized Identity Systems',
      status: 'Prototype',
      year: '2024',
      description: 'Engineered a Proof-of-Concept leveraging blockchain for distributed identity verification, demonstrating a tamper-proof authentication model mitigating massive data breach risks.',
      tags: ['Blockchain', 'Web3', 'Identity'],
      color: 'var(--accent-alt)',
    },
    {
      title: 'Vulnerability Research & Automation',
      status: 'Ongoing',
      year: '2024',
      description: 'Developed automated script suite to scan web applications for common OWASP Top 10 vulnerabilities. Independently discovered and disclosed security vulnerabilities in open-source projects.',
      tags: ['Security', 'Automation', 'OWASP'],
      color: 'var(--accent-coral)',
    },
  ]

  return (
    <section id="research" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Research</div>
          <h2 className="section-title">Research Lab</h2>
          <p className="section-subtitle">Security research, experiments, and ongoing explorations.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="notebook-card" style={{ padding: '1.25rem', paddingLeft: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.title}</h3>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.2rem 0.6rem', border: '2px solid var(--border)', background: item.color, color: '#fff' }}>{item.status}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>{item.year}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{item.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {item.tags.map(t => <span key={t} className="tech-pill">{t}</span>)}
              </div>
              {item.links && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {item.links.github && (
                    <a href={item.links.github} target="_blank" rel="noopener noreferrer"
                      className="brutal-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', minHeight: 36 }}>
                      <FiGithub size={12} /> Code
                    </a>
                  )}
                  {item.links.live && (
                    <a href={item.links.live} target="_blank" rel="noopener noreferrer"
                      className="brutal-btn brutal-btn-alt" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', minHeight: 36 }}>
                      <FiExternalLink size={12} /> Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="brutal-card" style={{ marginTop: '1.5rem', padding: '1.25rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
          <FiFileText size={24} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Research interests: Network Security, Cryptography, Dark Web Analysis,<br />
            Vulnerability Assessment, and Ethical Hacking methodologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
