
import React from "react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  // Show only the first 3 projects on the home page
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main>
        <Hero />

        {/* Featured Projects Section */}
        <section className="section container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title">Featured Projects</h2>
            <Button
              variant="outline"
              className="border-blue-accent text-blue-accent hover:bg-blue-accent/10"
              asChild
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* About Me Section */}
        <section className="section container">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="section-title">About Me</h2>
              <p className="mb-6 text-muted-foreground">
                I'm a passionate Front-End Developer specializing in creating engaging and responsive web experiences. With a strong foundation in modern JavaScript frameworks and libraries, I enjoy bringing designs to life through clean, efficient code.
              </p>
              <Button
                className="bg-blue-accent hover:bg-blue-accent/80"
                asChild
              >
                <Link to="/about">Learn More About Me</Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-accent/20 to-purple-accent/20 rounded-lg flex items-center justify-center p-10">
                <div className="text-6xl font-bold text-center text-glow text-blue-accent">B</div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-accent/10 via-transparent to-purple-accent/10 blur-xl -z-10" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-darker-bg relative overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Let's Work Together</h2>
              <p className="text-muted-foreground mb-8">
                Have a project in mind? Let's discuss how I can help bring your ideas to life with clean code and engaging user experiences.
              </p>
              <Button
                size="lg"
                className="bg-blue-accent hover:bg-blue-accent/80 animate-glow"
                asChild
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-accent/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-accent/10 rounded-full blur-[80px]" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
