import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

import { showFloatingIcons } from './config'
import FloatingTechIcons from './components/FloatingTechIcons'
import Header from './components/Header'
import DigitalIdentity from './components/DigitalIdentity'
import FeaturedProjects from './components/FeaturedProjects'
import WhoAmI from './components/WhoAmI'
import CyberCommandCenter from './components/CyberCommandCenter'
import CareerJourney from './components/CareerJourney'
import ResearchLab from './components/ResearchLab'
import CollaborationHub from './components/CollaborationHub'
import BrutalistFooter from './components/BrutalistFooter'
import PixelHacker from './components/PixelHacker'
import ScheduleMeetingButton from './components/ScheduleMeetingButton'
import MeetingPopup from './components/MeetingPopup'

function HomePage() {
  const [gravityEnabled, setGravityEnabled] = useState(false)

  return (
    <>
      <Header gravityEnabled={gravityEnabled} onToggleGravity={() => setGravityEnabled(p => !p)} />
      {showFloatingIcons && <FloatingTechIcons gravityEnabled={gravityEnabled} />}
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
      <PixelHacker />
      <ScheduleMeetingButton />
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
        <MeetingPopup />
        <Analytics />
      </MotionConfig>
    </ThemeProvider>
  )
}
