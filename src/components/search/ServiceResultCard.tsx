
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
  const hasMedia = 
    (service.videoCount !== undefined && service.videoCount > 0) || 
    (service.imageCount !== undefined && service.imageCount > 1);
  
  return (
    <Link to={`/services/${service.id}`}>
      <Card className="overflow-hidden border hover:border-brand-300 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          
          {/* קטגוריה */}
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
            {service.category}
          </div>
          
          {/* דירוג - הבלטה טובה יותר */}
          <div className="absolute bottom-2 right-2 bg-brand-600/90 text-white px-2 py-1 rounded-md flex items-center">
            <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{service.rating}</span>
            <span className="text-xs ml-1">({service.reviewCount})</span>
          </div>
          
          {/* תג מקודם/מומלץ */}
          {service.featured && (
            <div className="absolute top-2 left-2 bg-accent1-500 px-2 py-1 rounded-md text-xs font-medium text-white">
              מומלץ
            </div>
          )}
          
          {/* מדיה נוספת */}
          {hasMedia && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white p-1 rounded-md text-xs font-medium flex items-center">
              {service.videoCount !== undefined && service.videoCount > 0 && <Video className="w-3 h-3 ml-1" />}
              {service.imageCount !== undefined && service.imageCount > 1 && <Image className="w-3 h-3 ml-1" />}
              <span>מדיה נוספת</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-3 flex-grow flex flex-col">
          <div>
            {/* שם השירות */}
            <h3 className="font-semibold text-base mb-0.5 line-clamp-1">{service.name}</h3>
            
            {/* שם הספק */}
            <p className="text-gray-500 text-xs mb-1">{service.provider}</p>
            
            {/* תיאור */}
            <p className="text-gray-600 text-xs mb-2 line-clamp-2">{service.description}</p>
            
            {/* תגיות */}
            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {service.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-[0.65rem] px-1 py-0 h-4">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* מיקום */}
          {service.location && (
            <div className="text-[0.65rem] text-gray-500 flex items-center mt-1">
              <MapPin className="h-3 w-3 ml-1" />
              {service.location}
            </div>
          )}
          
          {/* מחיר וכפתור */}
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="text-brand-600 font-bold">₪{service.price}</div>
            <Button size="sm" variant="outline" className="text-xs h-7 px-2">
              פרטים נוספים
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceResultCard;
