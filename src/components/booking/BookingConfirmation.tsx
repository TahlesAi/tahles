
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, AlertTriangle } from "lucide-react";

interface BookingConfirmationProps {
  bookingData: any;
  service: any;
  provider: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  service,
  provider,
  onNext,
  onBack,
  isLastStep
}) => {
  const formatPrice = (price: number) => `₪${price.toLocaleString()}`;
  const basePrice = service.price;
  const upsellsPrice = (bookingData.selectedUpsells?.length || 0) * 100;
  const totalPrice = basePrice + upsellsPrice;

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      credit: 'כרטיס אשראי',
      bit: 'ביט',
      bank_transfer: 'העברה בנקאית',
      check: 'צ\'ק עתידי'
    };
    return labels[method as keyof typeof labels] || method;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">סיכום ההזמנה</h3>
        <p className="text-gray-600 text-sm">
          בדוק את כל הפרטים לפני השלמת ההזמנה
        </p>
      </div>

      {/* סיכום השירות */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">פרטי השירות</h4>
          
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  אין תמונה
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h5 className="font-medium">{service.name}</h5>
              <p className="text-brand-600 text-sm">{provider.businessName}</p>
              <Badge variant="secondary" className="mt-1">
                {formatPrice(basePrice)}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* פרטי האירוע */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">תאריך:</span>
              <span className="mr-2">
                {new Date(bookingData.eventDate).toLocaleDateString('he-IL')}
              </span>
            </div>
            
            <div>
              <span className="font-medium">שעה:</span>
              <span className="mr-2">{bookingData.eventTime}</span>
            </div>
            
            <div className="md:col-span-2">
              <span className="font-medium">מיקום:</span>
              <span className="mr-2">{bookingData.eventLocation}</span>
            </div>
            
            <div>
              <span className="font-medium">משתתפים:</span>
              <span className="mr-2">{bookingData.attendeesCount}</span>
            </div>
            
            <div>
              <span className="font-medium">איש קשר:</span>
              <span className="mr-2">{bookingData.contactPerson}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* פרטי תשלום */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">פרטי תשלום</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>מחיר בסיס</span>
              <span>{formatPrice(basePrice)}</span>
            </div>
            
            {bookingData.selectedUpsells?.length > 0 && (
              <div className="flex justify-between">
                <span>שירותים נוספים ({bookingData.selectedUpsells.length})</span>
                <span>{formatPrice(upsellsPrice)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between font-bold text-lg">
              <span>סה"כ לתשלום</span>
              <span className="text-brand-600">{formatPrice(totalPrice)}</span>
            </div>
            
            <div className="flex items-center mt-4">
              <CreditCard className="h-4 w-4 text-gray-500 ml-2" />
              <span className="text-sm">
                אופן תשלום: {getPaymentMethodLabel(bookingData.paymentMethod)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* התראה אחרונה */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-600 ml-2 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-blue-800 mb-1">
              שים לב לפני השלמת ההזמנה
            </div>
            <ul className="text-blue-700 space-y-1">
              <li>• ודא שכל הפרטים נכונים</li>
              <li>• ההזמנה תישלח לספק לאישור</li>
              <li>• תקבל אישור במייל תוך מספר דקות</li>
              <li>• הספק יצור איתך קשר תוך 24 שעות</li>
            </ul>
          </div>
        </div>
      </div>

      {/* כפתורי ניווט */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          שלב קודם
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLastStep ? 'השלם הזמנה' : 'המשך'}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
