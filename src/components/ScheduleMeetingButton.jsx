import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'
import { BOOKING_URL, openBookingPopup } from '../calendly'

export default function ScheduleMeetingButton() {
  /* Calendly script/CSS load lazily inside openBookingPopup — only when the
     visitor actually clicks. Nothing external network-wise at page load. */

  const openCalendly = (e) => {
    e.preventDefault()
    openBookingPopup(BOOKING_URL)
  }

  return (
    <motion.button
      onClick={openCalendly}
      aria-label="Schedule a Meeting"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        right: '1.25rem',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.65rem 1.1rem',
        minHeight: 48,
        border: '3px solid var(--color-border)',
        background: 'var(--color-primary)',
        color: 'var(--color-fg)',
        fontWeight: 700,
        fontSize: '0.82rem',
        cursor: 'pointer',
        boxShadow: '4px 4px 0px var(--shadow)',
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
