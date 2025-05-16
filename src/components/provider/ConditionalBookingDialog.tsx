
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Check, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/lib/actions/booking";

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
  onRemoveService: (serviceId: string) => void;
}

interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventDate: Date | undefined;
  additionalRequests: string;
}

const ConditionalBookingDialog = ({
  isOpen,
  onClose,
  selectedServices,
  onRemoveService
}: ConditionalBookingDialogProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    eventDate: undefined,
    additionalRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<{[providerId: string]: boolean}>({});
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, eventDate: date }));
    setAvailabilityStatus({});
  };
  
  const checkAvailability = async () => {
    if (!formData.eventDate) {
      toast({
        title: "בחר תאריך",
        description: "יש לבחור תאריך לאירוע לפני בדיקת זמינות",
        variant: "destructive"
      });
      return;
    }
    
    setIsCheckingAvailability(true);
    const newStatus: {[providerId: string]: boolean} = {};
    
    try {
      // במימוש אמיתי כאן צריך לעשות בדיקה מול מסד הנתונים לגבי זמינות של ספקים בתאריך מסוים
      // כרגע זה מדמה בדיקת זמינות עם תוצאות אקראיות
      const uniqueProviderIds = [...new Set(selectedServices.map(service => service.provider_id))];
      
      for (const providerId of uniqueProviderIds) {
        // זו בדיקה מדומה - היא תוחלף בבדיקת זמינות אמיתית כשנחבר למסד נתונים
        const isAvailable = Math.random() > 0.3; // 70% סיכוי לזמינות
        newStatus[providerId] = isAvailable;
      }
      
      setAvailabilityStatus(newStatus);
    } catch (error) {
      console.error("Error checking availability:", error);
      toast({
        title: "שגיאה בבדיקת זמינות",
        description: "אירעה שגיאה בבדיקת זמינות הספקים, אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  const isAllProvidersAvailable = () => {
    if (Object.keys(availabilityStatus).length === 0) return false;
    
    return Object.values(availabilityStatus).every(status => status === true);
  };
  
  const handleSubmit = async () => {
    if (!formData.customerName || !formData.customerPhone || !formData.customerEmail || !formData.eventDate) {
      toast({
        title: "פרטים חסרים",
        description: "יש למלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }
    
    if (!isAllProvidersAvailable()) {
      toast({
        title: "לא כל הספקים זמינים",
        description: "ניתן לבצע הזמנה מותנית רק כאשר כל הספקים זמינים בתאריך המבוקש",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // יוצרים הזמנה לכל שירות שנבחר
      for (const service of selectedServices) {
        await createBooking({
          providerId: service.provider_id,
          serviceId: service.id,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          eventDate: formData.eventDate,
          additionalRequests: `הזמנה מותנית: ${formData.additionalRequests || "ללא הערות נוספות"}`
        });
      }
      
      toast({
        title: "ההזמנה בוצעה בהצלחה",
        description: `הזמנת ${selectedServices.length} שירותים בהצלחה לתאריך ${format(formData.eventDate, "dd/MM/yyyy")}`,
      });
      
      onClose();
    } catch (error) {
      console.error("Error creating conditional booking:", error);
      toast({
        title: "שגיאה ביצירת הזמנה",
        description: "אירעה שגיאה ביצירת ההזמנה, אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getProviderAvailabilityStatus = (providerId: string) => {
    if (!Object.keys(availabilityStatus).includes(providerId)) {
      return null; // לא נבדקה הזמינות עדיין
    }
    
    return availabilityStatus[providerId];
  };
  
  // מיפוי שירותים לספקים כדי להציג אותם מקובצים
  const groupServicesByProvider = () => {
    const groupedServices: { [providerId: string]: { providerName: string; services: Service[] } } = {};
    
    selectedServices.forEach(service => {
      if (!groupedServices[service.provider_id]) {
        groupedServices[service.provider_id] = {
          providerName: service.provider_name,
          services: []
        };
      }
      
      groupedServices[service.provider_id].services.push(service);
    });
    
    return groupedServices;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>הזמנה מותנית</DialogTitle>
          <DialogDescription>
            צור הזמנה מותנית לכל השירותים שבחרת. ההזמנה תאושר רק אם כל הספקים זמינים בתאריך המבוקש.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* רשימת השירותים שנבחרו */}
          <div className="bg-muted/30 rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">שירותים שנבחרו ({selectedServices.length})</h3>
            
            <div className="space-y-4">
              {Object.entries(groupServicesByProvider()).map(([providerId, { providerName, services }]) => (
                <div key={providerId} className="border rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{providerName}</h4>
                    {getProviderAvailabilityStatus(providerId) !== null && (
                      <Badge variant={getProviderAvailabilityStatus(providerId) ? "default" : "destructive"}>
                        {getProviderAvailabilityStatus(providerId) ? "זמין" : "לא זמין"}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {services.map(service => (
                      <div key={service.id} className="flex items-center justify-between text-sm bg-background/80 p-2 rounded">
                        <span>{service.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{service.price_range}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => onRemoveService(service.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* טופס פרטי הזמנה */}
          <div>
            <h3 className="text-lg font-semibold mb-4">פרטי הזמנה</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">שם מלא</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    placeholder="שם מלא"
                    value={formData.customerName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerPhone">טלפון</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    placeholder="טלפון"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customerEmail">כתובת אימייל</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  placeholder="כתובת אימייל"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label>תאריך האירוע</Label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-right",
                          !formData.eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {formData.eventDate ? (
                          format(formData.eventDate, "dd/MM/yyyy", { locale: he })
                        ) : (
                          <span>בחר תאריך</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button 
                    variant="secondary" 
                    onClick={checkAvailability}
                    disabled={!formData.eventDate || isCheckingAvailability}
                  >
                    {isCheckingAvailability ? (
                      <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        בודק זמינות...
                      </>
                    ) : (
                      "בדוק זמינות"
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="additionalRequests">הערות נוספות</Label>
                <Textarea
                  id="additionalRequests"
                  name="additionalRequests"
                  placeholder="הערות נוספות או בקשות מיוחדות"
                  value={formData.additionalRequests}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            ביטול
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isAllProvidersAvailable() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                מבצע הזמנה...
              </>
            ) : (
              "אישור הזמנה"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConditionalBookingDialog;
