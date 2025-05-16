
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addServiceToBasket } from "./ServiceBasket";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description?: string;
    price_range: string;
    duration?: string;
    image_url?: string;
    provider_id: string;
    provider_name: string;
  };
  onBookService: (service: any) => void;
}

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  const { toast } = useToast();

  const handleAddToBasket = () => {
    const added = addServiceToBasket(service);
    
    if (added) {
      toast({
        title: "נוסף לסל השירותים",
        description: `${service.name} נוסף בהצלחה לסל השירותים שלך`,
      });
    } else {
      toast({
        title: "כבר נמצא בסל",
        description: "שירות זה כבר נמצא בסל השירותים שלך",
        variant: "default",
      });
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="relative min-h-[160px]">
        {service.image_url ? (
          <img 
            src={service.image_url} 
            alt={service.name}
            className="w-full h-[160px] object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-[160px] bg-muted flex items-center justify-center rounded-t-lg">
            <span className="text-2xl text-muted-foreground">🖼️</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow pt-4">
        <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
        
        {service.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {service.description}
          </p>
        )}
        
        <div className="space-y-2">
          {service.duration && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 ml-1.5" />
              <span>{service.duration}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm font-medium">
            <Calendar className="h-4 w-4 ml-1.5 text-muted-foreground" />
            <span>בדוק זמינות</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="font-semibold">{service.price_range}</div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddToBasket}
            >
              <ShoppingBag className="h-4 w-4 ml-1.5" />
              הוסף לסל
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => onBookService(service)}
            >
              הזמן עכשיו
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
