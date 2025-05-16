
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ConditionalBookingDialog from "./ConditionalBookingDialog";

interface Service {
  id: string;
  name: string;
  price_range: string;
  provider_id: string;
  provider_name: string;
  image_url?: string;
}

const ServiceBasket = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // טעינת השירותים שנשמרו מקומית בעת טעינת הדף
  useEffect(() => {
    const savedServices = localStorage.getItem("selectedServices");
    if (savedServices) {
      try {
        setSelectedServices(JSON.parse(savedServices));
      } catch (error) {
        console.error("Error parsing saved services:", error);
      }
    }
  }, []);
  
  // שמירת השירותים שנבחרו למקומי
  useEffect(() => {
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
  }, [selectedServices]);
  
  // הוספת שירות חדש לסל
  const addService = (service: Service) => {
    // בדיקה אם השירות כבר נמצא בסל
    if (selectedServices.some(s => s.id === service.id)) {
      toast({
        title: "השירות כבר נמצא בסל",
        description: "השירות שבחרת כבר נמצא בסל השירותים שלך",
        variant: "default"
      });
      return;
    }
    
    setSelectedServices(prev => [...prev, service]);
    
    toast({
      title: "השירות נוסף לסל",
      description: `${service.name} נוסף בהצלחה לסל השירותים שלך`,
      variant: "default"
    });
  };
  
  // הסרת שירות מהסל
  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
  };
  
  // ניקוי הסל
  const clearBasket = () => {
    setSelectedServices([]);
    toast({
      title: "הסל רוקן",
      description: "כל השירותים הוסרו מסל השירותים שלך",
      variant: "default"
    });
  };
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {selectedServices.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {selectedServices.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent dir="rtl">
          <SheetHeader>
            <SheetTitle>סל שירותים</SheetTitle>
            <SheetDescription>
              הוסף שירותים לסל ובצע הזמנה מותנית של כל השירותים יחד
            </SheetDescription>
          </SheetHeader>
          
          {selectedServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">סל השירותים שלך ריק</p>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  {selectedServices.length} שירותים בסל
                </h3>
                <Button variant="outline" size="sm" onClick={clearBasket}>
                  <Trash2 className="h-4 w-4 ml-2" />
                  רוקן סל
                </Button>
              </div>
              
              <div className="space-y-3">
                {selectedServices.map(service => (
                  <div 
                    key={service.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.provider_name}</p>
                      <p className="text-sm">{service.price_range}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeService(service.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <SheetFooter className="absolute bottom-0 right-0 left-0 border-t p-4 bg-background">
            <Button
              onClick={() => {
                setIsBookingDialogOpen(true);
                setIsOpen(false);
              }}
              className="w-full"
              disabled={selectedServices.length === 0}
            >
              המשך להזמנה מותנית
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <ConditionalBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        selectedServices={selectedServices}
        onRemoveService={removeService}
      />
    </>
  );
};

// פונקציית עזר גלובלית להוספת שירות לסל
export const addServiceToBasket = (service: Service) => {
  const savedServices = localStorage.getItem("selectedServices");
  const currentServices: Service[] = savedServices ? JSON.parse(savedServices) : [];
  
  // בדיקה אם השירות כבר נמצא בסל
  if (currentServices.some(s => s.id === service.id)) return false;
  
  const updatedServices = [...currentServices, service];
  localStorage.setItem("selectedServices", JSON.stringify(updatedServices));
  
  // נעדכן את GlobalEvents אם הוספנו אירוע מוצלח
  const event = new CustomEvent("serviceBasketUpdated", { detail: updatedServices });
  window.dispatchEvent(event);
  
  return true;
};

export default ServiceBasket;
