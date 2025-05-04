import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectImageGalleryProps {
  title: string;
  screenshots: string[];
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  title,
  screenshots,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    setImageDialogOpen(true);
  };

  return (
    <>
      {/* Main Project Image with Slider */}
      <div className="rounded-lg overflow-hidden mb-6 gradient-border relative">
        <div
          className="relative aspect-video cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={screenshots[currentImageIndex]}
            alt={`${title} screenshot ${currentImageIndex + 1}`}
            className="w-full h-full object-cover -z-10"
          />

          {/* Maximize button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleImageClick();
            }}
            className="absolute top-4 left-4 bg-black/30 text-white hover:bg-black/50 p-2 rounded-full z-20"
            aria-label="View full image"
          >
            <Maximize size={18} />
          </button>

          {screenshots.length > 1 && (
            <>
              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
              >
                <ChevronLeft size={18} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <ChevronRight size={18} />
              </Button>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all z-10 ${
                      currentImageIndex === index
                        ? "w-6 bg-blue-accent"
                        : "w-2 bg-gray-300/60 hover:bg-gray-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDotClick(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/30"></div>
        </div>
      </div>

      {/* Full image dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-1 bg-background/95 backdrop-blur-sm">
          <div className="relative">
            <img
              src={screenshots[currentImageIndex]}
              alt={title}
              className="w-full h-full object-contain rounded-md -z-10"
            />

            {screenshots.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
                  onClick={() => handlePrevImage()}
                >
                  <ChevronLeft size={18} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
                  onClick={() => handleNextImage()}
                >
                  <ChevronRight size={18} />
                </Button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all z-30 ${
                        currentImageIndex === index
                          ? "w-6 bg-blue-accent"
                          : "w-2 bg-gray-300/60 hover:bg-gray-300"
                      }`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <DialogClose className="absolute right-3 top-3 rounded-full bg-black/30 p-1 text-white hover:bg-black/50">
            <span className="sr-only">Close</span>
            <ChevronRight className="h-4 w-4 rotate-45" />
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Thumbnail section */}
      <ProjectThumbnails
        title={title}
        screenshots={screenshots}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </>
  );
};

export default ProjectImageGallery;

// Thumbnail component kept at the bottom as requested
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
          <Images size={20}  className="text-blue-accent" />
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
              <div className="h-[80px] w-[130px] overflow-hidden rounded">
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
