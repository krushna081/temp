import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'

export default function ScheduleMeetingButton() {
  const animRef = useRef(null)

  useEffect(() => {
    if (!document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const openCalendly = (e) => {
    e.preventDefault()
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/krushnacjadhav0807' })
    } else {
      window.open('https://calendly.com/krushnacjadhav0807', '_blank')
    }
  }

  return (
    <motion.button
      ref={animRef}
      onClick={openCalendly}
      aria-label="Schedule a Meeting"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: 'max(5rem, env(safe-area-inset-bottom, 0px) + 4.5rem)',
        right: '0.75rem',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.65rem 1.1rem',
        minHeight: 48,
        border: '3px solid #000',
        background: 'var(--accent)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.82rem',
        cursor: 'pointer',
        boxShadow: '4px 4px 0px #000',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      <FiCalendar size={18} />
      <span className="schedule-text">Schedule Meeting</span>

      <style>{`
        @media (max-width: 480px) {
          .schedule-text { font-size: 0.75rem; }
        }
      `}</style>
    </motion.button>
  )
}
