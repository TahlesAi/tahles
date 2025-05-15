
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingDialogProps {
  service: {
    name: string;
  } | null;
  onSubmitBooking: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const BookingDialog = ({ service, onSubmitBooking, isOpen, setIsOpen, children }: BookingDialogProps) => {
  if (!service) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>הזמנת שירות: {service.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4 text-right">לאחר שליחת הטופס, נציג יצור איתך קשר לתיאום הפרטים הסופיים והתשלום.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">שם מלא</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="הכנס את שמך המלא"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">טלפון</label>
              <input 
                type="tel" 
                className="w-full p-2 border rounded-md" 
                placeholder="הכנס את מספר הטלפון שלך"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">תאריך האירוע</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">הערות נוספות</label>
              <textarea 
                className="w-full p-2 border rounded-md" 
                rows={3}
                placeholder="פרטים נוספים לגבי ההזמנה"
              ></textarea>
            </div>
            
            <Button 
              className="w-full" 
              onClick={onSubmitBooking}
            >
              שלח בקשת הזמנה
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
