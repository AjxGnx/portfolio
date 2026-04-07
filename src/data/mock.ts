export const siteConfig = {
  name: "Alirio Gutierrez",
  title: "Golang Developer | Python | NodeJS | Senior Backend Developer | Engineering Lead",
  shortTitle: "Senior Backend Developer & Tech Lead",
  description:
    "Passionate Software Developer who truly believes that tackling new challenges helps us grow professionally and provides constant learning opportunities. With a focus on leadership and teamwork, I'm always ready to take on challenges and find innovative solutions.",
  bio: "My commitment to continuous learning drives me to seek new opportunities to grow and contribute to the success of the projects I'm part of. Outside of code, you'll find me reading a good sci-fi book or exploring worlds in video games.",
  email: "alirio1925@gmail.com",
  linkedin: "https://www.linkedin.com/in/alirio-gutierrez-41a4a4197/",
  github: "https://github.com/AjxGnx",
  location: "Bogotá, Colombia",
};

export const skills = [
  { name: "Go", level: 95, category: "Backend" },
  { name: "Python", level: 90, category: "Backend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Microservices", level: 92, category: "Architecture" },
  { name: "SOLID Principles", level: 90, category: "Architecture" },
  { name: "Apache Kafka", level: 85, category: "Backend" },
  { name: "PostgreSQL", level: 88, category: "Databases" },
  { name: "MongoDB", level: 82, category: "Databases" },
  { name: "BigQuery", level: 78, category: "Databases" },
  { name: "Firebase", level: 80, category: "Databases" },
  { name: "Docker", level: 85, category: "DevOps & Cloud" },
  { name: "AWS (S3)", level: 82, category: "DevOps & Cloud" },
  { name: "Airflow", level: 75, category: "DevOps & Cloud" },
  { name: "CI/CD", level: 80, category: "DevOps & Cloud" },
  { name: "Django", level: 78, category: "Frameworks" },
  { name: "Laravel", level: 72, category: "Frameworks" },
  { name: "React / Next.js", level: 80, category: "Frameworks" },
  { name: "Flutter", level: 65, category: "Frameworks" },
];

export const experience = [
  {
    id: 1,
    role: "Tech Lead",
    company: "Gipsyy",
    period: "Nov 2025 - Present",
    location: "Brazil (Remote)",
    description:
      "Leading the development team technically, defining system architecture and guiding the implementation of scalable solutions for the transportation platform.",
    technologies: ["Go", "Node.js", "Microservices", "Docker"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Gipsyy",
    period: "Jan 2025 - Present",
    location: "Brazil (Remote)",
    description:
      "Full-stack development of the platform, building both backend services and user interfaces to improve the product experience.",
    technologies: ["Go", "Node.js", "React", "PostgreSQL"],
  },
  {
    id: 3,
    role: "Backend Developer",
    company: "Platzi",
    period: "Jul 2024 - Dec 2024",
    location: "Bogotá, Colombia",
    description:
      "Developed backend services for the largest online education platform in Latin America, improving the learning experience for millions of students.",
    technologies: ["Python", "Go", "PostgreSQL", "Microservices"],
  },
  {
    id: 4,
    role: "Engineering Lead Core @Monetization",
    company: "Rappi",
    period: "Oct 2021 - Mar 2024",
    location: "Bogotá, Colombia",
    description:
      "Led the development team technically. Actively collaborated on system design and architecture, oversaw software quality through testing and best practices, participated in project planning, and resolved technical and team issues. Acted as a bridge between tech and other teams, facilitating communication and providing technical training. Responsible for creating the technical backlog for sprints.",
    technologies: ["Go", "Python", "Microservices", "Apache Kafka", "AWS"],
  },
  {
    id: 5,
    role: "Backend Developer",
    company: "Rappi",
    period: "Aug 2019 - Mar 2024",
    location: "Bogotá, Colombia",
    description:
      "Proposed technical solutions for product requirements, implemented microservice and event-driven architectures using Apache Kafka. Worked with Go, Python, NodeJS, relational and non-relational databases. Handled BigData tasks with Pandas, implementing DAGs in Airflow for BigQuery. Part of the BBR Core team building brands.rappi.com with custom auth, Amazon S3, audience targeting for ads, and Firebase realtime database.",
    technologies: ["Go", "Python", "Node.js", "Kafka", "BigQuery", "Airflow", "Firebase", "AWS S3"],
  },
  {
    id: 6,
    role: "Backend Developer",
    company: "BMKero's",
    period: "2017 - Jul 2019",
    location: "Falcón, Venezuela",
    description:
      "Developed diverse projects in Django and Laravel to meet client needs, as well as exploring mobile development with Flutter.",
    technologies: ["Django", "Laravel", "Python", "Flutter"],
  },
];

export const education = [
  {
    institution: "Universidad Politécnica Territorial de Falcón Alonso Gamero",
    degree: "Associate Degree in Computer Science",
    field: "Computer Engineering",
    period: "2015 - 2018",
  },
];

export const certifications = [
  { name: "Unit Testing in Go", issuer: "Platzi" },
  { name: "English B1", issuer: "Language Certification" },
  { name: "Professional Software Architecture", issuer: "Platzi" },
  { name: "Assertive Communication", issuer: "Platzi" },
  { name: "Effective Communication", issuer: "Platzi" },
];

export const projects = [
  {
    id: 1,
    title: "Brands Rappi Portal",
    description:
      "Brand portal (brands.rappi.com) with custom authentication and authorization, business module, audience system for ad products, reports and notifications with Firebase realtime database.",
    image: "/projects/brands.jpg",
    technologies: ["Go", "Node.js", "Firebase", "AWS S3", "PostgreSQL"],
    github: "#",
    live: "https://brands.rappi.com",
    featured: true,
  },
  {
    id: 2,
    title: "Monetization Microservices",
    description:
      "Event-driven microservices architecture for Rappi's monetization core, processing millions of transactions with Apache Kafka and Go.",
    image: "/projects/monetization.jpg",
    technologies: ["Go", "Apache Kafka", "Microservices", "Docker", "AWS"],
    github: "#",
    live: "",
    featured: true,
  },
  {
    id: 3,
    title: "BigData Pipeline",
    description:
      "Massive data processing pipeline implementing DAGs in Apache Airflow with Pandas to move and transform data into BigQuery for business analytics.",
    image: "/projects/bigdata.jpg",
    technologies: ["Python", "Pandas", "Airflow", "BigQuery", "GCP"],
    github: "#",
    live: "",
    featured: true,
  },
  {
    id: 4,
    title: "Gipsyy Transport Platform",
    description:
      "Full-stack development of the transportation platform, leading the technical team in implementing new features and performance improvements.",
    image: "/projects/gipsyy.jpg",
    technologies: ["Go", "Node.js", "React", "PostgreSQL", "Docker"],
    github: "#",
    live: "",
    featured: true,
  },
  {
    id: 5,
    title: "Ads Audience System",
    description:
      "Audience segmentation system for advertising products within Rappi, enabling brands to target specific users.",
    image: "/projects/audiences.jpg",
    technologies: ["Go", "PostgreSQL", "Apache Kafka", "Redis"],
    github: "#",
    live: "",
    featured: false,
  },
  {
    id: 6,
    title: "Django & Laravel Projects",
    description:
      "Various backend projects for clients at BMKero's, from REST APIs to full web applications, including mobile development with Flutter.",
    image: "/projects/django.jpg",
    technologies: ["Django", "Laravel", "Python", "Flutter", "PostgreSQL"],
    github: "#",
    live: "",
    featured: false,
  },
];

export const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/books/cleancode.jpg",
    rating: 5,
    status: "Read" as const,
    review:
      "An essential classic for any developer. It completely changed the way I write code.",
    category: "Development",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    cover: "/books/pragmatic.jpg",
    rating: 5,
    status: "Read" as const,
    review:
      "Practical, timeless advice on the craft of programming. I re-read it every year.",
    category: "Development",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    cover: "/books/dune.jpg",
    rating: 5,
    status: "Read" as const,
    review:
      "A sci-fi masterpiece. The worldbuilding is breathtaking.",
    category: "Sci-Fi",
  },
  {
    id: 4,
    title: "Neuromancer",
    author: "William Gibson",
    cover: "/books/neuromancer.jpg",
    rating: 4,
    status: "Read" as const,
    review:
      "The book that defined cyberpunk. Visionary and fascinating.",
    category: "Sci-Fi",
  },
  {
    id: 5,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/books/ddia.jpg",
    rating: 5,
    status: "Reading" as const,
    review:
      "The bible of distributed systems. Every chapter is a gem.",
    category: "Development",
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/books/hailmary.jpg",
    rating: 4,
    status: "To Read" as const,
    review: "",
    category: "Sci-Fi",
  },
  {
    id: 7,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/books/atomic.jpg",
    rating: 4,
    status: "Read" as const,
    review:
      "Excellent for understanding how to build good habits and break bad ones.",
    category: "Productivity",
  },
  {
    id: 8,
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    cover: "/books/mythical.jpg",
    rating: 4,
    status: "To Read" as const,
    review: "",
    category: "Development",
  },
];

export const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    genre: "Action / Adventure",
    rating: 10,
    status: "Completed" as const,
    image: "/games/zelda.jpg",
    review:
      "A masterpiece. The freedom of exploration and the physics are unmatched.",
  },
  {
    id: 2,
    title: "Elden Ring",
    platform: "PC",
    genre: "RPG / Souls-like",
    rating: 9.5,
    status: "Completed" as const,
    image: "/games/eldenring.jpg",
    review:
      "FromSoftware at their best. The most fascinating open world I've explored.",
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    platform: "PC",
    genre: "RPG",
    rating: 9.5,
    status: "Playing" as const,
    image: "/games/bg3.jpg",
    review:
      "The definitive RPG. Choices truly matter and the narrative is brilliant.",
  },
  {
    id: 4,
    title: "Hades",
    platform: "PC / Switch",
    genre: "Roguelike",
    rating: 9,
    status: "Completed" as const,
    image: "/games/hades.jpg",
    review:
      "Addictive gameplay with a narrative that integrates perfectly with the roguelike loop.",
  },
  {
    id: 5,
    title: "Hollow Knight",
    platform: "PC",
    genre: "Metroidvania",
    rating: 9,
    status: "Completed" as const,
    image: "/games/hollowknight.jpg",
    review:
      "One of the best metroidvanias ever made. Atmospheric and challenging.",
  },
  {
    id: 6,
    title: "Silksong",
    platform: "PC / Switch",
    genre: "Metroidvania",
    rating: 0,
    status: "Backlog" as const,
    image: "/games/silksong.jpg",
    review: "Can't wait! The most anticipated game on my list.",
  },
  {
    id: 7,
    title: "Cyberpunk 2077",
    platform: "PC",
    genre: "RPG / Action",
    rating: 8.5,
    status: "Completed" as const,
    image: "/games/cyberpunk.jpg",
    review:
      "After the patches, an incredible experience. Night City is mesmerizing.",
  },
  {
    id: 8,
    title: "Celeste",
    platform: "PC / Switch",
    genre: "Platformer",
    rating: 9,
    status: "Completed" as const,
    image: "/games/celeste.jpg",
    review:
      "A perfect platformer with an emotional message. Beautifully calibrated difficulty.",
  },
];
