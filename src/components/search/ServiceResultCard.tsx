
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users, CheckCircle, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';

interface ServiceResultCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    base_price: number;
    price_unit: string;
    duration_minutes?: number;
    min_participants?: number;
    max_participants?: number;
    image_url?: string;
    target_age_groups?: string[];
    event_types?: string[];
    provider?: {
      id: string;
      name: string;
      city: string;
      rating: number;
      review_count: number;
      is_verified: boolean;
    };
  };
  onBook?: () => void;
}

const ServiceResultCard: React.FC<ServiceResultCardProps> = ({ service, onBook }) => {
  const { provider } = service;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-r-4 border-r-blue-500" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-blue-800">
                {service.name}
              </h3>
              {provider?.is_verified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            {provider && (
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <Link 
                  to={`/provider/${provider.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {provider.name}
                </Link>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{provider.rating}</span>
                  <span>({provider.review_count})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city}</span>
                </div>
              </div>
            )}
          </div>
          
          {service.image_url && (
            <img 
              src={service.image_url}
              alt={service.name}
              className="w-20 h-20 rounded-lg object-cover border"
            />
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">
          {service.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {service.duration_minutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{service.duration_minutes} דק'</span>
            </div>
          )}
          
          {(service.min_participants || service.max_participants) && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span>
                {service.min_participants && service.max_participants
                  ? `${service.min_participants}-${service.max_participants} אנשים`
                  : service.min_participants
                    ? `מ-${service.min_participants} אנשים`
                    : `עד ${service.max_participants} אנשים`
                }
              </span>
            </div>
          )}
        </div>
        
        {service.target_age_groups && service.target_age_groups.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service.target_age_groups.map((age, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {age}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {service.event_types && service.event_types.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service.event_types.slice(0, 3).map((type, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
              {service.event_types.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{service.event_types.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-xl font-bold text-blue-600">
            ₪{service.base_price.toLocaleString()} {service.price_unit}
          </div>
          
          <div className="flex gap-2">
            <Link to={`/service/${service.id}`}>
              <Button variant="outline" size="sm">
                פרטים
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onBook}
            >
              <Calendar className="h-4 w-4 ml-1" />
              הזמן
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceResultCard;
