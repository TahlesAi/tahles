
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";

interface BookingSuccessProps {
  bookingId: string;
  service: any;
  provider: any;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  bookingId,
  service,
  provider
}) => {
  return (
    <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <Sparkles className="h-8 w-8 text-yellow-500 mr-2" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ההזמנה הושלמה בהצלחה!
        </h1>
        
        <p className="text-lg text-gray-600 mb-4">
          הזמנת את השירות <span className="font-semibold text-brand-600">{service.name}</span>
          <br />
          מאת <span className="font-semibold">{provider.businessName}</span>
        </p>
        
        <div className="bg-white rounded-lg p-4 inline-block border border-gray-200">
          <p className="text-sm text-gray-500">מספר הזמנה</p>
          <p className="font-mono text-lg font-bold text-gray-900">
            {bookingId}
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          פרטי ההזמנה נשלחו אליך במייל ונשמרו במערכת
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingSuccess;
