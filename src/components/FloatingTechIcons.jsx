import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FaPython, FaReact, FaNodeJs, FaDocker,
  FaLinux, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaJs,
} from 'react-icons/fa'
import {
  SiTypescript, SiMongodb, SiTailwindcss, SiFigma, SiNextdotjs,
} from 'react-icons/si'

function hexToLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const allIcons = [
  { Icon: FaPython, color: '#3776AB', sizeMult: 1 },
  { Icon: FaReact, color: '#61DAFB', sizeMult: 1 },
  { Icon: FaNodeJs, color: '#339933', sizeMult: 1 },
  { Icon: FaHtml5, color: '#E34F26', sizeMult: 1 },
  { Icon: FaCss3Alt, color: '#1572B6', sizeMult: 1 },
  { Icon: FaJs, color: '#F7DF1E', sizeMult: 1 },
  { Icon: SiTypescript, color: '#3178C6', sizeMult: 0.65 },
  { Icon: SiMongodb, color: '#47A248', sizeMult: 0.75 },
  { Icon: FaDocker, color: '#2496ED', sizeMult: 1 },
  { Icon: FaLinux, color: '#FCC624', sizeMult: 1 },
  { Icon: FaGitAlt, color: '#F05032', sizeMult: 1 },
  { Icon: FaGithub, color: '#888888', sizeMult: 1 },
  { Icon: SiFigma, color: '#F24E1E', sizeMult: 0.75 },
  { Icon: SiTailwindcss, color: '#06B6D4', sizeMult: 0.75 },
  { Icon: SiNextdotjs, color: '#888888', sizeMult: 0.7 },
].map(icon => {
  const lum = hexToLuminance(icon.color)
  const opacity = 0.28 * (1 + (1 - lum) * 0.6)
  return { ...icon, opacity: Math.min(opacity, 0.4) }
})

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function generatePositions(count) {
  const positions = []
  const minDist = 8
  for (let i = 0; i < count; i++) {
    let left, top
    let safe = false
    let attempts = 0
    while (!safe && attempts < 100) {
      attempts++
      left = Math.random() * 96
      top = Math.random() * 96
      const fromCenterX = Math.abs(left - 40)
      const fromCenterY = Math.abs(top - 40)
      let tooClose = false
      for (const p of positions) {
        const pLeft = parseFloat(p.left)
        const pTop = parseFloat(p.top)
        if (distance(left, top, pLeft, pTop) < minDist) { tooClose = true; break }
      }
      if (!tooClose && (fromCenterX > 22 || fromCenterY > 22)) safe = true
    }
    if (!safe) { left = Math.random() * 96; top = Math.random() * 96 }
    positions.push({
      left: `${left}%`,
      top: `${top}%`,
      leftPct: left,
      topPct: top,
      baseSize: 28 + Math.random() * 18,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 8,
      xDrift: (Math.random() - 0.5) * 70,
      yDrift: (Math.random() - 0.5) * 60,
    })
  }
  return positions
}

export default function FloatingTechIcons({ gravityEnabled }) {
  const [icons, setIcons] = useState([])
  const elRefs = useRef([])
  const posRef = useRef([])
  const velRef = useRef([])
  const gravityRef = useRef({ ax: 0, ay: 0 })
  const hasGyro = useRef(false)
  const running = useRef(false)
  const prevGravity = useRef(false)

  if (gravityEnabled && !prevGravity.current && icons.length > 0) {
    posRef.current = icons.map(icon => ({ left: icon.leftPct, top: icon.topPct }))
    velRef.current = icons.map(() => ({ vx: 0, vy: 0 }))
  }
  prevGravity.current = gravityEnabled

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 10 : 24

    const shuffled = [...allIcons].sort(() => Math.random() - 0.5).slice(0, count)
    const generated = generatePositions(count)

    const result = shuffled.map((icon, i) => ({ ...icon, ...generated[i], size: generated[i].baseSize * icon.sizeMult }))
    posRef.current = generated.map(p => ({ left: p.leftPct, top: p.topPct }))
    elRefs.current = []
    setIcons(result)
  }, [])

  useEffect(() => {
    if (!gravityEnabled || icons.length === 0) return

    gravityRef.current = { ax: 0, ay: 0 }
    hasGyro.current = false
    running.current = true

    const onOrientation = (e) => {
      hasGyro.current = true
      const g = e.gamma || 0
      const b = e.beta || 0
      gravityRef.current = {
        ax: g / 45,
        ay: b / 45,
      }
    }

    const onMouse = (e) => {
      if (hasGyro.current) return
      gravityRef.current = {
        ax: (e.clientX / window.innerWidth - 0.5) * 2.5,
        ay: (e.clientY / window.innerHeight - 0.5) * 2.5,
      }
    }

    const startListeners = () => {
      window.addEventListener('deviceorientation', onOrientation)
      window.addEventListener('mousemove', onMouse)
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission().then(state => {
        if (state === 'granted') startListeners()
        else window.addEventListener('mousemove', onMouse)
      })
    } else {
      startListeners()
    }

    const step = () => {
      if (!running.current) return
      const { ax, ay } = gravityRef.current

      posRef.current.forEach((pos, i) => {
        const vel = velRef.current[i]
        if (!vel) return

        vel.vx += ax * 0.3
        vel.vy += ay * 0.3
        vel.vx *= 0.88
        vel.vy *= 0.88

        pos.left += vel.vx * 0.5
        pos.top += vel.vy * 0.5

        if (pos.left <= 0 || pos.left >= 100) vel.vx *= -0.4
        if (pos.top <= 0 || pos.top >= 100) vel.vy *= -0.4
        pos.left = Math.max(0, Math.min(100, pos.left))
        pos.top = Math.max(0, Math.min(100, pos.top))

        const el = elRefs.current[i]
        if (el) {
          el.style.left = `${pos.left}%`
          el.style.top = `${pos.top}%`
        }
      })

      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)

    return () => {
      running.current = false
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [gravityEnabled, icons.length])

  const rendered = useMemo(() => {
    if (icons.length === 0) return null

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {icons.map((item, i) => {
          if (gravityEnabled) {
            const op = Math.min(item.opacity * 2.5, 0.7)
            return (
              <div
                key={i}
                ref={el => { elRefs.current[i] = el }}
                style={{
                  position: 'absolute',
                  left: `${posRef.current[i]?.left ?? item.leftPct}%`,
                  top: `${posRef.current[i]?.top ?? item.topPct}%`,
                  fontSize: item.size,
                  color: item.color,
                  opacity: op,
                  willChange: 'left, top',
                }}
              >
                <item.Icon />
              </div>
            )
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: item.opacity,
                x: [0, item.xDrift, -item.xDrift * 0.6, item.xDrift * 0.8, -item.xDrift * 0.3, 0],
                y: [0, item.yDrift * 0.8, -item.yDrift, item.yDrift * 0.5, -item.yDrift * 0.7, 0],
              }}
              transition={{
                opacity: { duration: 1.5, ease: 'easeOut' },
                x: { duration: item.duration, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
                y: { duration: item.duration * 0.7, repeat: Infinity, ease: 'easeInOut', delay: item.delay + 0.5 },
              }}
              style={{
                position: 'absolute',
                left: item.left,
                top: item.top,
                fontSize: item.size,
                color: item.color,
                willChange: 'transform',
              }}
            >
              <item.Icon />
            </motion.div>
          )
        })}
      </div>
    )
  }, [icons, gravityEnabled])

  return rendered
}
