
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import StripePaymentForm from './StripePaymentForm';

interface PaymentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    provider: string;
  };
  onPaymentComplete: (transactionId: string) => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

const PaymentManager: React.FC<PaymentManagerProps> = ({
  isOpen,
  onClose,
  service,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const paymentMethods = [
    {
      id: 'credit_card' as PaymentMethod,
      name: 'כרטיס אשראי',
      description: 'תשלום מיידי ומאובטח',
      icon: CreditCard,
      available: true
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      description: 'תשלום דרך חשבון PayPal',
      icon: Smartphone,
      available: false
    },
    {
      id: 'bank_transfer' as PaymentMethod,
      name: 'העברה בנקאית',
      description: 'תשלום תוך 1-3 ימי עסקים',
      icon: Building2,
      available: false
    }
  ];

  const handlePaymentSuccess = (transactionId: string) => {
    onPaymentComplete(transactionId);
    onClose();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // הודעת שגיאה כבר מוצגת ב-StripePaymentForm
  };

  if (showPaymentForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>השלמת תשלום</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <StripePaymentForm
              amount={service.price}
              serviceTitle={service.name}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentForm(false)}
              className="w-full mt-4"
            >
              חזור לבחירת אמצעי תשלום
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>בחר אמצעי תשלום</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* סיכום הזמנה */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-2">ספק: {service.provider}</p>
              <div className="flex justify-between items-center">
                <span>סה"כ לתשלום:</span>
                <span className="text-xl font-bold">₪{service.price.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* אמצעי תשלום */}
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMethod === method.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : method.available 
                        ? 'hover:bg-gray-50' 
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => method.available && setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5" />
                      <div className="flex-1">
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {!method.available && (
                        <span className="text-xs text-gray-500">בקרוב</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button 
            onClick={() => setShowPaymentForm(true)}
            className="w-full"
            disabled={!paymentMethods.find(m => m.id === selectedMethod)?.available}
          >
            המשך לתשלום
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentManager;
