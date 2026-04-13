import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'

export default function ScheduleButton() {
  useEffect(() => {
    // Dynamically load Calendly CSS
    if (!document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    // Dynamically load Calendly JS
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const openCalendly = (e) => {
    e.preventDefault()
    // Open the popup using window.Calendly if loaded
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/krushnacjadhav0807' })
    } else {
      // Fallback if script hasn't loaded yet
      window.open('https://calendly.com/krushnacjadhav0807', '_blank')
    }
  }

  return (
    <>
      <motion.button
        onClick={openCalendly}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Schedule a Meeting"
        className="schedule-fab"
        style={{
          position: 'fixed',
          zIndex: 9998, // Below mobile nav overlay if any, but above other content
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.85rem 1.4rem',
          borderRadius: '50px',
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 30px var(--accent-glow)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer',
          opacity: 1,
          visibility: 'visible',
        }}
      >
        <FiCalendar size={18} />
        <span className="schedule-txt">Schedule a Meeting </span>
      </motion.button>

      <style>{`
        .schedule-fab {
          bottom: 2rem;
          right: 2rem;
          min-height: 48px;
        }
        @media (max-width: 768px) {
          .schedule-fab {
            bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            padding: 0.6rem 1rem !important;
            min-height: 44px; /* Minimum touch size */
            z-index: 9998;
          }
          .schedule-txt {
            font-size: 0.85rem;
          }
        }
        @media (max-width: 480px) {
          .schedule-fab {
            bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            padding: 0.6rem 1rem !important;
          }
          .schedule-txt {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  )
}
