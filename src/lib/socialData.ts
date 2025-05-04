
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/BelalAboseada",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/belal-hesham?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:belalaboseada@gmail.com",
    icon: Mail,
  },
  {
    name: "WattsApp",
    url: "https://wa.me/+201060074246",
    icon: MessageCircle,
  },
];

export const aboutMe = `
I am Belal Aboseada, a passionate Front-End Developer specializing in creating engaging and responsive web experiences. With a strong foundation in modern JavaScript frameworks and libraries, I enjoy bringing designs to life through clean, efficient code.

My journey in web development began during my computer science studies, where I discovered my passion for building intuitive user interfaces. I'm particularly interested in the intersection of design and development, creating websites that are not only functional but also visually appealing.

I constantly strive to expand my skill set and stay updated with the latest web technologies and best practices. When I'm not coding, I enjoy exploring new design trends, contributing to open-source projects, and sharing knowledge with the developer community.
`;
