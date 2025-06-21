import React from "react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experiences } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

function Experience(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow pt-24">
        <section className="section container">
          <h1 className="text-4xl font-bold mb-8">
            My <span className="text-blue-accent text-glow">Experience</span>
          </h1>

          <p className="text-muted-foreground mb-12 max-w-2xl">
            My professional journey as a front-end developer. Here's a timeline
            of my work experience and the skills I've developed along the way.
          </p>

          <ExperienceTimeline experiences={experiences} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Experience;
