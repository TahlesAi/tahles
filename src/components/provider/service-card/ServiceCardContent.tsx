
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, Info, Check, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

interface ServiceCardContentProps {
  service: any;
}

const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ service }) => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Link to={`/services/${service.id}`} className="hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-lg">{service.name}</h3>
          </Link>
          <p className="text-gray-600 text-sm">{service.short_description}</p>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg text-brand-600">{service.price_range || service.price}</div>
          <div className="flex flex-wrap gap-1 justify-end">
            {service.is_premium && (
              <Badge className="bg-amber-500">פרימיום</Badge>
            )}
            {service.is_custom && (
              <Badge variant="outline">התאמה אישית</Badge>
            )}
            {service.is_new && (
              <Badge className="bg-green-500">חדש</Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Service Features */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {service.duration && (
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 ml-1 text-gray-500" />
            <span>משך: {service.duration}</span>
          </div>
        )}
        {service.availability && (
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 ml-1 text-gray-500" />
            <span>זמינות: {service.availability}</span>
          </div>
        )}
        {service.audience_size && (
          <div className="flex items-center text-sm">
            <Info className="h-4 w-4 ml-1 text-gray-500" />
            <span>קהל: עד {service.audience_size} אנשים</span>
          </div>
        )}
      </div>
      
      {/* Included Services */}
      {service.includes && service.includes.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">השירות כולל:</p>
          <ul className="text-sm space-y-1">
            {service.includes.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <Check className="h-4 w-4 ml-1 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Link to={`/services/${service.id}`} className="text-brand-600 text-sm font-medium flex items-center hover:underline mt-1">
        פרטים נוספים
        <ArrowRight className="mr-1 h-3 w-3" />
      </Link>
    </div>
  );
};

export default ServiceCardContent;
