import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";

interface ProjectHeaderProps {
  project: Project;
}

function ProjectHeader({ project }: ProjectHeaderProps): JSX.Element {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {project.title}
          <span className="text-blue-accent text-glow">.</span>
        </h1>
        <div className="flex gap-3">
          {project.demoLink && (
            <Button
              variant="default"
              className="bg-blue-accent hover:bg-blue-accent/80"
              asChild
            >
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} className="mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outline"
              className="border-blue-accent text-blue-accent hover:bg-blue-accent/10"
              asChild
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} className="mr-2" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-lg mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-muted text-sm">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default ProjectHeader;
