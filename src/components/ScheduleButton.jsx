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
        <FiCalendar size={18} style={{ flexShrink: 0 }} />
        <span className="schedule-txt">
          <span className="txt-desktop">Schedule a Meeting with Krushna Jadhav</span>
          <span className="txt-mobile">Schedule a Meeting</span>
        </span>
      </motion.button>

      <style>{`
        .txt-mobile { display: none; }
        .schedule-fab {
          bottom: 2rem;
          right: 2rem;
          min-height: 48px;
        }
        @media (max-width: 768px) {
          .txt-desktop { display: none; }
          .txt-mobile { display: inline; }
          .schedule-fab {
            bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
            right: 1.5rem;
            left: 1.5rem;
            width: calc(100% - 3rem);
            justify-content: center;
            padding: 0.85rem 1.25rem !important;
            min-height: 48px;
            z-index: 9998;
          }
        }
        @media (max-width: 480px) {
          .schedule-fab {
            bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            left: 1rem;
            width: calc(100% - 2rem);
            padding: 0.85rem 1rem !important;
          }
        }
      `}</style>
    </>
  )
}
