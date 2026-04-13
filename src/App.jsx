/**
 * App.jsx
 * Root component — wraps everything with ThemeProvider,
 * sets up HashRouter for GitHub Pages compatibility,
 * and assembles all page sections.
 */
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

/* ---- Main Page ---- */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/* ---- App Root ---- */
export default function App() {
  return (
    <ThemeProvider>
      {/* HashRouter ensures GitHub Pages compatibility without server config */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Catch-all redirects to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
