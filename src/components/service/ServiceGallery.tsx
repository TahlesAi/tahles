
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ImageIcon, Play, Maximize2 } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? mediaGallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === mediaGallery.length - 1 ? 0 : prev + 1));
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  // Fallback image for broken URLs
  const getFallbackImage = () => "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop";

  if (!mediaGallery || mediaGallery.length === 0) {
    return (
      <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">אין תמונות זמינות</p>
        </div>
      </div>
    );
  }

  const currentMedia = mediaGallery[selectedImageIndex];
  const isCurrentImageError = imageErrors.has(selectedImageIndex);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative rounded-xl overflow-hidden mb-6 aspect-[16/9] bg-black group">
        {currentMedia.type === 'image' ? (
          <img 
            src={isCurrentImageError ? getFallbackImage() : currentMedia.url} 
            alt={serviceName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => handleImageError(selectedImageIndex)}
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <video 
              src={currentMedia.url} 
              controls 
              className="max-h-full max-w-full"
            />
          </div>
        )}
        
        {/* Media type indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center backdrop-blur-sm">
          {currentMedia.type === 'image' ? (
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

        {/* Fullscreen button */}
        {currentMedia.type === 'image' && (
          <Button
            size="icon"
            variant="outline"
            className="absolute top-4 right-4 bg-black/70 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm"
            onClick={handleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        )}
        
        {/* Navigation Arrows */}
        {mediaGallery.length > 1 && (
          <>
            <Button 
              size="icon" 
              variant="outline" 
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
              onClick={handlePrevImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
              onClick={handleNextImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </>
        )}
        
        {/* Image Counter */}
        {mediaGallery.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
            {selectedImageIndex + 1} / {mediaGallery.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {mediaGallery.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6">
          {mediaGallery.map((media, idx) => (
            <div 
              key={idx} 
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 relative group ${
                idx === selectedImageIndex 
                  ? 'ring-2 ring-brand-500 shadow-lg scale-105' 
                  : 'hover:ring-2 hover:ring-brand-300 hover:scale-102'
              }`}
              onClick={() => setSelectedImageIndex(idx)}
            >
              {media.type === 'image' ? (
                <img 
                  src={imageErrors.has(idx) ? getFallbackImage() : media.url} 
                  alt={`תמונה ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  onError={() => handleImageError(idx)}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                  <Play className="h-6 w-6 text-white z-10" />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              )}
              {idx === selectedImageIndex && (
                <div className="absolute inset-0 bg-brand-500/20"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && currentMedia.type === 'image' && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <img 
            src={isCurrentImageError ? getFallbackImage() : currentMedia.url} 
            alt={serviceName}
            className="max-w-full max-h-full object-contain"
            onError={() => handleImageError(selectedImageIndex)}
          />
          <Button
            size="icon"
            variant="outline"
            className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(false)}
          >
            ×
          </Button>
        </div>
      )}
    </>
  );
};

export default ServiceGallery;
