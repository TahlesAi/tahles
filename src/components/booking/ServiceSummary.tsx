
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Users, MapPin } from "lucide-react";

interface ServiceSummaryProps {
  service: any;
  provider: any;
  bookingData: any;
  currentStep: number;
}

const ServiceSummary: React.FC<ServiceSummaryProps> = ({
  service,
  provider,
  bookingData,
  currentStep
}) => {
  const formatPrice = (price: number) => `₪${price.toLocaleString()}`;
  const basePrice = service.price;
  const upsellsPrice = (bookingData.selectedUpsells?.length || 0) * 100;
  const totalPrice = basePrice + upsellsPrice;

  return (
    <div className="space-y-4 sticky top-4">
      {/* פרטי השירות */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">סיכום ההזמנה</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* תמונה ופרטי שירות */}
          <div>
            <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  אין תמונה
                </div>
              )}
            </div>
            
            <h3 className="font-semibold mb-1">{service.name}</h3>
            <p className="text-sm text-brand-600 mb-2">{provider.businessName}</p>
            
            {service.rating && (
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                <span className="text-sm font-medium">{service.rating}</span>
                <span className="text-xs text-gray-500 mr-1">
                  ({service.reviewCount} ביקורות)
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* פרטי אירוע */}
          {currentStep >= 2 && (
            <div className="space-y-3">
              <h4 className="font-medium">פרטי האירוע</h4>
              
              {bookingData.eventDate && (
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 ml-2" />
                  <span>
                    {new Date(bookingData.eventDate).toLocaleDateString('he-IL')}
                    {bookingData.eventTime && ` בשעה ${bookingData.eventTime}`}
                  </span>
                </div>
              )}

              {bookingData.attendeesCount && (
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-gray-500 ml-2" />
                  <span>{bookingData.attendeesCount} משתתפים</span>
                </div>
              )}

              {bookingData.eventLocation && (
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 ml-2 mt-0.5" />
                  <span className="line-clamp-2">{bookingData.eventLocation}</span>
                </div>
              )}
              
              <Separator />
            </div>
          )}

          {/* מחירים */}
          <div className="space-y-2">
            <h4 className="font-medium">פירוט מחירים</h4>
            
            <div className="flex justify-between text-sm">
              <span>מחיר בסיס</span>
              <span>{formatPrice(basePrice)}</span>
            </div>

            {bookingData.selectedUpsells?.length > 0 && (
              <div className="flex justify-between text-sm">
                <span>שירותים נוספים ({bookingData.selectedUpsells.length})</span>
                <span>{formatPrice(upsellsPrice)}</span>
              </div>
            )}

            <Separator />
            
            <div className="flex justify-between font-bold">
              <span>סה"כ</span>
              <span className="text-brand-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* סטטוס התקדמות */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">התקדמות</span>
              <span className="text-sm text-gray-600">{currentStep}/6</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* הערות חשובות */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• המחיר כולל מע"מ</p>
            <p>• ההזמנה תוקפת למשך 15 דקות</p>
            <p>• ניתן לבטל ללא עלות עד 48 שעות לפני האירוע</p>
          </div>
        </CardContent>
      </Card>

      {/* פרטי קשר ספק */}
      <Card className="border-brand-200">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">פרטי הספק</h4>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{provider.businessName}</p>
            {provider.contact_person && (
              <p className="text-gray-600">איש קשר: {provider.contact_person}</p>
            )}
            {provider.phone && (
              <p className="text-gray-600">טלפון: {provider.phone}</p>
            )}
            {provider.email && (
              <p className="text-gray-600">מייל: {provider.email}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSummary;
