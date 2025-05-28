
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { addServiceToBasket } from './ServiceBasket';
import ServiceCardHeader from './service-card/ServiceCardHeader';
import ServiceCardContent from './service-card/ServiceCardContent';
import ServiceCardFooter from './service-card/ServiceCardFooter';

interface ServiceCardProps {
  service: any;
  onBookService: (service: any) => void;
}

// Function to save service to local storage
export const saveServiceForLater = (service: any) => {
  const savedServices = localStorage.getItem("savedServices");
  const currentSavedServices = savedServices ? JSON.parse(savedServices) : [];
  
  if (currentSavedServices.some((s: any) => s.id === service.id)) return false;
  
  const updatedSavedServices = [...currentSavedServices, service];
  localStorage.setItem("savedServices", JSON.stringify(updatedSavedServices));
  
  const event = new CustomEvent("savedServicesUpdated", { 
    detail: updatedSavedServices 
  });
  window.dispatchEvent(event);
  
  return true;
};

// Function to check if a service is saved
export const isServiceSaved = (serviceId: string): boolean => {
  const savedServices = localStorage.getItem("savedServices");
  const currentSavedServices = savedServices ? JSON.parse(savedServices) : [];
  return currentSavedServices.some((s: any) => s.id === serviceId);
};

// Function to remove a saved service
export const removeSavedService = (serviceId: string): boolean => {
  const savedServices = localStorage.getItem("savedServices");
  const currentSavedServices = savedServices ? JSON.parse(savedServices) : [];
  
  const updatedSavedServices = currentSavedServices.filter((s: any) => s.id !== serviceId);
  localStorage.setItem("savedServices", JSON.stringify(updatedSavedServices));
  
  const event = new CustomEvent("savedServicesUpdated", { 
    detail: updatedSavedServices 
  });
  window.dispatchEvent(event);
  
  return true;
};

const ServiceCard = ({ service, onBookService }: ServiceCardProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = React.useState(false);
  
  React.useEffect(() => {
    setIsSaved(isServiceSaved(service.id));
    
    const handleSavedServicesUpdate = () => {
      setIsSaved(isServiceSaved(service.id));
    };
    
    window.addEventListener("savedServicesUpdated", handleSavedServicesUpdate);
    
    return () => {
      window.removeEventListener("savedServicesUpdated", handleSavedServicesUpdate);
    };
  }, [service.id]);
  
  const handleAddToBasket = () => {
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
  
  const handleSaveForLater = () => {
    if (isSaved) {
      const removed = removeSavedService(service.id);
      if (removed) {
        setIsSaved(false);
        toast({
          title: "השירות הוסר מהשמורים",
          description: `${service.name} הוסר בהצלחה מהשירותים השמורים שלך`,
        });
      }
    } else {
      const saved = saveServiceForLater({
        id: service.id,
        name: service.name,
        short_description: service.short_description,
        price_range: service.price_range || service.price || "₪0",
        provider_id: service.provider_id,
        provider_name: service.provider_name || "ספק שירות",
        image_url: service.image_url,
        saved_at: new Date().toISOString()
      });
      
      if (saved) {
        setIsSaved(true);
        toast({
          title: "השירות נשמר",
          description: `${service.name} נשמר בהצלחה, נזכיר לך עליו בכניסה הבאה`,
        });
      }
    }
  };
  
  return (
    <Card className="overflow-hidden border border-gray-200 hover:border-brand-300 transition-colors">
      <div className="flex flex-col md:flex-row">
        <ServiceCardHeader service={service} />
        
        <div className="flex-1">
          <CardContent className="p-0">
            <ServiceCardContent service={service} />
          </CardContent>
          
          <CardFooter className="p-0">
            <ServiceCardFooter
              service={service}
              isSaved={isSaved}
              onSaveForLater={handleSaveForLater}
              onAddToBasket={handleAddToBasket}
              onBookService={() => onBookService(service)}
            />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
