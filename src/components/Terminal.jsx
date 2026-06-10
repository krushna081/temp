import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo, projects } from '../data'

const COMMANDS = {
  help: 'list all available commands',
  about: 'show information about me',
  projects: 'list my projects',
  research: 'show research papers or work',
  resume: 'view or download my resume',
  contact: 'show contact details',
  clear: 'clear terminal screen',
}

const INITIAL_HISTORY = [
  { type: 'info', text: 'KRUSHNA_OS v1.0.0 — Interactive Shell' },
  { type: 'muted', text: 'Type "help" to see available commands.' },
]

export default function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)

  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, isTyping])

  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    if (!trimmedCmd) return

    const userLine = { type: 'prompt', text: strippedCmd(cmd) }

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
            .join('\n'),
        }
        break
      case 'about':
        responseLine = { type: 'text', text: personalInfo.about }
        break
      case 'projects':
        responseLine = {
          type: 'text',
          text: projects.map((p, i) => `[${i + 1}] ${p.title}\n    ${p.techStack.join(', ')}`).join('\n\n'),
        }
        break
      case 'research':
        responseLine = { type: 'muted', text: 'Research papers in progress. Stay tuned for publications on Dark Web analysis and cryptography.' }
        break
      case 'resume':
        responseLine = {
          type: 'success',
          text: `Opening resume...\n${window.location.origin}${personalInfo.resumeUrl}`,
        }
        window.open(personalInfo.resumeUrl, '_blank')
        break
      case 'contact':
        responseLine = {
          type: 'info',
          text: `Email:    ${personalInfo.email}\nGitHub:   ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`,
        }
        break
      case 'clear':
        setHistory([])
        return
      default:
        responseLine = { type: 'error', text: `command not found: ${trimmedCmd}` }
    }

    setHistory(prev => [...prev, userLine])

    if (responseLine) {
      setIsTyping(true)
      setTimeout(() => {
        setHistory(prev => [...prev, responseLine])
        setIsTyping(false)
      }, 400)
    }
  }

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

  const strippedCmd = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;")

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <section id="terminal" style={{ background: 'var(--bg-primary)', borderTop: '3px solid var(--border)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="section-label">Terminal</div>
          <h2 className="section-title">KRUSHNA_OS</h2>
          <p className="section-subtitle">Explore my portfolio through the command line.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="terminal-window" onClick={focusInput}>
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FEBE2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <div className="terminal-title">krushna@portfolio — bash</div>
          </div>

          <div className="terminal-body" ref={bodyRef}>
            {history.map((line, i) => (
              <div key={i} className="terminal-line">
                {line.type === 'prompt' ? (
                  <>
                    <span className="terminal-prompt">❯</span>
                    <span className="terminal-cmd">{line.text}</span>
                  </>
                ) : (
                  <span className={`terminal-output ${line.type}`}>{line.text}</span>
                )}
              </div>
            ))}

            <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
              <span className="terminal-prompt">❯</span>
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
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
