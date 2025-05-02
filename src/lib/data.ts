import { Github, Linkedin, Mail } from "lucide-react";
import { LucideIcon } from "lucide-react";

import Movix from "@/assets/Movix2.png";
import Medari from "@/assets/Mdari.png";
import MockMate from "@/assets/MockMate.png";
import Request from "@/assets/Request.jpg";
import AlamalDashboard from "@/assets/Alamal-dashboard.png";
import TChat from "@/assets/t.chat.png";
import CodeZone from "@/assets/Code Zone.png";
import Bondi from "@/assets/Bondi.png";
import Pixel from "@/assets/Pixel.png";
import TwitterClone from "@/assets/";
import Crud from "@/assets/Crud.png";
import Kasper from "@/assets/Kasper.png";
import starbucks from "@/assets/Starbuks.png";
import Todo from "@/assets/Todo.png";
import YumDash from "@/assets/Screenshot (44).png";
import Zakat from "@/assets/Screenshot (6).png";

// Rest of the types remain the same
export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoLink: string;
  githubLink: string;
  overview: string[] ;
  category: string;
};

export type Experience = {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
};

export type Education = {
  id: number;
  degree: string;
  institution: string;
  date: string;
  description: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Request",
    description:
      "Project Management App with roles-based access control and real-time features",
    tags: ["React", "Redux", "Tailwind CSS"],
    imageUrl: Request,
    overview: [
      "Implemented roles-based access control for consultants, owners, and contractors",
      "Created dynamic roles for users with different permissions",
      "Managed tasks, projects, and deadlines effectively",
      "Integrated real-time chat and notification features",
      "Conducted data analysis to provide valuable insights",
      "Designed and developed an admin dashboard for managing the platform",
    ],
    category: "React",
  },
  {
    id: 2,
    title: "T-chat",
    description: "Dashboard for a mobile app to track tasks efficiently",
    tags: ["React", "Tailwind CSS", "Real-time" , "Api integration"],
    imageUrl: TChat,
    overview: [
      "Dashboard for a mobile app to track tasks efficiently",
      "Implemented a user-friendly interface for easy navigation",
      "Added features like search, filtering, sorting, and pagination",
      "Built a responsive design using CSS Grid and Flexbox",
    ],
    category: "React",
  },
   {
    id: 3,
    title: "Alamal",
    description: "Medical sales management system with comprehensive features",
    tags: ["React", "Redux", "Firebase", "Tailwind CSS"],
    imageUrl: AlamalDashboard,
    overview: [
      "Implemented functionalities for medical representatives, pharmacies, and sales managers",
      "Created dynamic roles for different user types",
      "Managed data related to medical reps, pharmacies, and sales",
      "Ensured data integrity and security through proper validation",
    ],
    category: "React",
  },
  {
    id: 4,
    title: "Movix",
    description: "Movie App for watching trailers, descriptions, and ratings",
    tags: ["React", "Redux", "API Integration", "Tailwind CSS"],
    imageUrl: Movix,
    demoLink: "https://movix-tau-three.vercel.app",
    githubLink: "https://github.com/BelalAboSeada/Movix",
    overview: [
      "Movie App for watching trailers, descriptions, and ratings",
      "Built using React, React-Router, Redux, and Redux-thunk",
      "Consumed the movie db API to fetch movie data",
      "Responsive design with smooth animations",
    ],
    category: "React",
  },
 
  
  {
    id: 5,
    title: "Mock Mate AI",
    description: "AI-powered interview coach for practicing interview skills",
    tags: ["React", "AI", "Firebase", "Tailwind CSS"],
    imageUrl: MockMate,
    demoLink: "https://mock--mate.vercel.app",
    githubLink: "https://github.com/BelalAboseada/MockMate-salamHack",
    overview: [
      "AI-powered interview coach for various job roles",
      "Simulates real-world interview scenarios with intelligent feedback",
      "Tracks progress with scoring system and interview history",
      "Comprehensive solution for technical and behavioral interviews",
    ],
    category: "React",
  },
  {
    id: 6,
    title: "Medari",
    description: "Articles Landing Page with dynamic content",
    tags: ["HTML", "CSS", "Sass", "Django"],
    imageUrl: Medari,
    demoLink: "https://medari.web.app",
    githubLink: "https://github.com/belal-aboseada/medari",
    overview: [
      "Landing page for showcasing articles with dynamic content",
      "Built with Django backend and custom HTML/CSS/Sass UI",
      "Integrated dynamic content loading via Django templates",
      "Fully responsive layout across devices",
      "Collaborated with backend team for seamless integration",
      "Interactive elements with smooth transitions",
    ],
    category: "HTML & CSS",
  },
  {
    id: 7,
    title: "Yum Dash",
    description: "Food delivery E-commerce App with real-time cart management",
    tags: ["React", "Firebase", "E-commerce", "Tailwind CSS"],
    imageUrl: YumDash,
    demoLink: "https://yum-dash.web.app",
    githubLink: "https://github.com/BelalAboSeada/Yum-Dash",
    overview: [
      "Food ordering platform with real-time cart management",
      "Integrated with Firebase for data management",
      "Responsive design with smooth animations",
      "User-friendly interface for easy ordering",
    ],
    category: "React",
  },
  {
    id: 8,
    title: "Code Zone",
    description: "Modern landing page for a coding education platform",
    tags: ["JavaScript", "HTML", "CSS", "Responsive Design"],
    imageUrl: CodeZone,
    demoLink: "https://belalaboseada.github.io/code-zone",
    githubLink: "https://github.com/BelalAboSeada/code-zone",
    overview: [
      "Modern landing page for a coding education platform",
      "Responsive design with smooth animations",
      "Interactive elements and modern UI components",
      "Optimized for performance and user experience",
    ],
    category: "JavaScript",
  },
  {
    id: 9,
    title: "Zakat App",
    description: "Islamic financial calculator for Zakat obligations",
    tags: ["React", "TypeScript", "Tailwind CSS", "Islamic Finance"],
    imageUrl: Zakat,
    demoLink: "https://zakat-on-camel.vercel.app",
    githubLink: "https://github.com/BelalAboseada/Zakat-on-Camels",
    overview: [
      "Islamic financial calculator for Zakat obligations",
      "Supports multiple asset types and currencies",
      "User-friendly interface with clear calculations",
      "Responsive design for all devices",
    ],
    category: "React",
  },
  {
    id: 10,
    title: "Bondi",
    description: "Modern responsive landing page built with pure HTML and CSS",
    tags: ["HTML", "CSS", "Responsive Design", "Modern UI"],
    imageUrl: Bondi,
    demoLink: "https://belalaboseada.github.io/bondi",
    githubLink: "https://github.com/BelalAboSeada/bondi",
    overview: [
      "Modern responsive landing page",
      "Built with pure HTML5 and CSS3",
      "Clean and modern design",
      "Fully responsive across all devices",
    ],
    category: "HTML & CSS",
  },
  {
    id: 11,
    title: "Pixel",
    description: "Browser-based image manipulation tool",
    tags: ["JavaScript", "HTML5 Canvas", "CSS", "Image Processing"],
    imageUrl: Pixel,
    demoLink: "https://belalaboseada.github.io/pixel",
    githubLink: "https://github.com/BelalAboSeada/Pixel",
    overview: [
      "Browser-based image manipulation tool",
      "Supports basic filters and transformations",
      "User-friendly interface for image editing",
      "Real-time preview of changes",
    ],
    category: "JavaScript",
  },
  {
    id: 12,
    title: "Twitter Clone",
    description: "Static clone of Twitter/X UI with responsive design",
    tags: ["HTML", "CSS", "Responsive Design", "Modern UI"],
    imageUrl: "/projects/twitter-clone.png",
    demoLink: "https://belalaboseada.github.io/twitter-clone",
    githubLink: "https://github.com/BelalAboSeada/twitter-clone",
    overview: [
      "Static clone of Twitter/X UI",
      "Responsive layout with CSS Grid",
      "Modern design elements and animations",
      "Mobile-first approach",
    ],
    category: "HTML & CSS",
  },
  {
    id: 13,
    title: "CRUD System",
    description: "Complete CRUD operations implementation with local storage",
    tags: ["JavaScript", "Local Storage", "CRUD Operations", "UI/UX"],
    imageUrl: "/projects/crud.png",
    demoLink: "https://belalaboseada.github.io/cruds-system",
    githubLink: "https://github.com/BelalAboSeada/cruds-system",
    overview: [
      "Complete CRUD operations implementation",
      "Local storage data persistence",
      "User-friendly interface for data management",
      "Responsive design for all devices",
    ],
    category: "JavaScript",
  },
  {
    id: 14,
    title: "Kasper",
    description: "Creative agency landing page with modern design",
    tags: ["HTML", "CSS", "Responsive Design", "Modern UI"],
    imageUrl: "/projects/kasper.png",
    demoLink: "https://belalaboseada.github.io/kasper-templete",
    githubLink: "https://github.com/BelalAboSeada/kasper-templete",
    overview: [
      "Creative agency landing page",
      "Modern design with CSS animations",
      "Responsive layout for all devices",
      "Interactive elements and smooth transitions",
    ],
    category: "HTML & CSS",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Web Developer Intern",
    company: "Code Alpha",
    date: "January 2024 - March 2024",
    description:
      "Completed a three-month internship focusing on frontend development. and working on several projects involving the use of js,React",
    technologies: ["React", "Redux", "JavaScript", "RESTful APIs"],
  },
  {
    id: 2,
    role: "Summer Training Camp",
    company: "Information Technology Institute",
    date: "October 2023 - November 2023",
    description:
      "Advanced Frontend Development using React Graduation Project: Movix Movie app for watching trailers descriptions, ratings, and more.",
    technologies: [
      "React",
      "Redux",
      "tailwind css",
      "JavaScript",
      "RESTful APIs",
    ],
  },
  {
    id: 3,
    role: "Front end developer",
    company: "Mdarj",
    date: "Jun 2024 – Feb 2025",
    description:
      "Assisted in developing frontend components and implementing responsive designs. Participated in code reviews and team meetings.",
    technologies: ["React", "Oodo", "RESTful APIs"],
  },
  {
    id: 4,
    role: "Front end developer",
    company: "Freelancing",
    date: "May 2023 - Present ",
    description:
      "Assisted in developing frontend components and implementing responsive designs. Participated in code reviews and team meetings.",
    technologies: ["React", "Oodo", "RESTful APIs"],
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Alsun",
    institution: "University of Technology",
    date: "2019 - 2023",
    description:
      "Specialized in web development and user interface design. Relevant coursework included Data Structures, Algorithms, Web Development, and Human-Computer Interaction.",
  },
];

export const skills: Skill[] = [
  { name: "HTML5", level: 90 },
  { name: "CSS3/SCSS", level: 85 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 75 },
  { name: "React", level: 80 },
  { name: "Redux", level: 70 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Next.js", level: 70 },
  { name: "Three.js", level: 65 },
  { name: "Git", level: 75 },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/belal-aboseada",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/belal-aboseada",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:belalaboseada@gmail.com",
    icon: Mail,
  },
];

export const aboutMe = `
I am Belal Aboseada, a passionate Front-End Developer specializing in creating engaging and responsive web experiences. With a strong foundation in modern JavaScript frameworks and libraries, I enjoy bringing designs to life through clean, efficient code.

My journey in web development began during my computer science studies, where I discovered my passion for building intuitive user interfaces. I'm particularly interested in the intersection of design and development, creating websites that are not only functional but also visually appealing.

I constantly strive to expand my skill set and stay updated with the latest web technologies and best practices. When I'm not coding, I enjoy exploring new design trends, contributing to open-source projects, and sharing knowledge with the developer community.
`;
