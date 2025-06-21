import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/lib/data";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

function ExperienceTimeline(props: ExperienceTimelineProps): JSX.Element {
  const { experiences } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-10% 0px",
      threshold: [0, 0.5, 1],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          setActiveIndex((prevIndex) => Math.max(prevIndex, index));

          const ratio = entry.intersectionRatio;
          const newProgress = Math.min(
            (index + ratio) / (experiences.length - 1),
            1
          );
          setProgress((prev) => Math.max(prev, newProgress));
        }
      });
    }, options);

    const elements = document.querySelectorAll(".timeline-item");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, [experiences.length]);

  return (
    <div ref={timelineRef} className="relative space-y-12">
      {/* Timeline line with gradient */}
      <div
        className="absolute inset-0 h-full w-0.5 left-6 md:left-1/2 -translate-x-1/2 z-[-1] bg-muted/30 transition-all duration-700 ease-in-out"
        style={{
          background: `linear-gradient(to bottom, 
            rgb(59 130 246) 0%, 
            rgb(59 130 246) ${progress * 100}%, 
            rgb(148 163 184 / 0.3) ${progress * 100}%, 
            rgb(148 163 184 / 0.3) 100%)`,
        }}
      />

      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          data-index={index}
          className={cn(
            "timeline-item flex flex-col md:flex-row md:gap-8 md:items-center relative transition-all duration-700 ease-in-out",
            index % 2 === 0 ? "md:flex-row-reverse" : "",
            index <= activeIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          <div className="md:w-1/2 mb-4 md:mb-0 md:text-right md:pr-8">
            <div
              className={cn(
                "relative w-7 h-7 rounded-full text-white bg-background border-2 border-blue-accent flex items-center justify-center text-sm font-medium transition-all duration-700 ease-in-out hover:scale-110 hover:bg-blue-accent/10 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 shadow-lg",
                index <= activeIndex
                  ? "bg-blue-accent scale-110 "
                  : "scale-90 ",
                index % 2 === 0 ? "md:ml-0" : "md:ml-0"
              )}
            >
              {experience.id}
            </div>
            <h3
              className={cn(
                "text-lg font-bold transition-all duration-700 ease-in-out",
                index <= activeIndex
                  ? "text-blue-accent"
                  : "text-muted-foreground"
              )}
            >
              {experience.role}
            </h3>
            <p
              className={cn(
                "text-base font-medium transition-all duration-700 ease-in-out",
                index <= activeIndex
                  ? "text-foreground"
                  : "text-muted-foreground/70"
              )}
            >
              {experience.company}
            </p>
            <p className="text-sm text-muted-foreground/60">
              {experience.date}
            </p>
          </div>

          <div
            className={cn(
              "pl-16 md:pl-0 md:w-1/2",
              index % 2 === 0 ? "md:text-left md:pl-8" : "md:text-left md:pl-0"
            )}
          >
            <div
              className={cn(
                "bg-card p-6 rounded-lg gradient-border transition-all duration-700 ease-in-out transform",
                index <= activeIndex
                  ? "border-blue-accent shadow-lg scale-100"
                  : "scale-95 opacity-70"
              )}
            >
              <p className="text-sm mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className={cn(
                      "bg-muted/50 text-xs transition-all duration-700 ease-in-out",
                      index <= activeIndex ? "bg-muted" : "bg-muted/30"
                    )}
                  >
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
}

export default ExperienceTimeline;
