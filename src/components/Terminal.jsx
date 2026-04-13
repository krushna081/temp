/**
 * Terminal.jsx
 * Interactive developer terminal with command parsing, history, and typing animations.
 */
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalInfo, projects } from '../data'

const COMMANDS = {
  help: 'list all available commands',
  about: 'show information about me',
  projects: 'list my projects',
  research: 'show research papers or work',
  resume: 'provide resume link',
  contact: 'show contact details',
  clear: 'clear terminal screen',
}

const INITIAL_HISTORY = [
  { type: 'info', text: 'Welcome to the Portfolio Terminal v1.0.0' },
  { type: 'info', text: 'Type "help" to see a list of available commands.' }
]

export default function Terminal() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, isTyping])

  // Process a command
  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    if (!trimmedCmd) return
    
    // Add command to output history
    const userLine = { type: 'prompt', text: strippedCmd(cmd) }
    
    // Add to command navigation history
    const newCmdHistory = [trimmedCmd, ...cmdHistory]
    setCmdHistory(newCmdHistory)
    setHistoryIndex(-1)

    let responseLine = null

    switch (trimmedCmd) {
      case 'help':
        responseLine = {
          type: 'success',
          text: Object.entries(COMMANDS)
            .map(([k, v]) => `  ${k.padEnd(10, ' ')} - ${v}`)
            .join('\n')
        }
        break
      case 'about':
        responseLine = { type: 'text', text: personalInfo.about }
        break
      case 'projects':
        responseLine = { 
          type: 'text', 
          text: projects.map((p, i) => `[${i + 1}] ${p.title}\n    ${p.techStack.join(', ')}`).join('\n\n')
        }
        break
      case 'research':
        responseLine = { type: 'muted', text: 'No research papers published yet. Still exploring the frontiers of AI!' }
        break
      case 'resume':
        responseLine = { 
          type: 'info', 
          text: `You can view or download my resume here:\n${window.location.origin}${personalInfo.resumeUrl}`
        }
        break
      case 'contact':
        responseLine = { 
          type: 'info', 
          text: `Email:    ${personalInfo.email}\nGitHub:   ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`
        }
        break
      case 'clear':
        setHistory([])
        return // Early return, don't append to regular history flow
      default:
        responseLine = { type: 'error', text: `command not found: ${trimmedCmd}` }
    }

    setHistory(prev => [...prev, userLine])
    
    // Simulate typing delay for response
    if (responseLine) {
      setIsTyping(true)
      setTimeout(() => {
        setHistory(prev => [...prev, responseLine])
        setIsTyping(false)
      }, 400) // Short delay for realism without being annoying
    }
  }

  // Handle Input Keydowns
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(cmdHistory[nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1
        setHistoryIndex(prevIndex)
        setInput(cmdHistory[prevIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  // Strip potential XSS / html from raw input for display
  const strippedCmd = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Focus input when clicking anywhere in the terminal body
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <section id="terminal" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="section-container" ref={ref}>
        <div className="divider-pill"><span>Interactive</span></div>
        <h2 className="section-title">Developer Terminal</h2>
        <p className="section-subtitle">
          Prefer the command line? Explore my portfolio using standard terminal commands.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="terminal-wrapper"
          onClick={focusInput}
        >
          {/* Mac-style Header */}
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <div className="terminal-title">krushna@portfolio ~ zsh</div>
          </div>

          {/* Terminal Output Body */}
          <div className="terminal-body" ref={bodyRef}>
            {history.map((line, i) => (
              <div key={i} className="terminal-line">
                {line.type === 'prompt' ? (
                  <>
                    <span className="terminal-prompt-symbol">➜</span>
                    <span className="terminal-muted">~</span>
                    <span className="terminal-cmd-text">{line.text}</span>
                  </>
                ) : (
                  <span className={`terminal-output ${line.type}`}>
                    {line.text}
                  </span>
                )}
              </div>
            ))}
            
            {/* Active Input Line */}
            <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
              <span className="terminal-prompt-symbol">➜</span>
              <span className="terminal-muted">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoComplete="off"
                spellCheck="false"
                disabled={isTyping}
                autoFocus={false} // Don't steal focus on page load
              />
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
