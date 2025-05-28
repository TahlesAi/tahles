
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Image, Video } from "lucide-react";
import { Link } from 'react-router-dom';

interface ServiceCardHeaderProps {
  service: any;
}

const ServiceCardHeader: React.FC<ServiceCardHeaderProps> = ({ service }) => {
  const hasMedia = service.videos_count > 0 || service.images_count > 1;
  
  return (
    <div className="md:w-1/4 relative">
      <img 
        src={service.image_url || '/placeholder.svg'} 
        alt={service.name}
        className="w-full h-full object-cover aspect-square md:aspect-auto"
      />
      {hasMedia && (
        <div className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded-md text-xs font-medium flex items-center">
          {service.videos_count > 0 && <Video className="w-3 h-3 ml-1" />}
          {service.images_count > 1 && <Image className="w-3 h-3 ml-1" />}
          <span>מדיה נוספת</span>
        </div>
      )}
    </div>
  );
};

export default ServiceCardHeader;
