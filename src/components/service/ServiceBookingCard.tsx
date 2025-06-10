
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Calendar, Clock, Users, MapPin } from "lucide-react";

interface ServiceBookingCardProps {
  service: any;
  provider: any;
  averageRating: number;
  reviewCount: number;
  isSaved: boolean;
  toggleSave: () => void;
}

const ServiceBookingCard = ({
  service,
  provider,
  averageRating,
  reviewCount,
  isSaved,
  toggleSave
}: ServiceBookingCardProps) => {
  const formatPrice = (price: any) => {
    if (typeof price === 'string') {
      return `₪${price}`;
    }
    if (service.priceRange) {
      return `₪${service.priceRange.min.toLocaleString()}-₪${service.priceRange.max.toLocaleString()}`;
    }
    return `₪${price?.toLocaleString() || 'לפי הצעה'}`;
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Price */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatPrice(service.price)}
            </div>
            <div className="text-sm text-gray-600">
              {service.priceUnit || 'למופע'}
            </div>
          </div>

          {/* Rating */}
          {averageRating > 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium mr-1">{averageRating}</span>
              </div>
              <span className="text-gray-600 text-sm">
                ({reviewCount} ביקורות)
              </span>
            </div>
          )}

          {/* Service Details */}
          <div className="space-y-2 text-sm">
            {service.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{service.duration}</span>
              </div>
            )}
            
            {service.variants && service.variants.length > 0 && (
              <div className="space-y-1">
                <div className="font-medium">וריאנטים זמינים:</div>
                {service.variants.map((variant: any, index: number) => (
                  <div key={index} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                    <span>{variant.name}</span>
                    <span>₪{variant.basePrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{service.location || 'בכל הארץ'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-4 w-4 ml-2" />
              בדוק זמינות והזמן
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={toggleSave}
            >
              <Heart 
                className={`h-4 w-4 ml-2 ${isSaved ? 'fill-current text-red-500' : ''}`} 
              />
              {isSaved ? 'הוסר מהמועדפים' : 'הוסף למועדפים'}
            </Button>
          </div>

          {/* Provider Info */}
          {provider && (
            <div className="pt-4 border-t">
              <div className="text-sm">
                <div className="font-medium mb-1">נותן השירות</div>
                <div className="text-gray-600">{provider.name}</div>
                {provider.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs">{provider.rating} ({provider.reviewCount} ביקורות)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {service.tags && (
            <div className="flex flex-wrap gap-1">
              {service.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceBookingCard;
