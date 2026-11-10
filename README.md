# Krushna Jadhav | Cybersecurity Engineer & Developer Portfolio

A mobile-first, editorial neo-brutalist portfolio built with **React 19** and **Vite 6**. Features a sticky header with an accessible mobile menu, a gravity-controlled tech icons experiment, dark/light mode, and Calendly meeting integration.

Live Demo: [krushna081.online](https://krushna081.online)

---

## Key Features

- **Editorial Neo-Brutalist Design**: Oversized typography, asymmetric layouts, 3px ink borders, hard shadows, no gradients, no glassmorphism
- **Brand Palette** (design tokens in `src/index.css`):
  - Warm Porcelain `#F5F1E8` (background) · Midnight Ink `#171B24` (text)
  - Persimmon `#E65B36` (primary accent) · Deep Petrol `#174F50` (secondary accent)
  - Muted Olive `#A4A58C` (muted accent) · Light Sand `#E7DDCE` (secondary surface)
- **Typography System**: Space Grotesk (headings) · Inter (body) · IBM Plex Mono (labels & metadata)
- **Mobile-First**: One-handed navigation, 44px+ touch targets, `clamp()`-based type scale, no horizontal scroll
- **Sticky Header Navigation**: Desktop inline nav with scroll-spy; accessible full-screen mobile menu (Esc to close, focus-visible, scroll lock)
- **Projects**: Filterable project grid (All / Full Stack Development / Cybersecurity / Security Research / Development / Research), lightweight cards with lazy-loaded thumbnails and future-proof "Load More" support
- **Gravity Experiment**: Toggle gyroscope-controlled physics — tilt your phone to make floating tech icons slide like marbles (with bounce-back at edges)
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Calendly Integration**: Smart meeting popup with 7-day cooldown and dedicated schedule button
- **Reduced Motion**: Honors `prefers-reduced-motion` across CSS and Framer Motion (`MotionConfig reducedMotion="user"`)

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 |
| **Styling** | Vanilla CSS design tokens (+ Tailwind import) |
| **Animations** | Framer Motion (subtle reveals, `MotionConfig`) |
| **Icons** | React Icons (Feather) |
| **Routing** | React Router (HashRouter) |
| **Interactive Logic** | react-scroll, DeviceOrientation API |
| **Contact Form** | Web3Forms |
| **Deployment** | GitHub Pages |

---

## Gravity Mode

Tap the move icon in the header (or inside the mobile menu) to activate the gravity experiment:

- **Phone**: Uses `deviceorientation` API — tilt your device and icons slide in the tilt direction with physics-based acceleration and friction
- **Desktop**: Mouse position acts as tilt simulation (moves icons toward the cursor)
- **iOS 13+**: Automatically requests `DeviceOrientationEvent.requestPermission()` before starting
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
│   │   ├── Header.jsx                 # Sticky nav: desktop links + mobile menu + toggles
│   │   ├── DigitalIdentity.jsx        # Hero section with editorial typography
│   │   ├── FeaturedProjects.jsx       # Filterable, load-more project grid
│   │   ├── WhoAmI.jsx                 # About / bio / education
│   │   ├── CyberCommandCenter.jsx     # Skills by category with progress bars
│   │   ├── CareerJourney.jsx          # Vertical timeline (petrol rail, persimmon nodes)
│   │   ├── ResearchLab.jsx            # Numbered research cards
│   │   ├── CollaborationHub.jsx       # Persimmon contact section + Web3Forms
│   │   ├── BrutalistFooter.jsx        # Ink footer with porcelain typography
│   │   ├── FloatingTechIcons.jsx      # Floating icons + gravity physics
│   │   ├── PixelHacker.jsx            # Desktop-only pixel mascot
│   │   ├── ScheduleMeetingButton.jsx  # Floating Calendly button
│   │   └── MeetingPopup.jsx           # Smart Calendly popup
│   ├── context/
│   │   └── ThemeContext.jsx           # Theme state with localStorage
│   ├── data/
│   │   └── index.js                   # Centralized portfolio data
│   ├── config.js                      # Feature flags (floating icons, dot grid)
│   ├── App.jsx                        # Root component with routing
│   ├── index.css                      # Design tokens + neo-brutalist system
│   └── main.jsx                       # Entry point
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

The contact form requires `VITE_WEB3FORMS_ACCESS_KEY` (see `.env`).

Project filters and the "Load More" threshold are defined at the top of `src/components/FeaturedProjects.jsx` (`FILTERS`, `INITIAL_VISIBLE`).

---

## Contact & Credits

Built by **Krushna Jadhav**.

- **Twitter**: [@krushna081](https://twitter.com/krushna081)
- **LinkedIn**: [krushna081](https://linkedin.com/in/krushna081)
- **GitHub**: [@krushna081](https://github.com/krushna081)
- **Email**: [contact@krushna081.online](mailto:contact@krushna081.online)
