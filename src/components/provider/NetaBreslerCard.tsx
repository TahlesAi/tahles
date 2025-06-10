
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, CheckCircle, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';

interface NetaBreslerCardProps {
  provider: {
    id: string;
    name: string;
    description: string;
    city: string;
    phone: string;
    rating: number;
    review_count: number;
    is_verified: boolean;
    logo_url?: string;
  };
  services: Array<{
    id: string;
    name: string;
    description: string;
    base_price: number;
    price_unit: string;
    duration_minutes?: number;
    image_url?: string;
  }>;
}

const NetaBreslerCard: React.FC<NetaBreslerCardProps> = ({ provider, services }) => {
  const featuredService = services[0]; // המופע המרכזי
  
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300" dir="rtl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {provider.logo_url && (
              <img 
                src={provider.logo_url}
                alt={provider.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
            )}
            <div>
              <CardTitle className="text-xl text-purple-800 mb-1">
                {provider.name}
                {provider.is_verified && (
                  <CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />
                )}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{provider.rating}</span>
                  <span>({provider.review_count} ביקורות)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge className="bg-purple-600">מנטליסט מוביל</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-2">
          {provider.description}
        </p>
        
        {featuredService && (
          <div className="bg-white rounded-lg p-4 mb-4 border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">
              {featuredService.name}
            </h4>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {featuredService.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-purple-600">
                ₪{featuredService.base_price.toLocaleString()} {featuredService.price_unit}
              </div>
              {featuredService.duration_minutes && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{featuredService.duration_minutes} דק'</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <Phone className="inline h-4 w-4 ml-1" />
            {provider.phone}
          </div>
          <div className="flex gap-2">
            <Link to={`/provider/${provider.id}`}>
              <Button variant="outline" size="sm">
                צפה בפרופיל
              </Button>
            </Link>
            {featuredService && (
              <Link to={`/service/${featuredService.id}`}>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  הזמן עכשיו
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {services.length > 1 && (
          <div className="mt-3 pt-3 border-t border-purple-100">
            <p className="text-sm text-gray-600">
              + {services.length - 1} שירותים נוספים זמינים
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetaBreslerCard;
