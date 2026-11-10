import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

/** Smooth-scroll to a section, honouring the reduced-motion preference.
 *  Offset handled by CSS `scroll-padding-top` / `scroll-margin-top`. */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}

/** Accessible in-page navigation control. Replaces react-scroll <Link>:
 *  a single interactive <button> (no nested-interactive invalid HTML). */
export default function ScrollLink({ to, className, style, children, onNavigate, ...rest }) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        scrollToSection(to)
        onNavigate?.()
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Replaces react-scroll's `spy`: returns the id of the section currently
 *  crossing the upper viewport band. Re-scans when lazy sections mount. */
export function useActiveSection(ids, offsetPx = 96) {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observed = new Set()

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) setActive(visible[0].target.id)
    }, { rootMargin: `-${offsetPx}px 0px -45% 0px`, threshold: 0 })

    const observeAll = () => {
      for (const id of key.split('|')) {
        if (observed.has(id)) continue
        const el = document.getElementById(id)
        if (!el) continue
        observer.observe(el)
        observed.add(id)
      }
    }

    observeAll()

    // Sections can mount after mount time (React.lazy chunks) — rescan when
    // nodes are added so newly mounted sections enter the spy rotation.
    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mo.disconnect() }
  }, [key, offsetPx])

  return active
}
