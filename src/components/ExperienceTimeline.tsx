import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/lib/data";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-muted before:left-6 md:before:left-1/2 before:-translate-x-1/2 before:z-[-1]">
      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className={cn(
            "flex flex-col md:flex-row md:gap-8 md:items-center relative",
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          )}
        >
          <div className="md:w-1/2 mb-4 md:mb-0 md:text-right md:pr-8">
            <div
              className={cn(
                "relative w-7 h-7 rounded-full text-white bg-background border-2 border-blue-accent flex items-center justify-center text-sm font-medium  transition-all duration-300 hover:scale-110 hover:bg-blue-accent/10 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10",
                index % 2 === 0 ? "md:ml-0" : "md:ml-0"
              )}
            >
              {experience.id}
            </div>
            <h3 className="text-lg font-bold text-blue-accent">
              {experience.role}
            </h3>
            <p className="text-base font-medium">{experience.company}</p>
            <p className="text-sm text-muted-foreground">{experience.date}</p>
          </div>
          
          <div className={cn(
            "pl-16 md:pl-0 md:w-1/2",
            index % 2 === 0 ? "md:text-left md:pl-8" : "md:text-left md:pl-0"
          )}>
            <div className="bg-card p-6 rounded-lg gradient-border">
              <p className="text-sm mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-muted text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
