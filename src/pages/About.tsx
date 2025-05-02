
import React from "react";
import { Progress } from "@/components/ui/progress";
import { skills, education, aboutMe } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="section container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">
                About <span className="text-blue-accent text-glow">Me</span>
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6 whitespace-pre-line">
                  {aboutMe}
                </p>
              </div>
              
              <Button
                className="bg-blue-accent hover:bg-blue-accent/80 mt-4"
                asChild
              >
                <a href="/belal-aboseada-cv.pdf" download>
                  <FileText size={16} className="mr-2" /> Download CV
                </a>
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-accent/20 to-purple-accent/20 rounded-lg p-10 flex items-center justify-center">
                <div className="text-8xl font-bold text-blue-accent text-glow animate-float">B</div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-accent/10 via-transparent to-purple-accent/10 blur-xl -z-10" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section container">
          <h2 className="section-title">My Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-blue-accent">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2 bg-muted" />
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="section container">
          <h2 className="section-title">Education</h2>
          
          <div className="space-y-8">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="gradient-border rounded-lg p-6 bg-card/50 relative"
              >
                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <h4 className="text-lg text-blue-accent mb-2">
                  {edu.institution}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">{edu.date}</p>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
