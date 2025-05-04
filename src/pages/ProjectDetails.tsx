import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { projects } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import ProjectThumbnails from "@/components/ProjectThumbnails";
import ProjectOverview from "@/components/ProjectOverview";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(
    projects.find((p) => p.id === Number(id)) || null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-24">
        <div className="container">
          {/* Project Header */}
          <ProjectHeader project={project} />

          {/* Project Image Gallery */}
          <ProjectImageGallery
            title={project.title}
            screenshots={screenshots}
          />

          {/* Project Overview */}
          <ProjectOverview overview={project.overview} />

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
