/* Calendly widget loader — deferred by design.
 *
 * The external widget.js + widget.css are injected only when the visitor
 * actually attempts to book (floating button or popup CTA), never during
 * initial page load. The script tag is inserted at most once and shared
 * across all call sites, and booking degrades gracefully to a plain link
 * if the widget can't load.
 */
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'
export const BOOKING_URL = 'https://calendly.com/krushnacjadhav0807'

let pending = null

export function loadCalendly() {
  if (pending) return pending

  pending = new Promise((resolve, reject) => {
    if (window.Calendly) { resolve(window.Calendly); return }

    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement('link')
      link.href = WIDGET_CSS
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    let script = document.querySelector('script[data-calendly-widget]')
    if (!script) {
      script = document.createElement('script')
      script.src = WIDGET_JS
      script.async = true
      script.dataset.calendlyWidget = ''
      document.head.appendChild(script)
    }

    const settle = () => {
      if (window.Calendly) resolve(window.Calendly)
      else reject(new Error('Calendly widget unavailable'))
    }
    script.addEventListener('load', settle)
    script.addEventListener('error', () => {
      pending = null
      reject(new Error('Calendly widget failed to load'))
    })
  })

  return pending
}

/** Opens the Calendly popup once the widget is ready; otherwise falls back
 *  to opening the booking page in a new tab — same behaviour as before. */
export function openBookingPopup(url = BOOKING_URL) {
  loadCalendly()
    .then(calendly => calendly.initPopupWidget({ url }))
    .catch(() => window.open(url, '_blank', 'noopener,noreferrer'))
}
