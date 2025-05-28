
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Heart,
  Eye,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { SearchResultService } from "@/lib/types";

interface ServiceCardProps {
  service: SearchResultService;
  showSaveButton?: boolean;
  compact?: boolean;
}

// Helper functions for saved services
export const saveServiceForLater = (service: any) => {
  const savedServices = JSON.parse(localStorage.getItem('savedServices') || '[]');
  const newService = {
    ...service,
    saved_at: new Date().toISOString()
  };
  
  const updatedServices = [...savedServices.filter((s: any) => s.id !== service.id), newService];
  localStorage.setItem('savedServices', JSON.stringify(updatedServices));
  
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new CustomEvent('savedServicesUpdated'));
};

export const removeSavedService = (serviceId: string) => {
  const savedServices = JSON.parse(localStorage.getItem('savedServices') || '[]');
  const updatedServices = savedServices.filter((s: any) => s.id !== serviceId);
  localStorage.setItem('savedServices', JSON.stringify(updatedServices));
  
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new CustomEvent('savedServicesUpdated'));
};

export const isServiceSaved = (serviceId: string): boolean => {
  const savedServices = JSON.parse(localStorage.getItem('savedServices') || '[]');
  return savedServices.some((s: any) => s.id === serviceId);
};

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  showSaveButton = true, 
  compact = false 
}) => {
  const [isSaved, setIsSaved] = useState(isServiceSaved(service.id));

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      removeSavedService(service.id);
      setIsSaved(false);
    } else {
      saveServiceForLater({
        id: service.id,
        name: service.name,
        short_description: service.description,
        price_range: typeof service.price === 'number' ? `₪${service.price}` : service.price,
        provider_id: service.providerId || '',
        provider_name: service.provider,
        image_url: service.imageUrl
      });
      setIsSaved(true);
    }
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'number') {
      return `₪${price.toLocaleString()}`;
    }
    return price;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-0">
        <div className="relative">
          {/* Service Image */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img 
              src={service.imageUrl} 
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {service.featured && (
                <Badge className="bg-yellow-500 text-white">
                  <Star className="h-3 w-3 ml-1" />
                  מומלץ
                </Badge>
              )}
              {showSaveButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={handleSaveToggle}
                >
                  <Heart 
                    className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              )}
            </div>

            {/* Media Count */}
            {(service.imageCount || service.videoCount) && (
              <div className="absolute bottom-3 left-3 flex gap-2">
                {service.imageCount && (
                  <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                    {service.imageCount} תמונות
                  </Badge>
                )}
                {service.videoCount && (
                  <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                    {service.videoCount} וידאו
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Service Content */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg line-clamp-2 text-right">
                  {service.name}
                </h3>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-gray-500">({service.reviewCount})</span>
                </div>
              </div>
              
              <Link 
                to={`/enhanced-providers/${service.providerId}`}
                className="text-brand-600 hover:underline font-medium text-sm"
              >
                {service.provider}
              </Link>
            </div>

            {/* Description */}
            {!compact && (
              <p className="text-gray-600 text-sm line-clamp-2 text-right">
                {service.description}
              </p>
            )}

            {/* Details */}
            <div className="space-y-2">
              {service.category && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                  {service.subcategory && (
                    <Badge variant="outline" className="text-xs">
                      {service.subcategory}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-600">
                {service.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {service.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {service.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{service.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Price and Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-right">
                <div className="text-lg font-bold text-brand-600">
                  {formatPrice(service.price)}
                </div>
                {service.priceUnit && (
                  <div className="text-xs text-gray-500">{service.priceUnit}</div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Link to={`/enhanced-services/${service.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 ml-2" />
                    צפה
                  </Button>
                </Link>
                <Link to={`/enhanced-services/${service.id}`}>
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    הזמן
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
