# Krushna Jadhav | Cybersecurity Engineer & Developer Portfolio

A mobile-first, neo-brutalist portfolio built with **React 19** and **Vite 6**. Features a gravity-controlled tech icons experiment, interactive browser terminal, dark/light mode, and Calendly meeting integration.

Live Demo: [krushna081.online](https://krushna081.online)

---

## Key Features

- **Neo-Brutalist Design**: Flat solid colors, 3px black borders, hard shadows (`6px 6px 0px #000`), no rounded corners, no gradients, no glassmorphism
- **Mobile-First**: All sections optimized for one-handed use, 44px+ touch targets, large typography, single-column-first layout
- **Gravity Experiment**: Toggle gyroscope-controlled physics — tilt your phone to make floating tech icons slide like marbles on a surface (with bounce-back at edges)
- **Interactive Terminal**: Fully functional browser-based terminal with custom commands (`resume`, `about`, `projects`, `clear`, etc.)
- **Floating Tech Icons**: 24 GPU-accelerated tech stack icons that drift across the viewport, with per-color opacity for consistent visibility on light/dark themes
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Calendly Integration**: Smart meeting popup with 7-day cooldown and dedicated schedule button
- **Fully Responsive**: Optimized for every screen size (breakpoints at 480px, 640px, 768px)

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 |
| **Styling** | Vanilla CSS (custom properties, no framework) |
| **Animations** | Framer Motion (floating icons, page transitions) |
| **Icons** | React Icons (FontAwesome, Simple Icons, Feather) |
| **Routing** | React Router (HashRouter) |
| **Interactive Logic** | react-scroll, DeviceOrientation API |
| **Deployment** | GitHub Pages |

---

## Terminal Commands

Experience the portfolio through the terminal:

| Command | Description |
| :--- | :--- |
| `help` | List all available commands |
| `about` | Show a brief biography |
| `projects` | List key development and research projects |
| `resume` | View or download the resume (PDF) |
| `contact` | Show social and contact details |
| `clear` | Clear the terminal screen |

---

## Gravity Mode

Tap the move icon button (below the theme toggle) to activate the gravity experiment:

- **Phone**: Uses `deviceorientation` API — tilt your device and icons slide in the tilt direction with physics-based acceleration and friction
- **Desktop**: Mouse position acts as tilt simulation (moves icons toward the cursor)
- **iOS 13+**: Automatically requests `DeviceOrientationEvent.requestPermission()` before starting
- **Icons get 2.5× darker** when gravity is active for better visibility
- **Bounce-back at screen edges** — icons repel off walls instead of getting stuck
- Toggle again to reset icons to their floating animation positions

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krushna081/temp.git
   cd temp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```text
├── public/                      # Static assets (resume.pdf, favicon, etc.)
├── src/
│   ├── components/
│   │   ├── DigitalIdentity.jsx       # Hero section with auto-scroll stats
│   │   ├── FeaturedProjects.jsx      # Project showcase cards
│   │   ├── WhoAmI.jsx                # About / bio section
│   │   ├── CyberCommandCenter.jsx    # Skills & expertise grid
│   │   ├── CareerJourney.jsx         # Timeline with auto-scroll
│   │   ├── ResearchLab.jsx           # Research & publications
│   │   ├── Terminal.jsx              # Interactive browser terminal (lazy loaded)
│   │   ├── CollaborationHub.jsx      # Contact & collaboration
│   │   ├── BrutalistFooter.jsx       # Footer with links
│   │   ├── MobileCommandBar.jsx      # Bottom nav dock for mobile
│   │   ├── FloatingTechIcons.jsx     # GPU-optimized floating icons + gravity physics
│   │   ├── GravityToggle.jsx         # Gravity mode toggle button
│   │   ├── ThemeToggle.jsx           # Dark/light mode toggle
│   │   ├── ScheduleMeetingButton.jsx # Floating Calendly button
│   │   ├── MeetingPopup.jsx          # Smart Calendly popup
│   │   ├── Skeletons.jsx             # Loading skeletons
│   │   └── useAutoScroll.js          # rAF-based carousel hook
│   ├── context/
│   │   └── ThemeContext.jsx          # Theme state with localStorage
│   ├── data/
│   │   └── index.js                  # Centralized portfolio data
│   ├── config.js                     # Feature flags (floating icons, dot grid)
│   ├── App.jsx                       # Root component with routing
│   ├── index.css                     # Neo-brutalist design system
│   └── main.jsx                      # Entry point
├── package.json
└── vite.config.js
```

---

## Configuration

Feature flags in `src/config.js`:

```js
export const showFloatingIcons = true  // Toggle floating tech icons on/off
export const showDotGrid = true        // Toggle background dot grid on/off
```

---

## Contact & Credits

Built with ❤️ by **Krushna Jadhav**.

- **Twitter**: [@krushna081](https://twitter.com/krushna081)
- **LinkedIn**: [krushna081](https://linkedin.com/in/krushna081)
- **GitHub**: [@krushna081](https://github.com/krushna081)
- **Email**: [contact@krushna081.online](mailto:contact@krushna081.online)

---

> [!NOTE]
> This portfolio is a continuous work in progress. The neo-brutalist redesign focuses on mobile-first UX, performance, and the gravity gyroscope experiment.
