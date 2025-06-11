
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Image, Video } from "lucide-react";

interface ServiceCardHeaderProps {
  service: any;
}

const ServiceCardHeader: React.FC<ServiceCardHeaderProps> = ({ service }) => {
  // Check for media gallery or fallback to basic image count logic
  const hasMediaGallery = service.mediaGallery && service.mediaGallery.length > 0;
  const videoCount = hasMediaGallery 
    ? service.mediaGallery.filter((item: any) => item.type === 'video').length
    : (service.videos_count || 0);
  const imageCount = hasMediaGallery 
    ? service.mediaGallery.filter((item: any) => item.type === 'image').length
    : (service.images_count || 1);
  
  const hasMedia = videoCount > 0 || imageCount > 1;
  
  return (
    <div className="md:w-1/4 relative">
      <img 
        src={service.image_url || service.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'} 
        alt={service.name}
        className="w-full h-full object-cover aspect-square md:aspect-auto"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop';
        }}
      />
      {hasMedia && (
        <div className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded-md text-xs font-medium flex items-center">
          {videoCount > 0 && <Video className="w-3 h-3 ml-1" />}
          {imageCount > 1 && <Image className="w-3 h-3 ml-1" />}
          <span>מדיה נוספת</span>
        </div>
      )}
    </div>
  );
};

export default ServiceCardHeader;
