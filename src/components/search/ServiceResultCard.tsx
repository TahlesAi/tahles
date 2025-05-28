
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Image, Video } from "lucide-react";
import { SearchResultService } from "@/lib/types";

interface ServiceResultCardProps {
  service: SearchResultService;
}

const ServiceResultCard = ({ service }: ServiceResultCardProps) => {
  // Check for media presence
  const hasMedia = 
    (service.videoCount !== undefined && service.videoCount > 0) || 
    (service.imageCount !== undefined && service.imageCount > 1);
  
  return (
    <Link to={`/products/${service.id}`} className="block h-full">
      <Card className="overflow-hidden border hover:border-brand-300 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer group">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* קטגוריה */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
            {service.category}
          </div>
          
          {/* דירוג - הבלטה טובה יותר */}
          <div className="absolute bottom-3 right-3 bg-brand-600/95 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center shadow-sm">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{service.rating}</span>
            <span className="text-xs ml-1">({service.reviewCount})</span>
          </div>
          
          {/* תג מקודם/מומלץ */}
          {service.featured && (
            <div className="absolute top-3 left-3 bg-accent1-500 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm">
              מומלץ
            </div>
          )}
          
          {/* מדיה נוספת */}
          {hasMedia && (
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white p-2 rounded-full text-xs font-medium flex items-center shadow-sm">
              {service.videoCount !== undefined && service.videoCount > 0 && <Video className="w-4 h-4 ml-1" />}
              {service.imageCount !== undefined && service.imageCount > 1 && <Image className="w-4 h-4 ml-1" />}
              <span>מדיה נוספת</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            {/* שם השירות */}
            <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-brand-600 transition-colors">{service.name}</h3>
            
            {/* שם הספק */}
            <p className="text-gray-500 text-sm mb-2 font-medium">{service.provider}</p>
            
            {/* תיאור */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{service.description}</p>
            
            {/* תגיות */}
            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {service.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-1 h-auto border-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* מיקום */}
          {service.location && (
            <div className="text-sm text-gray-500 flex items-center mb-3">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{service.location}</span>
            </div>
          )}
          
          {/* מחיר */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-brand-600 font-bold text-xl">₪{service.price}</div>
              <div className="text-sm text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                לחצו לפרטים
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceResultCard;
