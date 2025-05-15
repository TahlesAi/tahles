
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Tag, Users, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: {
    id?: string;
    name: string;
    description?: string;
    price_range?: string;
    duration?: string;
    is_premium?: boolean;
    is_custom?: boolean;
    max_attendees?: number;
    image_url?: string;
  };
  onBookService: (service: any) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden border-gray-200 relative">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {service.is_premium && (
            <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-2 py-1 rotate-[-45deg] translate-x-[-20px] translate-y-[10px] z-10">
              פרימיום
            </div>
          )}
          
          <div className="md:col-span-3 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold flex items-center">
                {service.name}
                {service.is_premium && <Star className="h-4 w-4 ml-1 text-amber-500" />}
              </h3>
              <span className="text-xl font-bold text-primary">{service.price_range}</span>
            </div>
            
            <p className="text-gray-600 mb-3">{service.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              {service.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  {service.duration}
                </div>
              )}
              
              {service.max_attendees && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 ml-1" />
                  עד {service.max_attendees} משתתפים
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {service.is_custom && (
                <Badge variant="outline" className="bg-blue-50">התאמה אישית</Badge>
              )}
              <Badge variant="outline" className={service.is_premium ? "bg-amber-50" : ""}>
                {service.is_premium ? "איכות פרימיום" : "איכות גבוהה"}
              </Badge>
              <Badge variant="outline">מקצועי</Badge>
            </div>
            
            <Button 
              onClick={() => onBookService(service)}
              className={service.is_premium ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              הזמן עכשיו
            </Button>
          </div>
          
          {service.image_url && (
            <div className="md:col-span-1">
              <img 
                src={service.image_url} 
                alt={service.name} 
                className="h-full w-full object-cover aspect-square md:aspect-auto"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
