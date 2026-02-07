import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ResumeViewer(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded successfully.",
    });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Resume</h1>
        <Button
          onClick={handleDownload}
          className="bg-blue-accent hover:bg-blue-accent/80"
          asChild
        >
          <a
            href="https://drive.google.com/uc?export=download&id=1orMEF3oglnU5wRvENlJx-G3rOnHfYosU"
            download
          >
            <Download size={16} className="mr-2" /> Download PDF
          </a>
        </Button>
      </div>

      <div className="relative flex-grow gradient-border bg-card rounded-lg min-h-[600px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-t-blue-accent animate-spin" />
          </div>
        )}

        {/* Fallback text in case iframe doesn't work */}
        <div className={`${isLoading ? "hidden" : "block"} p-6 md:hidden`}>
          <p className="text-center">
            Resume preview is not available on small screens. Please use the
            download button to view the resume.
          </p>
        </div>

        {/* PDF iframe */}
        <iframe
          src="https://drive.google.com/file/d/1orMEF3oglnU5wRvENlJx-G3rOnHfYosU/preview"
          className={`w-full h-full rounded-lg hidden md:block ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={handleIframeLoad}
          title="Resume"
        />
      </div>
    </div>
  );
}

export default React.memo(ResumeViewer);
