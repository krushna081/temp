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
  title: 'Cybersecurity Engineer, Researcher, and Developer',
  taglines: [
    'Cybersecurity Engineer',
    'Security Researcher',
    'Software Developer',
    'Ethical Hacker',
    'Problem Solver',
  ],
  email: 'contact@krushna081.online',
  github: 'https://github.com/krushna081',
  linkedin: 'https://linkedin.com/in/krushna081',
  twitter: 'https://twitter.com/krushna081',
  instagram: 'https://www.instagram.com/krushna081',
  location: 'Maharashtra, India',
  about: `I am a Cyber & Digital Science student specializing in cybersecurity, research, and software development. My passion lies in understanding how complex systems break and engineering robust defenses to protect them. With a strong research mindset and a hands-on approach to problem-solving, I bridge the gap between emerging security threats and scalable software solutions. I am driven by continuous learning, whether it's exploring ethical hacking, network defense, or building secure applications from the ground up.`,
  education: [
    {
      degree: 'BSc in Cyber & Digital Science',
      institution: 'K.K. Wagh ',
      year: 'April 2025– July 2028',
      grade: 'CGPA: not yet',
    },
    {
      degree: 'Higher Secondary (12th) — Science',
      institution: 'Progressive Public School and Junior College',
      year: 'March 2023 – March 2025',
      grade: 'Percentage: 64%',
    },
    {
      degree: '5th to 10th',
      institution: 'Purushotam English School',
      year: '2018 - 2023',
      
    },
  ],
  resumeUrl: '/resume.pdf',
}

/* ---- Projects / Research ---- */
export const projects = [
   {
  id: 1,
  title: 'Full Stack Secure Chat Application Development',
  description: 'Built a real-time secure chat application while learning modern full-stack development and deployment workflows.\n\nLearning Focus: Learned how to connect frontend and backend systems, manage MongoDB databases locally and on MongoDB Atlas, configure environment variables, integrate authentication and email services, and deploy applications to production.\n\nTechnologies Learned: React.js, Node.js, Express.js, MongoDB, Socket.io, Vercel, Render, Resend, JWT Authentication.\n\nDeployment & Backend Experience: Configured APIs, connected servers with databases, managed environment variables, tested REST APIs, handled CORS issues, and deployed frontend and backend services successfully.\n\nImpact: Gained practical experience in real-world MERN stack architecture, database management, server deployment, realtime communication, and production-level project structuring.',
  image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
  techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
  category: 'Full Stack Development',
  github: 'https://github.com/krushna081/chat',
  live: 'https://chat-khaki-two-48.vercel.app/',
  featured: true,
},
{
  id: 2,
  title: 'End-to-End Encrypted Secure Messaging Platform',
  description: 'Problem: Traditional messaging systems expose sensitive communication data to servers and third-party interception risks.\n\nSolution: Developed a secure real-time messaging platform implementing true end-to-end encryption with client-side cryptographic operations and zero-knowledge architecture.\n\nTechnology: AES-256-GCM, Web Crypto API, JWT Authentication, Socket.io, MongoDB, Zero-Knowledge Security.\n\nImpact: Engineered a cybersecurity-focused communication system ensuring encrypted message transmission, secure authentication, self-destructing messages, and protection against unauthorized data access.',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyBplxhLpuxaCeO8AuPDLNkpzxobKyqmBz4g&s',
  techStack: ['Cybersecurity', 'E2EE', 'Encryption', 'Socket.io'],
  category: 'Security Research',
  github: 'https://github.com/krushna081/chat',
  live: 'https://chat-khaki-two-48.vercel.app/',
  featured: true,
},
  { 
    id: 3,
    title: 'Secure File Storage with AES-256 Encryption',
    description: 'Problem: Cloud storage lacks client-side encryption controls.\n\nSolution: Built a robust file-sharing platform that encrypts files locally before upload.\n\nTechnology: React, Node.js, WebCrypto API.\n\nImpact: Ensured end-to-end data confidentiality, preventing unauthorized server-side access.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    techStack: ['React', 'Cryptography', 'Node.js'],
    category: 'Development',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Automated Vulnerability Scanner',
    description: 'Problem: Manual security auditing is time-consuming.\n\nSolution: Developed an automated script suite to scan web applications for common OWASP Top 10 vulnerabilities.\n\nTechnology: Python, Bash, OWASP ZAP API.\n\nImpact: Reduced routine reconnaissance time by 60% for standard security assessments.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80',
    techStack: ['Python', 'Bash', 'Security Automation'],
    category: 'Cybersecurity',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Decentralized Identity Verification',
    description: 'Problem: Centralized identity providers represent a single point of failure.\n\nSolution: Engineered a Proof-of-Concept leveraging blockchain for distributed identity verification.\n\nTechnology: Solidity, Ethereum, React.\n\nImpact: Demonstrated a tamper-proof authentication model mitigating massive data breach risks.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    techStack: ['Blockchain', 'Web3', 'Smart Contracts'],
    category: 'Research',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Developer Terminal',
    description: 'Problem: Standard portfolios lack technical interactivity.\n\nSolution: Implemented a responsive, command-line interface mimicking a real developer environment directly in the browser.\n\nTechnology: React.js, Tailwind CSS.\n\nImpact: Enhanced user engagement and effectively showcased fundamental web development capabilities.',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80',
    techStack: ['React', 'JavaScript', 'Tailwind CSS'],
    category: 'Development',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: false,
  },
]

/* ---- Skills ---- */
export const skills = {
  cybersecurity: [
    { name: 'Network Security', level: 80  },
    { name: 'Ethical Hacking', level: 80 },
    { name: 'Cryptography', level: 75 },
    { name: 'Vulnerability Assessment', level: 82 },
    { name: 'Incident Response', level: 10 },
  ],
  programming: [
    { name: 'Python', level: 60 },
    { name: 'JavaScript / TypeScript', level: 70 },
    { name: 'Bash Scripting', level: 70 },
    { name: 'C / C++', level: 80 },
    { name: 'Java', level: 80 },
  ],
  aiml: [
    { name: 'Machine Learning', level: 60 },
    { name: 'Scikit-Learn', level: 65 },
    { name: 'Anomaly Detection', level: 60 },
    { name: 'Data Analysis', level: 70 },
  ],
  webdev: [
    { name: 'React.js', level: 80 },
    { name: 'Node.js / Express', level: 70 },
    { name: 'REST APIs', level: 70 },
    { name: 'Tailwind CSS', level: 60 },
    { name: 'Wordpress', level: 70},
  ],
  tools: [
    { name: 'Wireshark / Nmap', level: 50 },
    { name: 'Linux OS', level: 30 },
    { name: 'Git / GitHub', level: 70 },
    { name: 'Docker', level: 30 },
  ],
}

export const experiences = [
{
  type: 'experience',
  title: 'Web Development Intern',
  organization: 'Kumudini Infotech (Government of India Project)',
  period: 'Sep 2025 – Present',
  description: `• Worked on responsive web development using HTML, CSS, JavaScript, React.js, Node.js, and WordPress.
• Learned SQL database management, Google Forms data handling, and backend integration.
• Collaborated in team-based development and improved website performance and user experience.`,
  icon: '💻',
},

  {
    type: 'achievement',
    title: 'Hackathon ',
    organization: '',
    period: 'Dec 2024',
    description:
      'Developed a prototype for an automated endpoint detection and response (EDR) tool, reaching the national finals against 500+ competing teams.',
    icon: '🏆',
  },
  {
    type: 'achievement',
    title: 'Independent Security Researcher',
    organization: 'Bug Bounty Platforms',
    period: '2023 – Present',
    description:
      'Discovered and responsibly disclosed security vulnerabilities in open-source projects, contributing to a safer digital ecosystem.',
    icon: '🔍',
  },
  {
    type: 'experience',
    title: 'Freelance Security & Web Developer',
    organization: 'Self-employed',
    period: 'Jan 2024 – Present',
    description:
      'Built secure web applications for local businesses, emphasizing data encryption, secure authentication (OAuth/JWT), and robust defensive coding practices.',
    icon: '🚀',
  },
 {
  type: '#',
  title: 'Upcoming Research Paper on Dark Web',
  organization: 'Research Project',
  period: '2026',
  description:
    'Working on an upcoming cybersecurity research paper on Dark Web analysis and security concepts with a research team member.',
  icon: '📄',
},
]
