
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price_range: string;
  provider_id: string;
  provider_name: string;
  image_url?: string;
}

interface ConditionalBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Service[];
  onRemoveService: (id: string) => void;
}

const ConditionalBookingDialog = ({
  isOpen,
  onClose,
  selectedServices,
  onRemoveService,
}: ConditionalBookingDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // כאן תבוא הלוגיקה לשמירת ההזמנה המותנית
      await new Promise(resolve => setTimeout(resolve, 1000)); // סימולציה של בקשת רשת
      
      toast({
        title: "ההזמנה נשלחה בהצלחה",
        description: "פרטי ההזמנה יישלחו לספקים לאישור",
      });
      
      // אחרי הצלחה נסגור את החלון
      onClose();
      // וננקה את סל השירותים (חייב לעדכן זאת בקומפוננטה המכילה)
      localStorage.removeItem("selectedServices");
      window.dispatchEvent(new CustomEvent("serviceBasketUpdated", { detail: [] }));
    } catch (error) {
      console.error("Error submitting conditional booking:", error);
      toast({
        variant: "destructive",
        title: "אירעה שגיאה",
        description: "לא ניתן לשמור את ההזמנה כרגע. נסה שוב מאוחר יותר.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalPrice = () => {
    // חישוב גס של טווח המחירים המשוער
    const minTotal = selectedServices.reduce((sum, service) => {
      const priceStr = service.price_range.replace(/[^\d]/g, '');
      return sum + (parseInt(priceStr) || 0);
    }, 0);
    
    return `₪${minTotal}+`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>הזמנה מותנית</DialogTitle>
          <DialogDescription>
            הזמנה מותנית תישלח לכל הספקים ותאושר רק אם כולם יאשרו את הזמינות שלהם
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium mb-2">שירותים שנבחרו:</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center p-2 border rounded-md">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.provider_name}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium ml-2">{service.price_range}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onRemoveService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4 pt-2 border-t">
            <span>סה"כ משוער:</span>
            <span className="font-medium">{getTotalPrice()}</span>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="sm:mr-2">
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedServices.length === 0 || isLoading}
            className="flex-1"
          >
            {isLoading ? "שולח..." : "שלח הזמנה מותנית"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConditionalBookingDialog;
