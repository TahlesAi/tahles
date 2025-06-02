
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock } from "lucide-react";

interface BookingTimerProps {
  expiryTime: Date;
  onExpire: () => void;
}

const BookingTimer: React.FC<BookingTimerProps> = ({ expiryTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = expiryTime.getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setIsExpired(true);
        setTimeLeft('00:00');
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  const getAlertVariant = () => {
    const [minutes] = timeLeft.split(':').map(Number);
    if (minutes <= 2) return 'destructive';
    if (minutes <= 5) return 'default';
    return 'default';
  };

  return (
    <Alert variant={getAlertVariant()} className="max-w-sm">
      <Clock className="h-4 w-4" />
      <AlertDescription>
        {isExpired ? (
          <span className="font-medium text-red-600">זמן ההזמנה פג</span>
        ) : (
          <>
            <span className="font-medium">זמן נותר: </span>
            <span className="font-mono text-lg">{timeLeft}</span>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default BookingTimer;
