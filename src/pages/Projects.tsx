
import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="section container">
          <h1 className="text-4xl font-bold mb-8">
            My <span className="text-blue-accent text-glow">Projects</span>
          </h1>
          
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Here are some of the projects I've worked on. Each project showcases different skills and technologies that I've mastered throughout my journey as a front-end developer.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
