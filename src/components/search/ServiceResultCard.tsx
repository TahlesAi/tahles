
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, MapPin, Image, Video } from "lucide-react";
import { SearchResultService } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ServiceResultCardProps {
  service: SearchResultService;
}

const ServiceResultCard = ({ service }: ServiceResultCardProps) => {
  // Check for media presence
  const hasMedia = service.videoCount && service.videoCount > 0 || 
                  service.imageCount && service.imageCount > 1;
  
  return (
    <Link to={`/services/${service.id}`}>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {service.category}
          </div>
          {service.featured && (
            <div className="absolute top-2 left-2 bg-accent1-500 px-2 py-1 rounded-full text-xs font-medium text-white">
              מומלץ
            </div>
          )}
          {hasMedia && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white p-1 rounded-md text-xs font-medium flex items-center">
              {service.videoCount && service.videoCount > 0 && <Video className="w-3 h-3 ml-1" />}
              {service.imageCount && service.imageCount > 1 && <Image className="w-3 h-3 ml-1" />}
              <span>מדיה נוספת</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{service.name}</h3>
            <div className="text-brand-600 font-semibold text-right">₪{service.price}</div>
          </div>
          <p className="text-gray-500 text-sm mb-1">{service.provider}</p>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {service.tags && service.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium ml-1">{service.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({service.reviewCount})</span>
            </div>
            
            <Button size="sm" variant="outline" className="text-xs">
              פרטים נוספים
            </Button>
          </div>
          
          {service.location && (
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 ml-1" />
              {service.location}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceResultCard;
