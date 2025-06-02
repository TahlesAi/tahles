
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, User, Phone, Mail, CreditCard } from "lucide-react";

interface OrderSummaryPageProps {
  bookingData: any;
}

const OrderSummaryPage: React.FC<OrderSummaryPageProps> = ({ bookingData }) => {
  const formatPrice = (price: number) => `₪${price.toLocaleString()}`;
  const totalPrice = bookingData.service.price + (bookingData.selectedUpsells?.length || 0) * 100;

  return (
    <div className="space-y-6 mb-8">
      {/* פרטי השירות */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">פרטי השירות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {bookingData.service.imageUrl ? (
                <img
                  src={bookingData.service.imageUrl}
                  alt={bookingData.service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  אין תמונה
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{bookingData.service.name}</h3>
              <p className="text-brand-600 mb-2">{bookingData.provider.businessName}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {bookingData.service.description}
              </p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {formatPrice(bookingData.service.price)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* פרטי האירוע */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">פרטי האירוע</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 ml-3" />
              <div>
                <p className="font-medium">תאריך</p>
                <p className="text-gray-600">
                  {new Date(bookingData.eventDate).toLocaleDateString('he-IL')}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 ml-3" />
              <div>
                <p className="font-medium">שעה</p>
                <p className="text-gray-600">{bookingData.eventTime}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 ml-3 mt-1" />
            <div>
              <p className="font-medium">מיקום</p>
              <p className="text-gray-600">{bookingData.eventLocation}</p>
            </div>
          </div>

          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 ml-3" />
            <div>
              <p className="font-medium">איש קשר תפעולי</p>
              <p className="text-gray-600">
                {bookingData.contactPerson} • {bookingData.contactPhone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* פרטי הלקוח */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">פרטי הלקוח</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 ml-3" />
            <span>{bookingData.customerName}</span>
          </div>

          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-500 ml-3" />
            <span>{bookingData.customerEmail}</span>
          </div>

          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-500 ml-3" />
            <span>{bookingData.customerPhone}</span>
          </div>

          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-500 ml-3" />
            <span>אופן תשלום: {getPaymentMethodLabel(bookingData.paymentMethod)}</span>
          </div>
        </CardContent>
      </Card>

      {/* בקשות מיוחדות */}
      {(bookingData.specialRequests || bookingData.accessibilityNeeds) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">בקשות מיוחדות</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingData.specialRequests && (
              <div>
                <p className="font-medium mb-1">בקשות כלליות</p>
                <p className="text-gray-600 text-sm">{bookingData.specialRequests}</p>
              </div>
            )}

            {bookingData.accessibilityNeeds && (
              <div>
                <p className="font-medium mb-1">צרכי נגישות</p>
                <p className="text-gray-600 text-sm">{bookingData.accessibilityNeeds}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* סיכום מחירים */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">סיכום תשלום</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>מחיר בסיס</span>
              <span>{formatPrice(bookingData.service.price)}</span>
            </div>

            {bookingData.selectedUpsells?.length > 0 && (
              <div className="flex justify-between">
                <span>שירותים נוספים</span>
                <span>{formatPrice(bookingData.selectedUpsells.length * 100)}</span>
              </div>
            )}

            <Separator />
            
            <div className="flex justify-between font-bold text-lg">
              <span>סה"כ לתשלום</span>
              <span className="text-brand-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getPaymentMethodLabel = (method: string) => {
  const labels = {
    credit: 'כרטיס אשראי',
    paypal: 'PayPal',
    bit: 'ביט',
    bank_transfer: 'העברה בנקאית',
    check: 'צ\'ק עתידי'
  };
  return labels[method as keyof typeof labels] || method;
};

export default OrderSummaryPage;
