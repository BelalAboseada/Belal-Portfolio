
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectThumbnailsProps {
  title: string;
  screenshots: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const ProjectThumbnails: React.FC<ProjectThumbnailsProps> = ({
  title,
  screenshots,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  if (screenshots.length <= 1) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Project Screenshots</h3>
          <span className="text-muted-foreground text-sm">
            {currentImageIndex + 1}/{screenshots.length}
          </span>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {screenshots.map((screenshot, index) => (
          <Card 
            key={index} 
            className={`min-w-[150px] cursor-pointer transition-all ${
              currentImageIndex === index 
                ? "ring-2 ring-blue-accent scale-105" 
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <CardContent className="p-2">
              <div className="h-[80px] w-[150px] overflow-hidden rounded">
                <img
                  src={screenshot}
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectThumbnails;
