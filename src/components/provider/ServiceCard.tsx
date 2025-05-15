
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  service: {
    id?: string;
    name: string;
    description?: string;
    price_range?: string;
    duration?: string;
  };
  onBookService: (service: any) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
            {service.duration && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 ml-1" />
                {service.duration}
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <span className="text-xl font-bold mb-2">{service.price_range}</span>
            <Button onClick={() => onBookService(service)}>הזמן עכשיו</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
