
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Users, Clock, Play, Image as ImageIcon } from "lucide-react";
import RatingDisplay from "@/components/rating/RatingDisplay";

interface ServiceResultCardProps {
  service: any;
  isSelected?: boolean;
  onToggleSelect?: (service: any) => void;
  canSelect?: boolean;
}

const ServiceResultCard = ({ service, isSelected, onToggleSelect, canSelect }: ServiceResultCardProps) => {
  // ... keep existing code (validation and calculations)
  const serviceId = service.id || service.serviceId || service.service_id;
  const providerId = service.providerId || service.provider_id;
  
  if (!serviceId) {
    console.warn('Service card missing ID:', service);
    return null;
  }

  const hasMedia = (service.videos && service.videos.length > 0) || 
                   (service.video_urls && service.video_urls.length > 0) ||
                   (service.additionalImages && service.additionalImages.length > 0) ||
                   (service.additional_images && service.additional_images.length > 0);

  const videoCount = (service.videos?.length || 0) + (service.video_urls?.length || 0);
  const imageCount = (service.additionalImages?.length || 0) + (service.additional_images?.length || 0) + (service.imageUrl ? 1 : 0);

  const handleSelectToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(service);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
      <div className="relative h-48 overflow-hidden">
        {/* כפתור השוואה */}
        {onToggleSelect && (
          <div className="absolute top-2 right-2 z-10">
            <div 
              onClick={handleSelectToggle}
              className={`
                flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                }
                ${!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Checkbox 
                checked={isSelected} 
                disabled={!canSelect && !isSelected}
                className="h-4 w-4"
              />
              <span className="text-xs font-medium">השווה</span>
            </div>
          </div>
        )}

        {/* ... keep existing code (image display, media badges, price) */}
        {(service.imageUrl || service.image_url) ? (
          <img
            src={service.imageUrl || service.image_url}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-4xl text-blue-600 mb-2">🎪</div>
                      <div class="text-sm text-blue-600 font-medium">${service.name}</div>
                    </div>
                  </div>
                `;
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl text-blue-600 mb-2">🎪</div>
              <div className="text-sm text-blue-600 font-medium">{service.name}</div>
            </div>
          </div>
        )}

        {hasMedia && (
          <div className="absolute top-2 left-2 flex gap-1">
            {videoCount > 0 && (
              <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/80">
                <Play className="h-3 w-3 ml-1" />
                {videoCount}
              </Badge>
            )}
            {imageCount > 1 && (
              <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/80">
                <ImageIcon className="h-3 w-3 ml-1" />
                {imageCount}
              </Badge>
            )}
          </div>
        )}

        {service.featured && (
          <div className="absolute bottom-2 left-2">
            <Badge className="text-xs bg-amber-500 hover:bg-amber-600">
              מומלץ
            </Badge>
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
          <span className="font-bold text-blue-600">
            ₪{typeof service.price === 'number' ? service.price.toLocaleString() : service.price}
          </span>
          {(service.priceUnit || service.price_unit) && (
            <span className="text-xs text-gray-600 mr-1">
              {service.priceUnit || service.price_unit}
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* ... keep existing code (title, provider, description, rating, location, tags, action button) */}
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{service.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-blue-600 font-medium">{service.provider}</p>
            {providerId && (
              <Link to={`/provider/${providerId}`} className="text-xs text-gray-500 hover:text-blue-600">
                (צפה בספק)
              </Link>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{service.description}</p>

        <div className="space-y-2 mb-4">
          {service.rating > 0 && (
            <RatingDisplay 
              rating={service.rating} 
              reviewCount={service.reviewCount || service.review_count}
              size="sm"
            />
          )}

          {service.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{service.location}</span>
            </div>
          )}

          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {service.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {service.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{service.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        <Link to={`/service/${serviceId}`} className="block">
          <Button className="w-full">
            צפה בפרטים
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceResultCard;
