
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { SearchResultService } from "@/lib/types";

interface ServiceResultCardProps {
  service: SearchResultService;
}

const ServiceResultCard = ({ service }: ServiceResultCardProps) => {
  return (
    <Link to={`/services/${service.id}`}>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {service.category}
          </div>
          {service.featured && (
            <div className="absolute top-2 left-2 bg-accent1-500 px-2 py-1 rounded-full text-xs font-medium text-white">
              מומלץ
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{service.name}</h3>
          <p className="text-gray-500 text-sm mb-1">{service.provider}</p>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{service.description}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium ml-1">{service.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({service.reviewCount})</span>
            </div>
            <div className="text-brand-600 font-semibold">₪{service.price}</div>
          </div>
          
          {service.location && (
            <div className="mt-2 text-xs text-gray-500">
              {service.location}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceResultCard;
