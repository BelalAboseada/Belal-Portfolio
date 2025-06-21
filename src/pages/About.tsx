import React, { useCallback, useMemo, useState } from "react";
import { education, aboutMe, skillsData } from "@/lib/data";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";

function About(): JSX.Element {
  const [category, setCategory] = useState("Skills");
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const { toast } = useToast();

  // Function to handle tab selection
  const handleTabClick = useCallback(
    (cat, index) => {
      setLeft(index * 100);
      setCategory(cat);
      setSelectedTab(index);
    },
    [selectedTab]
  );

  // Filter skills based on category
  const filteredSkills = useMemo(
    () => skillsData.filter((skill) => skill.Cat === category),
    [category]
  );

  const handleDownload = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded successfully.",
    });
  };

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
                onClick={handleDownload}
                className="bg-blue-accent hover:bg-blue-accent/80 mt-4"
                asChild
              >
                <a
                  href="https://drive.google.com/uc?export=download&id=1wsTXzmI736TrNq_zMCQPLb3YbUHzkzCs"
                  download
                >
                  <FileText size={16} className="mr-2" /> Download CV
                </a>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-accent/20 to-purple-accent/20 rounded-lg p-10 flex items-center justify-center">
                <div className="text-8xl font-bold text-blue-accent text-glow animate-float">
                  B
                </div>
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
            <div>
              <h2
                className="text-lg text-blue-accent mb-2"
                aria-label="Skills heading"
              >
                What My Programming Skills Included?
              </h2>
              <p
                className="text-base text-muted-foregoround mb-1"
                aria-label="Skills description"
              >
                I specialize in creating intuitive and responsive web interfaces
                using React and JavaScript, working closely with backend teams
                to integrate via RESTful APIs.
              </p>
              <div className="switchingTabs">
                {/* Map through categories to create tab buttons */}
                <div className="tabItems">
                  {["Skills", "Tools"].map((cat, index) => (
                    <button
                      key={index}
                      className={`tabItem ${
                        selectedTab === index ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(cat, index)}
                    >
                      {cat}
                    </button>
                  ))}
                  <span className="movingBg" style={{ left }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
              {filteredSkills.map(({ title, img }, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="img group relative"
                        data-aos="fade-down"
                        data-aos-anchor-placement="top-left"
                        data-aos-duration="900"
                        aria-label={`Skills ${title}`}
                      >
                        <img
                          src={img}
                          alt={title}
                          className="max-w-16 max-h-16 w-full h-full m-auto rounded-lg bg-muted p-3 transition-transform transform "
                          loading="lazy"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-blue-accent text-white text-sm px-2 py-1 rounded-lg shadow-lg">
                      {title}
                      <TooltipPrimitives.Arrow
                        className="-my-px border-none fill-blue-accent "
                        width={12}
                        height={7}
                        aria-hidden="true"
                      />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
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
}

export default About;
