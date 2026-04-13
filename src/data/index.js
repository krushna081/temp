/**
 * data/index.js
 * All sample data for the portfolio:
 * - Personal info
 * - Projects
 * - Skills
 * - Experience / Achievements
 */

/* ---- Personal Info ---- */
export const personalInfo = {
  name: 'Krushna Jadhav',
  title: 'Full Stack Developer',
  taglines: [
    'Full Stack Developer',
    'React.js Enthusiast',
    'AI/ML Explorer',
    'Open Source Contributor',
    'Problem Solver',
  ],
  email: 'krushna081@example.com',
  github: 'https://github.com/krushna081',
  linkedin: 'https://linkedin.com/in/krushna081',
  twitter: 'https://twitter.com/krushna081',
  location: 'Maharashtra, India',
  about: `I'm a passionate Computer Science student with a knack for building elegant, high-performance web applications. I love turning complex problems into simple, beautiful solutions. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sketching UI designs.`,
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'XYZ University',
      year: '2022 – 2026',
      grade: 'CGPA: 8.7 / 10',
    },
    {
      degree: 'Higher Secondary (12th) — Science',
      institution: 'ABC Junior College',
      year: '2020 – 2022',
      grade: 'Percentage: 91%',
    },
  ],
  resumeUrl: '/resume.pdf',
}

/* ---- Projects ---- */
export const projects = [
  {
    id: 1,
    title: 'Borgaon Gram Panchayat',
    description:
      'A fully responsive government website for Borgaon Gram Panchayat providing citizens with information on schemes, documents, and news.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    category: 'Web',
    github: 'https://github.com/krushna081/temp',
    live: 'https://temp.krushna081.online',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Chat Assistant',
    description:
      'A conversational AI chatbot powered by Google Gemini API. Supports multi-turn conversations, code highlighting, and dark mode.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    techStack: ['React', 'Node.js', 'Gemini API', 'Tailwind CSS'],
    category: 'AI',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'E-Commerce Store',
    description:
      'A full-stack e-commerce platform with authentication, product management, shopping cart, and Razorpay payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'],
    category: 'Web',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'ML Sentiment Analyzer',
    description:
      'A machine learning web app that analyzes the sentiment of text using Natural Language Processing (NLP) and visualizes results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    techStack: ['Python', 'Flask', 'scikit-learn', 'React', 'Chart.js'],
    category: 'AI',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Task Management App',
    description:
      'A productivity app with drag-and-drop Kanban board, real-time collaboration, and priority-based task tracking.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'DevConnect — Social Network',
    description:
      'A developer-focused social platform with profiles, posts, code snippets, and real-time messaging using Socket.io.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    category: 'Web',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
]

/* ---- Skills ---- */
export const skills = {
  frontend: [
    { name: 'React.js', level: 90 },
    { name: 'JavaScript (ES6+)', level: 88 },
    { name: 'TypeScript', level: 72 },
    { name: 'HTML5 / CSS3', level: 95 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Framer Motion', level: 75 },
    { name: 'Next.js', level: 70 },
  ],
  backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Express.js', level: 80 },
    { name: 'Python', level: 78 },
    { name: 'Flask / FastAPI', level: 70 },
    { name: 'MongoDB', level: 75 },
    { name: 'PostgreSQL', level: 68 },
    { name: 'Firebase', level: 72 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 90 },
    { name: 'VS Code', level: 95 },
    { name: 'Docker', level: 60 },
    { name: 'Figma', level: 70 },
    { name: 'Postman', level: 85 },
    { name: 'Linux / Bash', level: 72 },
    { name: 'Vite', level: 80 },
  ],
  aiml: [
    { name: 'scikit-learn', level: 70 },
    { name: 'TensorFlow (basics)', level: 55 },
    { name: 'NLP / NLTK', level: 65 },
    { name: 'Gemini / OpenAI API', level: 80 },
    { name: 'Jupyter Notebook', level: 75 },
  ],
}

/* ---- Experience / Achievements ---- */
export const experiences = [
  {
    type: 'experience',
    title: 'Web Development Intern',
    organization: 'TechStart Solutions',
    period: 'Jun 2024 – Aug 2024',
    description:
      'Built responsive web interfaces using React and Tailwind CSS. Collaborated with designers to implement pixel-perfect UIs and improved page load speed by 35%.',
    icon: '💼',
  },
  {
    type: 'achievement',
    title: 'Smart India Hackathon 2024',
    organization: 'Government of India',
    period: 'Dec 2024',
    description:
      'Reached the national finals representing our university with an AI-powered soil health monitoring system.',
    icon: '🏆',
  },
  {
    type: 'achievement',
    title: 'Open Source Contributor',
    organization: 'GitHub',
    period: '2023 – Present',
    description:
      'Actively contributing to open-source projects. Merged 15+ pull requests in React and Node.js ecosystem.',
    icon: '🌟',
  },
  {
    type: 'experience',
    title: 'Freelance Web Developer',
    organization: 'Self-employed',
    period: 'Jan 2024 – Present',
    description:
      'Designed and developed websites for local businesses and NGOs, including government schemes portals.',
    icon: '🚀',
  },
  {
    type: 'achievement',
    title: 'Google Developer Student Club Lead',
    organization: 'XYZ University Chapter',
    period: '2024 – 2025',
    description:
      'Led a 200+ member community, organizing hackathons, workshops, and coding bootcamps.',
    icon: '🎓',
  },
]
