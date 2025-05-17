
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface ServiceGalleryProps {
  mediaGallery: MediaItem[];
  serviceName: string;
}

const ServiceGallery = ({ mediaGallery, serviceName }: ServiceGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? mediaGallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === mediaGallery.length - 1 ? 0 : prev + 1));
  };

  if (mediaGallery.length === 0) {
    return (
      <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9] bg-gray-100 flex items-center justify-center">
        <ImageIcon className="h-16 w-16 text-gray-300" />
      </div>
    );
  }

  return (
    <>
      {/* Image Gallery */}
      <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
        {mediaGallery[selectedImageIndex].type === 'image' ? (
          <img 
            src={mediaGallery[selectedImageIndex].url || "/placeholder.svg"} 
            alt={serviceName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <video 
              src={mediaGallery[selectedImageIndex].url} 
              controls 
              className="max-h-full max-w-full"
            />
          </div>
        )}
        
        {/* Media type indicator */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
          {mediaGallery[selectedImageIndex].type === 'image' ? (
            <>
              <ImageIcon className="h-3 w-3 ml-1" />
              תמונה
            </>
          ) : (
            <>
              <Play className="h-3 w-3 ml-1" />
              סרטון
            </>
          )}
        </div>
        
        {/* Image Navigation */}
        {mediaGallery.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full bg-white/80"
              onClick={handlePrevImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full bg-white/80"
              onClick={handleNextImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Image Counter */}
        {mediaGallery.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {selectedImageIndex + 1} / {mediaGallery.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {mediaGallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {mediaGallery.map((media, idx) => (
            <div 
              key={idx} 
              className={`w-20 h-20 rounded overflow-hidden cursor-pointer flex-shrink-0 border-2 relative ${
                idx === selectedImageIndex ? 'border-brand-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedImageIndex(idx)}
            >
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  alt={`תמונה ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ServiceGallery;
