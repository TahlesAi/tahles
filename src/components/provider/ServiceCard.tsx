
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Info, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addServiceToBasket } from './ServiceBasket';

interface ServiceCardProps {
  service: any;
  onBookService: (service: any) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  const { toast } = useToast();
  
  const handleAddToBasket = () => {
    // המרת שירות לפורמט המתאים לסל השירותים
    const basketService = {
      id: service.id,
      name: service.name,
      price_range: service.price_range || service.price || "₪0",
      provider_id: service.provider_id,
      provider_name: service.provider_name || "ספק שירות",
      image_url: service.image_url
    };
    
    const added = addServiceToBasket(basketService);
    
    if (added) {
      toast({
        title: "השירות נוסף לסל",
        description: `${service.name} נוסף בהצלחה לסל השירותים שלך`,
      });
    } else {
      toast({
        title: "השירות כבר בסל",
        description: "שירות זה כבר קיים בסל השירותים שלך",
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border border-gray-200 hover:border-brand-300 transition-colors">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{service.name}</h3>
            <p className="text-gray-600 text-sm">{service.short_description}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-brand-600">{service.price_range || service.price}</div>
            {service.is_premium && (
              <Badge className="bg-amber-500">פרימיום</Badge>
            )}
            {service.is_custom && (
              <Badge variant="outline">התאמה אישית</Badge>
            )}
          </div>
        </div>
        
        {/* מאפייני השירות */}
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
        </div>
        
        {/* רשימת תכולה */}
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
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handleAddToBasket}>
          הוסף לסל
        </Button>
        <Button onClick={() => onBookService(service)}>
          הזמן עכשיו
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
