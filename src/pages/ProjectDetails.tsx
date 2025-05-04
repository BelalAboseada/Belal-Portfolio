
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { projects } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(
    projects.find((p) => p.id === Number(id)) || null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

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

          {/* Main Project Image */}
          <div className="rounded-lg overflow-hidden mb-12 gradient-border">
            <div className="relative aspect-video">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/30"></div>
            </div>
          </div>

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
    </div>
  );
};

export default ProjectDetails;
