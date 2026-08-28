export const portfolioData = {
  personal: {
    name: "Muhammad Hammad Imran",
    displayName: "Muhammad Hammad Imran",
    role: "Software Engineering Student & Developer",
    phone: "+92 3152777355",
    headline: "I build software that listens, responds, organizes, and solves.",
    summary:
      "Software Engineering student at Iqra University with hands-on experience building AI-powered applications, full-stack web solutions, and object-oriented systems in Python, Java, and JavaScript. Demonstrated expertise in API integration, speech recognition, responsive web development, and modular software architecture. Strong foundation in data structures, algorithms, and database design.",
    location: "Karachi, Pakistan",
    email: "hammad.a.work@gmail.com",
    github: "https://github.com/Salvador9111",
    linkedin: "https://www.linkedin.com/in/hammad-imran-6b7005394/",
    resumeUrl: "/Hammad_Imran_Resume.pdf",
    education: {
      institution: "Iqra University",
      degree: "Bachelor of Software Engineering",
      location: "Karachi, Pakistan",
      expectedGraduation: "2029",
      coursework: [
        "Data Structures",
        "Algorithms",
        "Databases",
        "Computer Systems"
      ]
    }
  },

  projects: [
    {
      id: "jarvis",
      number: "01",
      name: "Jarvis — Voice Assistant",
      tagline: "Python voice assistant using speech recognition, text-to-speech, and Gemini API",
      date: "Sept. 2024",
      technologies: ["Python", "Speech Recognition", "Gemini API", "Wikipedia API", "OOP"],
      metricTag: "-40% Integration Time",
      metrics: [
        "Built a Python voice assistant using speech recognition and text to speech.",
        "Integrated Wikipedia and Gemini APIs for intelligent query handling.",
        "Reduced feature integration time by 40% via a plugin-based command handler built on OOP principles."
      ],
      image: "/images/jarvis.png",
      github: "https://github.com/Salvador9111",
      demo: null
    },
    {
      id: "uclothes",
      number: "02",
      name: "Uclothes — E-Commerce Store",
      tagline: "Responsive clothing e-commerce website with product catalog and shopping cart",
      date: "Feb. 2026",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      metricTag: "Responsive & Cross-Browser",
      metrics: [
        "Built a responsive clothing e-commerce website with product catalog and shopping cart.",
        "Developed modular JavaScript components for product filtering and cart state management.",
        "Optimized user experience through responsive design and cross-browser compatibility."
      ],
      image: "/images/uclothes.png",
      github: "https://github.com/Salvador9111",
      demo: null
    },
    {
      id: "airline",
      number: "03",
      name: "Airline Reservation System",
      tagline: "Flight booking, ticket reservation, scheduling, and passenger record management",
      date: "July 2025",
      technologies: ["Java", "OOP", "File Handling", "Data Structures"],
      metricTag: "-30% Redundancy | 100% Integrity",
      metrics: [
        "Developed a flight booking system with ticket reservation, scheduling, and passenger record management.",
        "Reduced code redundancy by 30% using encapsulation, inheritance, and polymorphism in the system architecture.",
        "Ensured 100% data integrity across sessions with robust file-handling mechanisms for structured data persistence."
      ],
      image: "/images/airline.png",
      github: "https://github.com/Salvador9111",
      demo: null
    },
    {
      id: "lumina",
      number: "04",
      name: "Lumina — AI Chatbot",
      tagline: "AI chatbot with asynchronous REST API integration for real-time responses",
      date: "Aug. 2025",
      technologies: ["JavaScript", "REST APIs", "DOM Manipulation", "Event-Driven Architecture"],
      metricTag: "90% Uptime Reliability",
      metrics: [
        "Developed an AI chatbot with asynchronous REST API integration for real-time, context aware responses.",
        "Built a dynamic frontend using DOM manipulation and event-driven architecture for smooth experiences.",
        "Ensured 90% uptime reliability with error handling and fallback mechanisms for API failure scenarios."
      ],
      image: "/images/lumina.png",
      github: "https://github.com/Salvador9111",
      demo: null
    },
    {
      id: "rag-chatbot",
      number: "05",
      name: "RAG Chatbot",
      tagline: "Retrieval-Augmented Generation chatbot combining vector embeddings & Gemini API",
      date: "Jan. 2025",
      technologies: ["Python", "LangChain", "Vector DB", "Gemini API", "FastAPI"],
      metricTag: "+95% Retrieval Accuracy",
      metrics: [
        "Engineered a RAG architecture combining document vector indexing and LLM context retrieval.",
        "Delivered real-time grounded domain answers with source citation and low-latency responses."
      ],
      image: "/images/rag_chatbot.png",
      github: "https://github.com/Salvador9111",
      demo: null
    }
  ],

  skills: {
    languages: ["Python", "Java", "C", "HTML", "CSS", "JavaScript"],
    tools: [
      "VS Code",
      "Git",
      "GitHub",
      "Figma",
      "Notion",
      "Jira",
      "Trello",
      "Google Analytics"
    ],
    concepts: [
      "Object-Oriented Programming (OOP)",
      "Data Structures",
      "Algorithms",
      "REST APIs"
    ],
    professional: [
      "Communication",
      "Professional Networking",
      "Team Collaboration",
      "Problem Solving"
    ]
  },

  certifications: [
    {
      title: "Career Essentials in Generative AI",
      issuer: "Microsoft",
      date: "Certified",
      credentialUrl: "https://www.linkedin.com/learning/certificates/3023f0c72912ba13ffcc2c8c6b13c9f598aa6d4a2196e05fa8fc37510297d3ab"
    },
    {
      title: "Python 101 for Data Science",
      issuer: "IBM / Cognitive Class",
      date: "Certified",
      credentialUrl: "https://courses.cognitiveclass.ai/certificates/e33414a53abd47a0b9631b4cfe4b53e0"
    },
    {
      title: "Introduction to Front End Development",
      issuer: "Simplilearn",
      date: "Certified",
      credentialUrl: "https://certificates.simplicdn.net/share/10300174_10595165_1780424168270.pdf"
    },
    {
      title: "C Programming For Beginners",
      issuer: "Udemy",
      date: "Certified",
      credentialUrl: "https://www.udemy.com/certificate/UC-f77df0f9-6868-49f6-a89c-70042ff9dabb/"
    },
    {
      title: "GitHub Foundations",
      issuer: "DataCamp",
      date: "Certified",
      credentialUrl: "https://www.datacamp.com/statement-of-accomplishment/track/b75695f027afb854cb11b24d35414654718bf87d?raw=1"
    },
    {
      title: "Elements of AI",
      issuer: "University of Helsinki",
      date: "Certified",
      credentialUrl: "https://certificates.mooc.fi/validate/o184xt35tr"
    }
  ]
};
