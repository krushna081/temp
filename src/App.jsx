import { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

import { showFloatingIcons } from './config'
import Header from './components/Header'
import DigitalIdentity from './components/DigitalIdentity'
import FeaturedProjects from './components/FeaturedProjects'
import WhoAmI from './components/WhoAmI'
import CyberCommandCenter from './components/CyberCommandCenter'
import CareerJourney from './components/CareerJourney'
import ResearchLab from './components/ResearchLab'
import CollaborationHub from './components/CollaborationHub'
import BrutalistFooter from './components/BrutalistFooter'

/* Decorative / utility components are code-split and mounted only after the
   page is interactive, so they never delay first paint or block the main
   thread during load. Content sections stay eager on purpose: search engines
   index the body copy, and the hero + projects carry the main content. */
const FloatingTechIcons = lazy(() => import('./components/FloatingTechIcons'))
const PixelHacker = lazy(() => import('./components/PixelHacker'))
const ScheduleMeetingButton = lazy(() => import('./components/ScheduleMeetingButton'))
const MeetingPopup = lazy(() => import('./components/MeetingPopup'))

function useIdleReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (ready) return
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => window.cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setReady(true), 1800)
    return () => clearTimeout(t)
  }, [ready])
  return ready
}

function IdleMount({ children }) {
  const ready = useIdleReady()
  return ready ? children : null
}

function HomePage() {
  const [gravityEnabled, setGravityEnabled] = useState(false)

  return (
    <>
      <Header gravityEnabled={gravityEnabled} onToggleGravity={() => setGravityEnabled(p => !p)} />
      <Suspense fallback={null}>
        {showFloatingIcons && (
          <IdleMount><FloatingTechIcons gravityEnabled={gravityEnabled} /></IdleMount>
        )}
      </Suspense>
      <main>
        <DigitalIdentity />
        <FeaturedProjects />
        <WhoAmI />
        <CyberCommandCenter />
        <CareerJourney />
        <ResearchLab />
        <CollaborationHub />
      </main>
      <BrutalistFooter />
      <Suspense fallback={null}>
        <PixelHacker />
        <IdleMount><ScheduleMeetingButton /></IdleMount>
        <IdleMount><MeetingPopup /></IdleMount>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </HashRouter>
        <Analytics />
      </MotionConfig>
    </ThemeProvider>
  )
}
