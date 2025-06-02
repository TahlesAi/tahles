
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Heart, Share2 } from 'lucide-react';
import RatingDisplay from '@/components/rating/RatingDisplay';

interface ResponsiveServiceCardProps {
  service: any;
  variant?: 'grid' | 'list';
}

const ResponsiveServiceCard: React.FC<ResponsiveServiceCardProps> = ({ 
  service, 
  variant = 'grid' 
}) => {
  if (variant === 'list') {
    return (
      <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* תמונה */}
          <div className="w-full sm:w-48 h-48 sm:h-32 relative">
            <img
              src={service.imageUrl || service.image_url}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            {service.featured && (
              <Badge className="absolute top-2 left-2 bg-amber-500">מומלץ</Badge>
            )}
          </div>
          
          {/* תוכן */}
          <div className="flex-1 p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{service.provider}</p>
                
                {service.rating > 0 && (
                  <div className="mb-2">
                    <RatingDisplay 
                      rating={service.rating}
                      reviewCount={service.reviewCount}
                      size="sm"
                    />
                  </div>
                )}
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {service.description}
                </p>
                
                {service.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {service.location}
                  </div>
                )}
              </div>
              
              <div className="text-left sm:text-right">
                <div className="text-xl font-bold text-blue-600 mb-2">
                  ₪{service.price?.toLocaleString()}
                </div>
                <div className="flex sm:flex-col gap-2">
                  <Button size="sm" className="flex-1 sm:w-auto">
                    צפה בפרטים
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      {/* תמונה */}
      <div className="relative h-48 sm:h-56 lg:h-48">
        <img
          src={service.imageUrl || service.image_url}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {service.featured && (
          <Badge className="absolute top-2 left-2 bg-amber-500">מומלץ</Badge>
        )}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
          <span className="font-bold text-blue-600 text-sm sm:text-base">
            ₪{service.price?.toLocaleString()}
          </span>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2">{service.name}</h3>
        <p className="text-sm text-blue-600 mb-2">{service.provider}</p>
        
        {service.rating > 0 && (
          <div className="mb-2">
            <RatingDisplay 
              rating={service.rating}
              reviewCount={service.reviewCount}
              size="sm"
            />
          </div>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {service.description}
        </p>
        
        {service.location && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{service.location}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            צפה בפרטים
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponsiveServiceCard;
