
import { Github, Linkedin, Mail } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoLink: string;
  githubLink: string;
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
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for e-commerce platforms with real-time data visualization, inventory management, and sales tracking.",
    tags: ["React", "Tailwind CSS", "Chart.js", "Firebase"],
    imageUrl: "/placeholder.svg",
    demoLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing projects, skills, and experience with animations and 3D elements.",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    imageUrl: "/placeholder.svg",
    demoLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tags: ["React", "TypeScript", "Firebase", "Redux"],
    imageUrl: "/placeholder.svg",
    demoLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "A weather forecast application with location detection, animated weather conditions, and 5-day forecasts.",
    tags: ["React", "API Integration", "Geolocation", "CSS Animations"],
    imageUrl: "/placeholder.svg",
    demoLink: "https://example.com",
    githubLink: "https://github.com"
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Front-End Developer",
    company: "TechCorp Inc.",
    date: "2023 - Present",
    description: "Developed and maintained responsive web applications using React and modern JavaScript frameworks. Collaborated with design team to implement UI/UX improvements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "RESTful APIs"]
  },
  {
    id: 2,
    role: "Web Developer Intern",
    company: "Digital Solutions LLC",
    date: "2022 - 2023",
    description: "Assisted in developing frontend components and implementing responsive designs. Participated in code reviews and team meetings.",
    technologies: ["JavaScript", "HTML/CSS", "Bootstrap", "jQuery"]
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    date: "2019 - 2023",
    description: "Specialized in web development and user interface design. Relevant coursework included Data Structures, Algorithms, Web Development, and Human-Computer Interaction."
  }
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
  { name: "Git", level: 75 }
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/belal-aboseada",
    icon: Github
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/belal-aboseada",
    icon: Linkedin
  },
  {
    name: "Email",
    url: "mailto:belal.aboseada@example.com",
    icon: Mail
  }
];

export const aboutMe = `
I am Belal Aboseada, a passionate Front-End Developer specializing in creating engaging and responsive web experiences. With a strong foundation in modern JavaScript frameworks and libraries, I enjoy bringing designs to life through clean, efficient code.

My journey in web development began during my computer science studies, where I discovered my passion for building intuitive user interfaces. I'm particularly interested in the intersection of design and development, creating websites that are not only functional but also visually appealing.

I constantly strive to expand my skill set and stay updated with the latest web technologies and best practices. When I'm not coding, I enjoy exploring new design trends, contributing to open-source projects, and sharing knowledge with the developer community.
`;
