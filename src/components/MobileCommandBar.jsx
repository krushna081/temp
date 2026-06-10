import { FiGrid, FiFolder, FiMap, FiZap, FiTerminal, FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'

const items = [
  { icon: <FiGrid size={18} />, label: 'Home', to: 'identity' },
  { icon: <FiFolder size={18} />, label: 'Projects', to: 'featured-projects' },
  { icon: <FiMap size={18} />, label: 'Journey', to: 'journey' },
  { icon: <FiZap size={18} />, label: 'Skills', to: 'command-center' },
  { icon: <FiTerminal size={18} />, label: 'Terminal', to: 'terminal' },
  { icon: <FiMail size={18} />, label: 'Connect', to: 'collab' },
]

export default function MobileCommandBar() {
  return (
    <nav className="command-bar hide-desktop">
      {items.map(item => (
        <Link
          key={item.to}
          to={item.to}
          smooth
          spy
          offset={-60}
          duration={500}
          activeClass="active"
          className="command-bar-btn"
          style={{ textDecoration: 'none' }}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
