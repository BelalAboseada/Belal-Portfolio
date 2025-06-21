import React from "react";
import { Separator } from "@/components/ui/separator";

interface ProjectOverviewProps {
  overview: string[];
}

function ProjectOverview({ overview }: ProjectOverviewProps): JSX.Element {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
      <Separator className="mb-6" />
      <div className="space-y-4">
        {overview && overview.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {overview.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No detailed overview available for this project.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectOverview;
