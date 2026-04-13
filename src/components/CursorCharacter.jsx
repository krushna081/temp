import { useEffect, useRef, useState, useMemo } from 'react'

// Linear interpolation
const lerp = (start, end, factor) => start + (end - start) * factor

export default function CursorCharacter() {
  const [isDesktop, setIsDesktop] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  // Create refs but don't tie to window dimensions during SSR
  const cursorRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check if device supports fine pointing (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsDesktop(mediaQuery.matches)
    
    // Set initial position to center roughly
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    
    const updateMedia = (e) => setIsDesktop(e.matches)
    mediaQuery.addEventListener('change', updateMedia)
    return () => mediaQuery.removeEventListener('change', updateMedia)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true)
      }
    }
    
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    let animationFrameId
    const renderLoop = () => {
      // Lerp current position towards mouse position
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15)
      
      // Calculate velocity for looking direction
      velocity.current.x = mouse.current.x - pos.current.x
      velocity.current.y = mouse.current.y - pos.current.y

      if (cursorRef.current) {
        // Apply transform via hardware acceleration without triggering re-renders
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
        
        // Also update the eye offset via custom CSS variables to avoid re-rendering
        const eyeX = Math.max(-3, Math.min(3, velocity.current.x * 0.08))
        const eyeY = Math.max(-3, Math.min(3, velocity.current.y * 0.08))
        cursorRef.current.style.setProperty('--eye-x', `${eyeX}px`)
        cursorRef.current.style.setProperty('--eye-y', `${eyeY}px`)
      }

      animationFrameId = requestAnimationFrame(renderLoop)
    }
    renderLoop()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDesktop])

  if (!isDesktop) return null // Hide fully on touch devices for cleaner UI

  return (
    <div
      className="cursor-character hide-on-mobile"
      ref={cursorRef}
      style={{
        width: 36,
        height: 36,
        marginLeft: -18,
        marginTop: -18,
        pointerEvents: 'none',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        willChange: 'transform',
      }}
    >
      <div style={{
          width: '100%',
          height: '100%',
          transform: isHovering ? 'scale(1.2)' : (isClicking ? 'scale(0.9)' : 'scale(1)'),
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: isClicking ? 'brightness(1.15) drop-shadow(0 0 8px var(--accent-glow))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
      }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
          {/* Floating Ghost Body */}
          <path 
            d="M30 85C30 85 25 35 50 35C75 35 70 85 70 85C70 85 64 82 58 86C52 90 48 83 48 83C48 83 44 90 38 86C32 82 30 85 30 85Z" 
            fill="url(#ghost-grad)"
            style={{ 
              animation: 'float 3s ease-in-out infinite', 
              transformOrigin: '50% 50%' 
            }} 
          />
          
          {/* Eyes Group (moves using CSS variables set by JS) */}
          <g style={{ transform: 'translate(var(--eye-x, 0px), var(--eye-y, 0px))', transition: 'transform 0.1s ease-out' }}>
            <circle cx="43" cy="55" r={isHovering ? 6 : (isClicking ? 2 : 4)} fill="#ffffff" />
            <circle cx="57" cy="55" r={isHovering ? 6 : (isClicking ? 2 : 4)} fill="#ffffff" />
            
            {/* Mouth */}
            {isHovering ? (
              <path d="M46 65 Q 50 70 54 65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : isClicking ? (
              <circle cx="50" cy="65" r="3" fill="#ffffff" />
            ) : (
              <path d="M48 64 L52 64" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            )}
          </g>

          <defs>
            <linearGradient id="ghost-grad" x1="50" y1="35" x2="50" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--gradient-end)" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
