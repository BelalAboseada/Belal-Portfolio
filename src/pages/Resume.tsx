
import React from "react";
import ResumeViewer from "@/components/ResumeViewer";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Resume: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <section className="section container">
          <h1 className="text-4xl font-bold mb-8">
            My <span className="text-blue-accent text-glow">Resume</span>
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Below you can view or download my complete resume. It details my work experience, education, skills, and achievements.
          </p>
          
          <div className="h-[700px] max-h-[80vh]">
            <ResumeViewer />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
