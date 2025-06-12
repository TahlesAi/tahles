
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface OptimizedServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  provider?: string;
  location?: string;
  featured?: boolean;
  compact?: boolean;
}

export const OptimizedServiceCard: React.FC<OptimizedServiceCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  rating,
  reviewCount,
  provider,
  location,
  featured,
  compact = false
}) => {
  const formatPrice = (price: number) => {
    return `₪${price.toLocaleString()}`;
  };

  return (
    <Card className={`service-card transition-all duration-300 hover:shadow-lg ${compact ? 'h-64' : 'h-full'}`}>
      <CardHeader className="p-0">
        <div className={`relative w-full bg-gray-200 rounded-t-lg overflow-hidden ${compact ? 'h-32' : 'h-48'}`}>
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          
          {/* Quick action buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            {featured && (
              <Badge className="bg-yellow-500 text-white text-xs">
                מומלץ
              </Badge>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`p-4 ${compact ? 'space-y-2' : 'space-y-3'}`}>
        <div className="space-y-1">
          <CardTitle className={`${compact ? 'text-base' : 'text-lg'} line-clamp-1`}>
            {name}
          </CardTitle>
          {provider && (
            <p className="text-sm text-brand-600 font-medium">{provider}</p>
          )}
          {!compact && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <Badge variant="outline" className="text-brand-600 border-brand-600">
            {formatPrice(price)}
          </Badge>
          <Link to={`/enhanced-services/${id}`}>
            <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
              הזמן עכשיו
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
