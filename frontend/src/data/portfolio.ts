import cvAsset from "@/assets/maria-cv.pdf";
import profileAsset from "@/assets/maria-portrait.png";

export const portfolioData = {
  personal: {
    name: "Maria Ansari",
    role: "Software Engineer",
    email: "maria.ansari.2005@gmail.com",
    phone: "+91 8689860679",
    location: "Mumbai, India",
    linkedin: "https://www.linkedin.com/in/maria-ansari63/",
    github: "https://github.com/Maria-0624",
    profileImage: profileAsset,
    cvUrl: cvAsset,
    tagline: "Build. Solve. Create. Scale.",
    summary:
      "Software Engineer with a strong foundation in Java, the MERN Stack, PostgreSQL, AWS, and REST APIs. Passionate about building scalable, user-focused applications and solving real-world problems through clean, efficient code.",
    about: [
      "I'm a Software Engineer passionate about creating practical, scalable and user-friendly applications.",
      "I enjoy working across the stack, from designing responsive interfaces to building backend APIs, databases and cloud-based systems.",
    ],
  },

  stats: [
    { value: "JAVA", label: "Java Development" },
    { value: "REST", label: "API Development" },
    { value: "MERN", label: "Full Stack" },
    { value: "AWS", label: "Cloud & DevOps" },
  ],

  skills: {
    Languages: ["Java", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
    Frontend: ["React.js", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
    "Cloud & DevOps": ["AWS (RDS, S3, ECS)", "Git", "GitHub", "Docker", "Vercel", "Render"],
    Tools: ["VS Code", "Eclipse", "Postman"],
  } as Record<string, string[]>,

  experience: [
    {
      role: "Software Developer Intern",
      company: "Skill Rider",
      org: "Atidhi Innovative Solutions Pvt Ltd",
      period: "Feb 2026 – Present",
      points: [
        "Developed a scalable MERN-based digital storefront and order management platform.",
        "Built a Generate module that creates personalized website ZIP packages with unique store URLs, enabling one-click deployment for each store.",
        "Enhanced the build generation pipeline by adding support for personalized Android APKs and extending it toward iOS (IPA) deployment.",
        "Implemented REST APIs, authentication, RBAC, and payment webhook integration.",
      ],
    },
  ],

  projects: [
    {
      name: "HawkEye",
      subtitle: "Threat Detection & Monitoring System",
      tech: ["Python", "Kafka", "MongoDB"],
      description:
        "A real-time threat detection and monitoring system designed to identify anomalies, calculate risk scores and generate automated security alerts.",
      features: ["Real-time monitoring", "Anomaly detection", "Risk scoring", "Automated security alerts"],
    },
    {
      name: "Inkwell",
      subtitle: "Blogging Website",
      tech: ["MERN", "Gemini AI"],
      description:
        "A full-stack blogging platform with AI-powered summaries, rich text editing, image uploads and REST APIs.",
      features: ["AI-powered summaries", "Rich text editor", "Image uploads", "REST APIs"],
    },
    {
      name: "Library Management System",
      subtitle: "Console Application",
      tech: ["Java", "MySQL"],
      description:
        "A console-based library management application implementing CRUD operations, inventory management and data validation.",
      features: ["CRUD operations", "Inventory management", "Data validation", "MySQL database"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering (Information Technology)",
      institution: "M. H. Saboo Siddik College of Engineering",
      year: "2026",
      score: "CGPA 9.05",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "M. H. Saboo Siddik Polytechnic",
      year: "2023",
      score: "85.37%",
    },
  ],

  certifications: [
    "JPMorgan Chase Software Engineering Virtual Experience (Forage)",
    "Deloitte Australia Data Analytics Virtual Experience (Forage)",
    "Python Programming – Suven Consultants",
    "Smart India Hackathon Participant (2022)",
    "State-Level Website Development & Technical Paper Presentation",
  ],
};

export type PortfolioData = typeof portfolioData;
