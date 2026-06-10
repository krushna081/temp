import { motion } from 'framer-motion'
import { FiMove } from 'react-icons/fi'

export default function GravityToggle({ gravityEnabled, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      aria-label={gravityEnabled ? 'Disable gravity' : 'Enable gravity'}
      title={gravityEnabled ? 'Disable gravity' : 'Enable gravity'}
      style={{
        position: 'fixed',
        top: '4.5rem',
        right: '0.75rem',
        zIndex: 10000,
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid var(--border)',
        background: gravityEnabled ? 'var(--accent)' : 'var(--bg-card)',
        color: gravityEnabled ? '#fff' : 'var(--text-primary)',
        cursor: 'pointer',
        boxShadow: '3px 3px 0px var(--shadow)',
        fontSize: '1rem',
        fontWeight: 900,
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <FiMove size={18} />
    </motion.button>
  )
}
