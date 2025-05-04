
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Images } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Check if project has additional screenshots
  const hasMultipleScreenshots = project.additionalScreenshots?.length > 0;

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 gradient-border group hover:scale-[1.01] box-glow">
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          
          {/* Indicator for multiple screenshots */}
          {hasMultipleScreenshots && (
            <div className="absolute top-2 right-2 bg-card/80 p-1 rounded-md flex items-center gap-1">
              <Images size={14} className="text-blue-accent" />
              <span className="text-xs font-medium">{project.additionalScreenshots!.length + 1}</span>
            </div>
          )}
        </div>

        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex gap-3">
        {project.demoLink || project.githubLink ? (
          <>
            {project.demoLink && (
              <Button
                variant="default"
                size="sm"
                className="bg-blue-accent hover:bg-blue-accent/80 cursor-pointer"
                asChild
              >
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} className="mr-1" /> Live Demo
                </a>
              </Button>
            )}
            {project.githubLink && (
              <Button
                variant="outline"
                size="sm"
                className="border-blue-accent text-blue-accent hover:bg-blue-accent/10 cursor-pointer"
                asChild
              >
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} className="mr-1" /> Code
                </a>
              </Button>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground ">
            🔒 Due to privacy restrictions, I'm unable to share external links
            for this project.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
