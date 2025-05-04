
import { LucideIcon } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoLink?: string;
  githubLink?: string;
  overview: string[];
  category: string;
  additionalScreenshots?: string[]; // Optional array of additional screenshots
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

export type SkillCategory = "Skills" | "Tools";
export interface Skill {
  id: number;
  title: string;
  img: string;
  Cat: SkillCategory;
}

export type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};
