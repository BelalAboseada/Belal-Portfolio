import { Project } from "./types";

// Import project images
import Movix from "@/assets/Movix2.png";
import Medari from "@/assets/Mdari.png";
import MockMate from "@/assets/MockMate.png";
import Request from "@/assets/Request.jpg";
import Request_2 from "@/assets/Request2.jpg";
import Request_3 from "@/assets/Request3.jpg";
import Request_4 from "@/assets/Request4.jpg";
import Request_5 from "@/assets/Request5.jpg";
import AlamalDashboard from "@/assets/Alamal-dashboard.png";
import TChat from "@/assets/t.chat.png";
import TChat_2 from "@/assets/T.chat2.png";
import CodeZone from "@/assets/Code Zone.png";
import Bondi from "@/assets/Bondi.png";
import Pixel from "@/assets/Pixel.png";
import TwitterClone from "@/assets/TwitterClone.png";
import Crud from "@/assets/Crud.png";
import Kasper from "@/assets/Kasper.png";
import starbucks from "@/assets/Starbuks.png";
import Todo from "@/assets/Todo.png";
import YumDash from "@/assets/Screenshot (44).png";
import Zakat from "@/assets/Screenshot (6).png";
import BQ1 from "@/assets/bq_screen_1.png";
import BQ2 from "@/assets/bq_screen_2.png";
import BQ3 from "@/assets/bq_screen_3.png";
import BQ4 from "@/assets/bq_screen_4.png";
import BQ5 from "@/assets/bq_screen_5.png";
import BQ6 from "@/assets/bq_screen_6.png";


export const projects: Project[] = [
  {
    id: 0,
    title: "Bassant ElQenawy Platform",
    description: "MERN Stack Platform for Bassant ElQenawy",
    tags: ["React", "Node.js", "Express", "MongoDB", "MERN Stack"],
    imageUrl: BQ1,
    demoLink: "https://bassantelqenwy.online/",
    githubLink: "", 
    overview: [
      "Engineered a scalable multi-tenant architecture separating Student and Admin applications using React 18, TypeScript, and Vite.",
      "Implemented advanced state management with Redux Toolkit for client state and React Query for server data caching and synchronization.",
      "Developed a modular feature-based folder structure with strict domain isolation and type-safe API patterns.",
      "Built comprehensive LMS features including video lessons, grade tracking, quizzes, and subscription management workflows.",
      "Created a secure Admin Dashboard for managing users, content, and system configurations with RBAC (Role-Based Access Control).",
      "Designed a premium, accessible UI using Tailwind CSS, Radix UI, and Framer Motion for smooth animations and responsive layouts."
    ],
    category: "React",
    additionalScreenshots : [BQ2, BQ3, BQ4, BQ5, BQ6],
  },
  {
    id: 1,
    title: "Request",
    description:
      "Project Management App with roles-based access control and real-time features",
    tags: ["React", "Redux", "Tailwind CSS","Api integration" , "Axios" ,  "Real-time"],
    imageUrl: Request,
    demoLink: "",
    githubLink: "", 
    overview: [
      "Implemented roles-based access control for consultants, owners, and contractors",
      "Created dynamic roles for users with different permissions",
      "Managed tasks, projects, and deadlines effectively",
      "Integrated real-time chat and notification features",
      "Conducted data analysis to provide valuable insights",
      "Designed and developed an admin dashboard for managing the platform", 
    ],
    category: "React",
    additionalScreenshots : [Request_2, Request_3,  Request_4,Request_5],
  },
  {
    id: 2,
    title: "T-chat",
    description: "Dashboard for a mobile app to track tasks efficiently",
  tags: ["React", "Tailwind CSS", "Real-time", "Api integration"],
    imageUrl: TChat,
    demoLink: "", 
    githubLink: "",
    overview: [
      "Dashboard for a mobile app to track tasks efficiently",
      "Implemented a user-friendly interface for easy navigation",
      "Added features like search, filtering, sorting, and pagination",
      "Built a responsive design using CSS Grid and Flexbox",
    ],
    category: "React",
     additionalScreenshots : [TChat_2],
  },
  {
    id: 3,
    title: "Alamal",
    description: "Medical sales management system with comprehensive features",
    tags: ["React", "Redux", "Axios", "Api integration", "Tailwind CSS"],
    imageUrl: AlamalDashboard,
    demoLink: "",
    githubLink: "",
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
    tags: ["React", "Redux","Tailwind CSS", "AI" ],
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
    tags: ["HTML", "CSS", "Bootstrap", "Django"],
    imageUrl: Medari,
    demoLink: "",
    githubLink: "",
    overview: [
      "Landing page for showcasing articles with dynamic content", 
      "Built with Django backend and custom HTML/CSS/Bootstrap",
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
    imageUrl: TwitterClone,
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
    imageUrl: Crud,
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
    imageUrl: Kasper,
    demoLink: "https://belalaboseada.github.io/kasper-templete",
    githubLink: "https://github.com/BelalAboSeada/kasper-templete",
    overview: [
      "Creative agency landing page",
      "Modern design with CSS animations",
      "Responsive layout for all devices",
      "Interactive elements and smooth transitions",
    ],
    category: "HTML & CSS",
    additionalScreenshots: [Bondi, Crud, TwitterClone], // Example of additional screenshots
  },
];
