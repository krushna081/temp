import { Suspense, lazy, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './context/ThemeContext'
import { SkeletonTheme } from 'react-loading-skeleton'

import FloatingTechIcons from './components/FloatingTechIcons'
import { showFloatingIcons } from './config'

import MobileCommandBar from './components/MobileCommandBar'
import DigitalIdentity from './components/DigitalIdentity'
import FeaturedProjects from './components/FeaturedProjects'
import WhoAmI from './components/WhoAmI'
import CyberCommandCenter from './components/CyberCommandCenter'
import CareerJourney from './components/CareerJourney'
import ResearchLab from './components/ResearchLab'
import CollaborationHub from './components/CollaborationHub'
import BrutalistFooter from './components/BrutalistFooter'
import ThemeToggle from './components/ThemeToggle'
import GravityToggle from './components/GravityToggle'
import ScheduleMeetingButton from './components/ScheduleMeetingButton'
import MeetingPopup from './components/MeetingPopup'

import { TerminalSkeleton } from './components/Skeletons'

const Terminal = lazy(() => import('./components/Terminal'))

function HomePage() {
  const [gravityEnabled, setGravityEnabled] = useState(false)

  return (
    <>
      {showFloatingIcons && <FloatingTechIcons gravityEnabled={gravityEnabled} />}
      <DigitalIdentity />
      <FeaturedProjects />
      <WhoAmI />
      <CyberCommandCenter />
      <CareerJourney />
      <ResearchLab />
      <Suspense fallback={<TerminalSkeleton />}>
        <Terminal />
      </Suspense>
      <CollaborationHub />
      <BrutalistFooter />
      <MobileCommandBar />
      <ThemeToggle />
      <GravityToggle gravityEnabled={gravityEnabled} onToggle={() => setGravityEnabled(p => !p)} />
      <ScheduleMeetingButton />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SkeletonTheme baseColor="var(--text-muted)" highlightColor="var(--accent)">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </HashRouter>
        <MeetingPopup />
        <Analytics />
      </SkeletonTheme>
    </ThemeProvider>
  )
}
