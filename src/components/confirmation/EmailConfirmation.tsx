
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Send } from "lucide-react";

interface EmailConfirmationProps {
  customerEmail: string;
  bookingId: string;
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  customerEmail,
  bookingId
}) => {
  const [emailSent, setEmailSent] = useState(true); // מדמה שהמייל נשלח
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    // סימולציה של שליחת מייל
    setTimeout(() => {
      setIsResending(false);
      setEmailSent(true);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Mail className="h-5 w-5 ml-2" />
          אישור במייל
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emailSent ? (
          <div className="space-y-3">
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 ml-2" />
              <span className="font-medium">מייל נשלח בהצלחה!</span>
            </div>
            
            <p className="text-sm text-gray-600">
              אישור ההזמנה נשלח לכתובת:
              <br />
              <span className="font-medium">{customerEmail}</span>
            </p>

            <p className="text-xs text-gray-500">
              המייל כולל את כל פרטי ההזמנה, פרטי הקשר עם הספק והוראות תשלום.
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full"
            >
              <Send className="h-4 w-4 ml-2" />
              {isResending ? 'שולח...' : 'שלח שוב'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              שליחת אישור ההזמנה לכתובת המייל שלך...
            </p>
            
            <Button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full bg-brand-600 hover:bg-brand-700"
            >
              <Mail className="h-4 w-4 ml-2" />
              שלח אישור במייל
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailConfirmation;
