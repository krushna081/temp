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
  email: 'krushna.jadhav@example.com',
  github: 'https://github.com/krushna081',
  linkedin: 'https://linkedin.com/in/krushna081',
  twitter: 'https://twitter.com/krushna081',
  location: 'Maharashtra, India',
  about: `I am a Cyber & Digital Science student specializing in cybersecurity, research, and software development. My passion lies in understanding how complex systems break and engineering robust defenses to protect them. With a strong research mindset and a hands-on approach to problem-solving, I bridge the gap between emerging security threats and scalable software solutions. I am driven by continuous learning, whether it's exploring ethical hacking, network defense, or building secure applications from the ground up.`,
  education: [
    {
      degree: 'BSc in Cyber & Digital Science',
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

/* ---- Projects / Research ---- */
export const projects = [
  {
    id: 1,
    title: 'Advanced Persistent Threat (APT) Detection Framework',
    description: 'Problem: Traditional IDS fail to detect slow, sophisticated APTs.\n\nSolution: Developed an anomaly-based detection framework analyzing network traffic patterns.\n\nTechnology: Python, Scikit-Learn, Wireshark.\n\nImpact: Improved detection accuracy of stealthy anomalies by 24% in simulated environments.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    techStack: ['Python', 'Machine Learning', 'Network Security'],
    category: 'Research',
    github: 'https://github.com/krushna081',
    live: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Zero-Trust Architecture Implementation Guide',
    description: 'Problem: Legacy network perimeters are vulnerable to internal lateral movement.\n\nSolution: Designed and documented a comprehensive Zero-Trust rollout strategy for mid-sized enterprises.\n\nTechnology: IAM, Micro-segmentation, MFA protocols.\n\nImpact: Authored a paper establishing practical migration steps minimizing operational downtime.',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f21fffb3?w=600&q=80',
    techStack: ['Cybersecurity', 'Zero-Trust', 'Architecture'],
    category: 'Research',
    github: 'https://github.com/krushna081',
    live: '#',
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
    { name: 'Network Security', level: 85 },
    { name: 'Ethical Hacking', level: 80 },
    { name: 'Cryptography', level: 75 },
    { name: 'Vulnerability Assessment', level: 82 },
    { name: 'Incident Response', level: 70 },
  ],
  programming: [
    { name: 'Python', level: 90 },
    { name: 'JavaScript / TypeScript', level: 85 },
    { name: 'Bash Scripting', level: 78 },
    { name: 'C / C++', level: 75 },
    { name: 'Java', level: 70 },
  ],
  aiml: [
    { name: 'Machine Learning', level: 75 },
    { name: 'Scikit-Learn', level: 80 },
    { name: 'Anomaly Detection', level: 72 },
    { name: 'Data Analysis', level: 85 },
  ],
  webdev: [
    { name: 'React.js', level: 88 },
    { name: 'Node.js / Express', level: 82 },
    { name: 'REST APIs', level: 85 },
    { name: 'Tailwind CSS', level: 80 },
  ],
  tools: [
    { name: 'Wireshark / Nmap', level: 85 },
    { name: 'Linux OS', level: 90 },
    { name: 'Git / GitHub', level: 92 },
    { name: 'Docker', level: 75 },
  ],
}

/* ---- Experience / Achievements ---- */
export const experiences = [
  {
    type: 'experience',
    title: 'Cybersecurity Analyst Intern',
    organization: 'SecureTech Defenses',
    period: 'Jun 2024 – Aug 2024',
    description:
      'Conducted vulnerability assessments on enterprise networks. Assisted in monitoring SIEM alerts and drafting incident response reports, improving threat mitigation times.',
    icon: '🛡️',
  },
  {
    type: 'achievement',
    title: 'National Cyber Security Hackathon Finalist',
    organization: 'Government Initiative',
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
    type: 'achievement',
    title: 'Research Paper Publication',
    organization: 'Undergraduate Cybersecurity Journal',
    period: 'May 2025',
    description:
      'Published academic research on "Evading Modern IDS Systems Using Polymorphic Traffic Attributes," detailing methodologies and defensive countermeasures.',
    icon: '📄',
  },
]
