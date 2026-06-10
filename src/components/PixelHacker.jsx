import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const OFFSET_X = -45
const OFFSET_Y = -35
const LERP_SPEED = 0.07
const IDLE_TIMEOUT = 2000
const SCAN_INTERVAL = 120
const DESKTOP_MIN_WIDTH = 1024

const SECTIONS = [
  'featured-projects',
  'cyber-command',
  'career-journey',
  'research-lab',
  'collab',
]

function getAccent(isDark) {
  return isDark ? '#3B82F6' : '#FF6B35'
}

function getCharacterAccents(isDark) {
  return {
    skin: isDark ? '#C0956A' : '#D4A574',
    visor: isDark ? '#3B82F6' : '#FF6B35',
    hoodie: isDark ? '#1A3048' : '#2A2A2A',
    pants: isDark ? '#0E1F30' : '#1A1A1A',
    backpack: isDark ? '#2A4060' : '#444',
    body: isDark ? '#1A3048' : '#333',
  }
}

const B = '2px solid var(--border)'

function isOverSomething(mx, my) {
  const el = document.elementFromPoint(mx, my)
  if (!el) return null
  if (el.closest('.brutal-btn') || el.closest('button') || el.closest('a[href]')) return 'button'
  const tag = el.tagName.toLowerCase()
  if (tag === 'button' || tag === 'a') return 'button'
  for (const id of SECTIONS) {
    const section = document.getElementById(id)
    if (section && (section === el || section.contains(el))) {
      if (id === 'collab') return 'contact'
      if (id === 'featured-projects') return 'projects'
      if (id === 'cyber-command') return 'skills'
      if (id === 'career-journey') return 'journey'
      if (id === 'research-lab') return 'research'
    }
  }
  return null
}

const CLICK_ACTIONS = ['jump', 'scan', 'point', 'type']

export default function PixelHacker() {
  const { isDark } = useTheme()
  const [isDesktop, setIsDesktop] = useState(false)

  const charRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const target = useRef({ x: -200, y: -200 })
  const mouse = useRef({ x: -200, y: -200 })
  const prevMouse = useRef({ x: -200, y: -200 })
  const lastMove = useRef(Date.now())
  const isIdle = useRef(false)
  const facingRight = useRef(true)
  const stepPhase = useRef(0)

  const [showChar, setShowChar] = useState(false)
  const [moving, setMoving] = useState(false)
  const [action, setAction] = useState('idle')
  const [lookDir, setLookDir] = useState('right')
  const [clickAnim, setClickAnim] = useState(null)
  const [hoverContext, setHoverContext] = useState(null)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_MIN_WIDTH && !('ontouchstart' in window))
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    let animId
    let scanTimer = 0
    let walkTimer = 0
    let lastActionTime = 0

    const onMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      lastMove.current = Date.now()
      if (isIdle.current) isIdle.current = false
    }

    const onClick = () => {
      const idx = Math.floor(Math.random() * CLICK_ACTIONS.length)
      setClickAnim(CLICK_ACTIONS[idx])
      setTimeout(() => setClickAnim(null), 400)
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('click', onClick)

    setTimeout(() => setShowChar(true), 150)

    const step = (now) => {
      const mx = mouse.current.x
      const my = mouse.current.y

      if (mx < 0) { animId = requestAnimationFrame(step); return }

      const dx = mx - prevMouse.current.x
      const dy = my - prevMouse.current.y
      prevMouse.current = { x: mx, y: my }

      target.current = { x: mx + OFFSET_X, y: my + OFFSET_Y }

      const distMoved = Math.abs(dx) + Math.abs(dy)
      const charDistX = target.current.x - pos.current.x
      const charDistY = target.current.y - pos.current.y
      const charDist = Math.sqrt(charDistX * charDistX + charDistY * charDistY)

      pos.current.x += charDistX * LERP_SPEED
      pos.current.y += charDistY * LERP_SPEED

      const idleTime = now - lastMove.current
      isIdle.current = idleTime > IDLE_TIMEOUT && charDist < 20

      const isMoving = distMoved > 0.5 || charDist > 15
      setMoving(isMoving && !isIdle.current)

      if (isMoving && distMoved > 0.5) {
        if (Math.abs(dx) > Math.abs(dy)) {
          facingRight.current = dx > 0
          setLookDir(dx > 0 ? 'right' : 'left')
        } else {
          setLookDir(dy > 0 ? 'down' : 'up')
        }
      }

      if (isMoving) {
        walkTimer += 1
        stepPhase.current = Math.floor(walkTimer / 6) % 2
      } else {
        walkTimer = 0
        stepPhase.current = 0
      }

      if (!isIdle.current && charDist < 25 && now - scanTimer > SCAN_INTERVAL) {
        scanTimer = now
        const ctx = isOverSomething(mx, my)
        if (ctx !== hoverContext) setHoverContext(ctx)
        if (ctx === 'projects' || ctx === 'skills' || ctx === 'research') {
          setAction('scan')
          lastActionTime = now
        } else if (ctx === 'contact') {
          setAction('wave')
          lastActionTime = now
        } else if (ctx === 'button') {
          setAction('point')
          lastActionTime = now
        } else if (now - lastActionTime > 1000) {
          setAction('idle')
        }
      } else if (now - lastActionTime > 1000) {
        setAction('idle')
        if (hoverContext) setHoverContext(null)
      }

      if (isIdle.current && now - lastActionTime > 800) {
        setAction('idle')
        if (hoverContext) setHoverContext(null)
      }

      if (charRef.current) {
        charRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }

      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('click', onClick)
    }
  }, [isDesktop, hoverContext])

  if (!isDesktop || !showChar) return null

  const colors = getCharacterAccents(isDark)
  const accent = getAccent(isDark)
  const facingLeft = lookDir === 'left'
  const walkCycle = stepPhase.current

  return (
    <div
      ref={charRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        transform: 'translate3d(-200px, -200px, 0)',
        willChange: 'transform',
      }}
    >
      <div style={{
        position: 'relative',
        width: 0,
        height: 0,
        transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.15s ease',
      }}>

        {/* Click animation */}
        {clickAnim === 'jump' && (
          <div className="click-jump" style={{
            position: 'absolute', top: -12, left: 14,
            fontSize: '10px',
            color: accent,
            fontWeight: 900,
            animation: 'clickJump 0.4s ease-out forwards',
          }}>!</div>
        )}
        {clickAnim === 'scan' && (
          <div style={{
            position: 'absolute', top: 4, left: -8,
            width: 60, height: 40,
            border: `2px solid ${accent}`,
            opacity: 0,
            animation: 'clickFlash 0.4s ease-out forwards',
          }} />
        )}
        {clickAnim === 'point' && (
          <div className="click-point" style={{
            position: 'absolute', top: 20, left: 36,
            fontSize: '10px',
            color: accent,
            fontWeight: 900,
            animation: 'clickPoint 0.35s ease-out forwards',
          }}>→</div>
        )}

        {/* Hover scan ring */}
        {(action === 'scan' || action === 'wave') && (
          <div className="hover-scan" style={{
            position: 'absolute', top: 0, left: -12,
            width: 60, height: 48,
            borderRadius: '50%',
            border: `2px solid ${accent}`,
            opacity: 0.25,
            animation: 'hoverRing 1s ease-in-out infinite',
          }} />
        )}

        {/* Character sprite */}
        <div style={{
          position: 'relative',
          width: 28,
          height: 36,
        }}>

          {/* ANIMATION: body bob when walking */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 28, height: 36,
            animation: moving
              ? `walkBob${walkCycle} 0.2s steps(1) infinite`
              : isIdle.current
              ? 'idleBreathe 2s ease-in-out infinite'
              : 'none',
          }}>

            {/* Backpack */}
            <div style={{
              position: 'absolute', top: 12, right: -4,
              width: 7, height: 10,
              border: B,
              background: colors.backpack,
            }} />
            <div style={{
              position: 'absolute', top: 14, right: -3,
              width: 3, height: 2,
              border: '1px solid var(--border)',
              background: accent,
              opacity: action === 'scan' ? 0.8 : 0.3,
              transition: 'opacity 0.3s',
            }} />

            {/* Legs */}
            {moving ? (
              <>
                <div style={{
                  position: 'absolute', bottom: 0, left: 4,
                  width: 6, height: 8,
                  border: B,
                  background: colors.pants,
                  transform: walkCycle === 0 ? 'translateY(0)' : 'translateY(-2px)',
                  transition: 'transform 0.1s',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 4,
                  width: 6, height: 8,
                  border: B,
                  background: colors.pants,
                  transform: walkCycle === 1 ? 'translateY(0)' : 'translateY(-2px)',
                  transition: 'transform 0.1s',
                }} />
              </>
            ) : (
              <>
                <div style={{
                  position: 'absolute', bottom: 0, left: 4,
                  width: 6, height: 8,
                  border: B,
                  background: colors.pants,
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 4,
                  width: 6, height: 8,
                  border: B,
                  background: colors.pants,
                }} />
              </>
            )}

            {/* Shoes */}
            <div style={{
              position: 'absolute', bottom: -2, left: 3,
              width: 8, height: 3,
              border: B,
              background: isDark ? '#333' : '#111',
            }} />
            <div style={{
              position: 'absolute', bottom: -2, right: 3,
              width: 8, height: 3,
              border: B,
              background: isDark ? '#333' : '#111',
            }} />

            {/* Body / Hoodie */}
            <div style={{
              position: 'absolute', top: 12, left: 3,
              width: 22, height: 16,
              border: B,
              background: colors.hoodie,
            }} />

            {/* Hoodie pocket */}
            <div style={{
              position: 'absolute', top: 20, left: 5,
              width: 18, height: 1,
              background: '#000',
              opacity: 0.3,
            }} />

            {/* Arms */}
            <div style={{
              position: 'absolute', top: 12, left: 0,
              width: 5, height: 12,
              border: B,
              background: colors.hoodie,
              transformOrigin: 'top center',
            }} />
            <div style={{
              position: 'absolute', top: 12, right: 0,
              width: 5, height: 12,
              border: B,
              background: colors.hoodie,
              transformOrigin: 'top center',
              animation: action === 'wave'
                ? 'waveArm 0.4s ease-in-out infinite'
                : action === 'point'
                ? 'pointArm 0.3s ease-in-out infinite'
                : 'none',
            }} />

            {/* Right hand (for pointing) */}
            <div style={{
              position: 'absolute', top: action === 'point' ? 18 : 22, right: action === 'point' ? -1 : 0,
              width: 5, height: 4,
              border: B,
              background: colors.skin,
              opacity: action === 'point' ? 1 : 0,
              transition: 'opacity 0.2s, top 0.2s, right 0.2s',
            }} />

            {/* Head */}
            <div style={{
              position: 'absolute', top: 0, left: 5,
              width: 18, height: 14,
              border: B,
              background: colors.skin,
            }} />

            {/* Hair */}
            <div style={{
              position: 'absolute', top: -1, left: 4,
              width: 20, height: 6,
              border: B,
              background: colors.hoodie,
            }} />

            {/* Hair spike */}
            <div style={{
              position: 'absolute', top: -3, left: 11,
              width: 6, height: 3,
              border: B,
              background: colors.hoodie,
            }} />

            {/* Visor */}
            <div style={{
              position: 'absolute', top: 5, left: 6,
              width: 16, height: 4,
              border: B,
              background: colors.visor,
              opacity: action === 'scan' ? 1 : 0.85,
              transition: 'opacity 0.3s',
            }} />
            <div style={{
              position: 'absolute', top: 5, left: 12,
              width: 4, height: 4,
              background: '#fff',
              opacity: 0.3,
            }} />

            {/* Mouth */}
            <div style={{
              position: 'absolute', top: 10, left: 10,
              width: 8, height: 1,
              background: '#000',
              opacity: 0.4,
            }} />

          </div>
        </div>
      </div>
    </div>
  )
}
