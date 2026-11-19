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
    },
    {
      id: "lunar-lander",
      number: "06",
      name: "Lunar Landing — RL Agent",
      tagline: "Autonomous rocket landing system trained with Deep Q-Networks to softly land on the moon",
      date: "Oct. 2025",
      technologies: ["Python", "Reinforcement Learning", "PyTorch", "Gymnasium", "Deep Q-Networks"],
      metricTag: "+98% Soft Landing Rate",
      metrics: [
        "Trained a Deep Q-Network (DQN) agent with experience replay and target networks to autonomously control rocket thrusters.",
        "Optimized reward shaping across orientation, angular velocity, and engine throttle to achieve soft, zero-impact landings.",
        "Attained over 98% landing success rate across randomized wind turbulence and uneven lunar terrain environments."
      ],
      image: "/images/lunar_lander.png",
      github: "https://github.com/Salvador9111",
      demo: null
    },
    {
      id: "autonomous-driving",
      number: "07",
      name: "Autonomous Driving — Behavioral Cloning",
      tagline: "End-to-end deep learning model trained on human driving data to steer an autonomous vehicle",
      date: "Jan. 2026",
      technologies: ["Python", "Deep Learning", "TensorFlow", "Computer Vision", "OpenCV"],
      metricTag: "Zero Off-Track | 60 FPS",
      metrics: [
        "Trained an end-to-end Convolutional Neural Network (NVIDIA CNN architecture) to map road camera frames directly to steering angles.",
        "Preprocessed and augmented steering telemetry and multi-camera perspectives to mimic human driving behavior.",
        "Successfully navigated complex winding tracks and varied lighting conditions with smooth lane-centering and zero recovery errors."
      ],
      image: "/images/autonomous_car.png",
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
      year: "2026",
      date: "June 2026",
      credentialUrl: "https://www.linkedin.com/learning/certificates/3023f0c72912ba13ffcc2c8c6b13c9f598aa6d4a2196e05fa8fc37510297d3ab"
    },
    {
      title: "RAG with MongoDB",
      issuer: "MongoDB",
      year: "2026",
      date: "Sept. 2026",
      credentialUrl: "https://www.credly.com/badges/35bb55d3-411a-48c0-9d23-7bfbc06da50b"
    },
    {
      title: "Python 101 for Data Science",
      issuer: "IBM / Cognitive Class",
      year: "2026",
      date: "May 2026",
      credentialUrl: "https://courses.cognitiveclass.ai/certificates/e33414a53abd47a0b9631b4cfe4b53e0"
    },
    {
      title: "Introduction to Front End Development",
      issuer: "Simplilearn",
      year: "2026",
      date: "June 2026",
      credentialUrl: "https://certificates.simplicdn.net/share/10300174_10595165_1780424168270.pdf"
    },
    {
      title: "Communication and Soft Skills",
      issuer: "DigiSkills.pk",
      year: "2026",
      date: "July 2026",
      credentialUrl: "https://digiskills.pk/verify/"
    },
    {
      title: "C Programming For Beginners",
      issuer: "Udemy",
      year: "2026",
      date: "May 2026",
      credentialUrl: "https://www.udemy.com/certificate/UC-f77df0f9-6868-49f6-a89c-70042ff9dabb/"
    },
    {
      title: "GitHub Foundations",
      issuer: "DataCamp",
      year: "2026",
      date: "Nov. 2026",
      credentialUrl: "https://www.datacamp.com/statement-of-accomplishment/track/b75695f027afb854cb11b24d35414654718bf87d?raw=1"
    },
    {
      title: "Elements of AI",
      issuer: "University of Helsinki",
      year: "2026",
      date: "June 2026",
      credentialUrl: "https://certificates.mooc.fi/validate/o184xt35tr"
    }
  ]
};
