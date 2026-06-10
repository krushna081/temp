import { useRef, useEffect, useCallback } from 'react'

export default function useAutoScroll({ speed = 0.5, mobileOnly = false }) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scroll = useCallback(() => {
    if (pausedRef.current) return
    if (mobileOnly && !isMobileRef.current) return

    const el = ref.current
    if (!el) return

    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) return

    el.scrollLeft += speed

    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft = 0
    }

    rafRef.current = requestAnimationFrame(scroll)
  }, [speed, mobileOnly])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const pause = () => { pausedRef.current = true }
    const resume = () => {
      setTimeout(() => { pausedRef.current = false }, 2000)
    }
    const onUserScroll = () => { pausedRef.current = true }

    el.addEventListener('touchstart', pause)
    el.addEventListener('touchend', resume)
    el.addEventListener('mousedown', pause)
    el.addEventListener('mouseup', resume)
    el.addEventListener('scroll', onUserScroll)

    rafRef.current = requestAnimationFrame(scroll)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
      el.removeEventListener('mousedown', pause)
      el.removeEventListener('mouseup', resume)
      el.removeEventListener('scroll', onUserScroll)
    }
  }, [scroll])

  return ref
}
