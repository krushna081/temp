/**
 * AntiGravityLayers.jsx
 * Provides global visual enhancements like particles, animated backgrounds,
 * and high-order components for magnetic and parallax effects.
 */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ---- Background Gradient Animation ---- */
export function AnimatedBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -2,
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: 0.4
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at center, var(--gradient-start) 0%, transparent 50%), radial-gradient(circle at 20% 30%, var(--gradient-end) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--neon-blue) 0%, transparent 40%)',
        filter: 'blur(100px)',
        animation: 'bg-gradient-shift 20s ease-in-out infinite alternate',
      }} />
    </div>
  )
}

/* ---- Ambient Particle System ---- */
export function ParticleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(p)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: '110%' }}
          animate={{
            opacity: [0, 0.5, 0],
            y: ['110%', '-10%'],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

/* ---- Magnetic Hover Wrapper ---- */
export function MagneticWrapper({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    x.set((clientX - centerX) * strength)
    y.set((clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  )
}

/* ---- Parallax Mouse Wrapper ---- */
export function ParallaxWrapper({ children, sensitivity = 0.05 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      x.set((clientX - centerX) * sensitivity)
      y.set((clientY - centerY) * sensitivity)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, sensitivity])

  const springX = useSpring(x, { damping: 30, stiffness: 100 })
  const springY = useSpring(y, { damping: 30, stiffness: 100 })

  return (
    <motion.div style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  )
}

/* ---- Component to wrap sections for fade-in + upward motion ---- */
export function RevealOnScroll({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      {children}
    </motion.div>
  )
}
