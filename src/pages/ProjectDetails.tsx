
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { projects } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(
    projects.find((p) => p.id === Number(id)) || null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Create an array of screenshots - use the main imageUrl as the first one
  // and add additional screenshots if they exist
  const screenshots = project.additionalScreenshots 
    ? [project.imageUrl, ...project.additionalScreenshots]
    : [project.imageUrl];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    setImageDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-24">
        <div className="container">
          {/* Project Header */}
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
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-muted text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Main Project Image with Slider */}
          <div className="rounded-lg overflow-hidden mb-6 gradient-border relative">
            <div className="relative aspect-video cursor-pointer" onClick={handleImageClick}>
              <img
                src={screenshots[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Maximize button */}
              <button
                onClick={handleImageClick}
                className="absolute top-4 left-4 bg-black/30 text-white hover:bg-black/50 p-2 rounded-full z-20"
                aria-label="View full image"
              >
                <Maximize size={18} />
              </button>
              
              {screenshots.length > 1 && (
                <>
                  {/* Navigation arrows */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                  >
                    <ChevronLeft size={18} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                  >
                    <ChevronRight size={18} />
                  </Button>
                  
                  {/* Navigation dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          currentImageIndex === index 
                            ? "w-6 bg-blue-accent" 
                            : "w-2 bg-gray-300/60 hover:bg-gray-300"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDotClick(index);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/30"></div>
            </div>
          </div>

          {/* Thumbnails for multiple screenshots */}
          {screenshots.length > 1 && (
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4 justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Project Screenshots</h3>
                  <span className="text-muted-foreground text-sm">
                    {currentImageIndex + 1}/{screenshots.length}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {screenshots.map((screenshot, index) => (
                  <Card 
                    key={index} 
                    className={`min-w-[150px] cursor-pointer transition-all ${
                      currentImageIndex === index 
                        ? "ring-2 ring-blue-accent scale-105" 
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <CardContent className="p-2">
                      <div className="h-[80px] w-[150px] overflow-hidden rounded">
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Project Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <Separator className="mb-6" />
            <div className="space-y-4">
              {project.overview && project.overview.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {project.overview.map((item, index) => (
                    <li key={index} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No detailed overview available for this project.
                </p>
              )}
            </div>
          </div>

          {/* Back to Projects Button */}
          <div className="mb-12">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="hover:bg-muted/50"
            >
              Back to Projects
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Full image dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-1 bg-background/95 backdrop-blur-sm">
          <div className="relative">
            <img 
              src={screenshots[currentImageIndex]} 
              alt={project.title} 
              className="w-full h-full object-contain rounded-md"
            />
            
            {screenshots.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft size={18} />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={18} />
                </Button>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? "w-6 bg-blue-accent" 
                          : "w-2 bg-gray-300/60 hover:bg-gray-300"
                      }`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <DialogClose className="absolute right-2 top-2 rounded-full bg-black/30 p-1 text-white hover:bg-black/50">
            <span className="sr-only">Close</span>
            <ChevronRight className="h-4 w-4 rotate-45" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetails;
