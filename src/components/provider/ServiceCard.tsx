
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Tag, Users } from "lucide-react";
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
    <Card className="overflow-hidden border-gray-200">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {service.is_premium && (
            <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs px-2 py-1 rotate-[-45deg] translate-x-[-20px] translate-y-[10px]">
              פרימיום
            </div>
          )}
          
          <div className="md:col-span-3 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{service.name}</h3>
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
              <Badge variant="outline">מותאם אישית</Badge>
              <Badge variant="outline">איכות גבוהה</Badge>
              <Badge variant="outline">מקצועי</Badge>
            </div>
            
            <Button onClick={() => onBookService(service)}>הזמן עכשיו</Button>
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
