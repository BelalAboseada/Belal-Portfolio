
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Get all project images
  const allImages = project.additionalScreenshots 
    ? [project.imageUrl, ...project.additionalScreenshots]
    : [project.imageUrl];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Check if project has additional screenshots
  const hasMultipleScreenshots = allImages.length > 1;
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
  };
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
  };
  
  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 gradient-border group hover:scale-[1.01] box-glow">
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={allImages[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          
          {/* Image navigation for multiple images */}
          {hasMultipleScreenshots && (
            <>
              {/* Navigation arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-6 w-6 flex items-center justify-center z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={14} />
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-6 w-6 flex items-center justify-center z-10"
                aria-label="Next image"
              >
                <ChevronRight size={14} />
              </button>
              
              {/* Navigation dots */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      currentImageIndex === index ? "w-4 bg-blue-accent" : "w-1.5 bg-gray-300/60 hover:bg-gray-300"
                    }`}
                    onClick={(e) => handleDotClick(index, e)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Image count indicator */}
          {hasMultipleScreenshots && (
            <div className="absolute top-2 right-2 bg-card/80 px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 z-10">
              {currentImageIndex + 1}/{allImages.length}
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
