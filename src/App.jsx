/**
 * App.jsx
 * Root component — wraps everything with ThemeProvider,
 * sets up HashRouter for GitHub Pages compatibility,
 * and assembles all page sections.
 */
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Suspense, lazy } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AnimatedBackground, ParticleBackground } from './components/AntiGravityLayers'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CursorCharacter from './components/CursorCharacter'
import ScheduleButton from './components/ScheduleButton'
import Footer from './components/Footer'

// Lazy load heavy sections
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Terminal = lazy(() => import('./components/Terminal'))
const Contact = lazy(() => import('./components/Contact'))

/* ---- Main Page ---- */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ height: '50vh' }} />}>
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Terminal />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

/* ---- App Root ---- */
export default function App() {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <ParticleBackground />
      <CursorCharacter />
      <ScheduleButton />
      {/* HashRouter ensures GitHub Pages compatibility without server config */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Catch-all redirects to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </HashRouter>
      <Analytics />
    </ThemeProvider>
  )
}
