// Seed portfolio content used when PostgreSQL is not configured yet.
// The Express API also inserts this object into PostgreSQL on first connection.
module.exports = {
  name: 'Andree Lin Yiew Xuan',
  role: 'Computer Science student and full-stack developer',
  location: 'La Crosse, Wisconsin',
  email: 'andree.linyx@gmail.com',
  availability: 'Expected graduation: December 2026',
  lookingFor:
    'Seeking software engineering, product, or data-focused internship opportunities where I can build thoughtful tools with collaborative teams.',
  summary:
    'I build thoughtful web applications, product experiences, and data-driven tools with a mix of engineering structure and creative visual direction. My work spans full-stack development, product documentation, EEG research, and social media strategy.',
  about:
    'I am a Computer Science student who likes making technical work feel clear, organized, and human. Alongside programming, I study Mathematics and Music, speak English, Mandarin, Cantonese, and Malay, and enjoy projects that combine structure, creativity, and useful user experiences.',
  resumeHref: '/Andree_Resume.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/andreelinyx' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andree-lin-56196a284' }
  ],
  education: [
    {
      school: 'University of Wisconsin-La Crosse',
      degree: 'BSc in Computer Science',
      period: 'Expected December 2026',
      details: [
        'Minor in Mathematics and Music',
        'CGPA: 3.69 / 4.0',
        'Dean\'s List: Fall 2024, Spring 2025, Fall 2025, Spring 2026',
        'Relevant coursework: Object-Oriented Programming, Data Science, Database Management, Web Applications'
      ]
    }
  ],
  research: [
    {
      title: 'Motor Imagery EEG-Based Biometric Authentication',
      organization: 'UW-La Crosse CS & CPE Department',
      period: '2026',
      description:
        'Awarded the Dean\'s Distinguished Undergraduate Research Fellowship grant for a three-month pilot study exploring EEG-based biometric authentication for Parkinson\'s Disease.',
      points: [
        'Supporting EEG data acquisition and preprocessing, including filtering, artifact removal, epoching, and time-frequency analysis.',
        'Analyzing subject-specific neural patterns to evaluate feasibility of EEG-based biometric recognition.'
      ],
      tools: ['PyTorch', 'Python', 'EEG analysis', 'Signal preprocessing']
    }
  ],
  stats: [
    { label: 'Expected graduation', value: '2026' },
    { label: 'CGPA', value: '3.69' },
    { label: 'Dean\'s List semesters', value: '4' }
  ],
  skills: [
    'JavaScript',
    'Python',
    'Java',
    'SQL',
    'C',
    'Angular',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST APIs',
    'jQuery',
    'AJAX',
    'HTML',
    'CSS',
    'Git',
    'Figma',
    'Jira',
    'Postman',
    'Jupyter Notebook',
    'Canva'
  ],
  projects: [
    {
      title: 'Aura Fitness and Nutrition App',
      type: 'Full-stack web application',
      description:
        'Developed a tracking app where users can log workouts, meals, and progress through dashboards, interactive forms, and role-based user and admin functionality.',
      impact: 'Built CRUD APIs and a dynamic Angular experience',
      stack: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      links: []
    },
    {
      title: 'Multiverse TCG Search Engine',
      type: 'API-powered search tool',
      description:
        'Engineered a web application that performs parallel AJAX fetches from Scryfall and TCGDex APIs to combine Magic and Pokemon card data in one searchable interface.',
      impact: 'Merged, sorted, and rendered unified card results',
      stack: ['JavaScript', 'AJAX', 'REST APIs', 'DOM manipulation'],
      links: []
    },
    {
      title: 'Motor Imagery EEG Research',
      type: 'Undergraduate research fellowship',
      description:
        'Supporting a pilot study on EEG-based biometric authentication for Parkinson\'s Disease through data acquisition, preprocessing, and neural pattern analysis.',
      impact: 'Dean\'s Distinguished Undergraduate Research Fellowship',
      stack: ['PyTorch', 'EEG analysis', 'Signal preprocessing', 'Python'],
      links: []
    }
  ],
  experience: [
    {
      company: 'UW-La Crosse CS & CPE Department',
      title: 'Undergraduate Research Fellow',
      period: '2026',
      detail:
        'Awarded the Dean\'s Distinguished Undergraduate Research Fellowship grant for a pilot study on motor imagery EEG-based biometric authentication.'
    },
    {
      company: 'TROOPERS Malaysia',
      title: 'Product Manager Intern',
      period: 'May 2025 - August 2025',
      detail:
        'Authored product requirement documents, supported UAT and user validation, and helped lead a product release cycle with developers, designers, and business teams.'
    },
    {
      company: 'UW-La Crosse CS & CPE Department',
      title: 'Social Media Coordinator',
      period: 'August 2024 - Present',
      detail:
        'Developed content strategy, graphics, and short-form videos across Instagram, LinkedIn, Facebook, and Spotify to promote department research and events.'
    }
  ],
  services: [
    'Full-stack web application development',
    'REST API development',
    'Product requirement documents',
    'User acceptance testing',
    'Data preprocessing and analysis',
    'Social media content strategy',
    'UI prototyping and visual assets'
  ]
};
