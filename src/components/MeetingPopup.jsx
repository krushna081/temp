import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCalendar } from 'react-icons/fi'
import { BOOKING_URL, openBookingPopup } from '../calendly'

const LS_KEY_DISMISSED = 'meeting-popup-dismissed'
const LS_KEY_BOOKED = 'meeting-popup-booked'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export default function MeetingPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const booked = localStorage.getItem(LS_KEY_BOOKED)
    if (booked === 'true') return

    const dismissed = localStorage.getItem(LS_KEY_DISMISSED)
    if (dismissed) {
      const ts = parseInt(dismissed, 10)
      if (!isNaN(ts)) {
        const elapsed = Date.now() - ts
        if (elapsed < SEVEN_DAYS_MS) return
      }
    }

    /* No Calendly script injection here — the widget loads on demand in
       handleBook so the popup can show without any external network cost. */

    const delay = 10000 + Math.random() * 5000

    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setVisible(false)
    localStorage.setItem(LS_KEY_DISMISSED, String(Date.now()))
  }, [])

  const handleBook = useCallback(() => {
    setVisible(false)
    localStorage.setItem(LS_KEY_BOOKED, 'true')

    setTimeout(() => {
      openBookingPopup(BOOKING_URL)
    }, 300)
  }, [])

  useEffect(() => {
    if (!visible) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleDismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible, handleDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleDismiss}
          style={{
            position: 'fixed', inset: 0, zIndex: 10001,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)', padding: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.21, 0.45, 0.32, 0.9] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(90vw, 460px)',
              background: 'var(--bg-card)',
              border: '3px solid var(--border)',
              boxShadow: '8px 8px 0px var(--shadow)',
              padding: '1.75rem',
              position: 'relative',
            }}
          >
            <button onClick={handleDismiss} aria-label="Close popup"
              style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--border)', background: 'var(--bg-primary)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: '1rem',
              }}>
              <FiX />
            </button>

            <div aria-hidden="true" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👋</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              Let's Connect
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Would you like to schedule a quick meeting with Krushna to discuss projects, internships, freelance work, cybersecurity, or collaboration opportunities?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button onClick={handleBook}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', minHeight: 48, padding: '0.7rem 1rem',
                  border: '3px solid var(--color-border)', background: 'var(--color-primary)', color: 'var(--color-fg)',
                  fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  boxShadow: '4px 4px 0px var(--shadow)', textTransform: 'uppercase', letterSpacing: '0.03em',
                }}>
                <FiCalendar size={18} /> Schedule Meeting
              </button>
              <button onClick={handleDismiss}
                style={{
                  width: '100%', minHeight: 44, padding: '0.55rem 1rem',
                  border: '3px solid var(--border)', background: 'var(--bg-primary)',
                  color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85rem',
                  cursor: 'pointer', boxShadow: '3px 3px 0px var(--shadow)',
                  textTransform: 'uppercase', letterSpacing: '0.03em',
                }}>
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
