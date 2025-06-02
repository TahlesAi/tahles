
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface StripePaymentFormProps {
  amount: number;
  serviceTitle: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  serviceTitle,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 3);
    }
    
    setPaymentData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const validatePayment = () => {
    const errors = [];
    
    if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      errors.push('מספר כרטיס לא תקין');
    }
    
    if (paymentData.expiryDate.length !== 5) {
      errors.push('תאריך תפוגה לא תקין');
    }
    
    if (paymentData.cvv.length !== 3) {
      errors.push('CVV לא תקין');
    }
    
    if (!paymentData.holderName.trim()) {
      errors.push('שם בעל הכרטיס חובה');
    }
    
    if (!paymentData.email.includes('@')) {
      errors.push('כתובת אימייל לא תקינה');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validatePayment();
    if (errors.length > 0) {
      toast.error(errors.join(', '));
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // סימולציה של תשלום עם Stripe
      // בפרודקשן זה יהיה API call אמיתי לשרת עם Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // סימולציה של הצלחה (90% הצלחה)
      if (Math.random() > 0.1) {
        const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setIsPaymentComplete(true);
        onPaymentSuccess(transactionId);
        toast.success('התשלום בוצע בהצלחה!');
      } else {
        throw new Error('התשלום נדחה על ידי הבנק');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'שגיאה בתשלום';
      onPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isPaymentComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            התשלום בוצע בהצלחה!
          </h3>
          <p className="text-gray-600">
            קיבלת אישור הזמנה באימייל
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          פרטי תשלום
        </CardTitle>
        <div className="text-sm text-gray-600">
          <p>{serviceTitle}</p>
          <p className="font-semibold text-lg">₪{amount.toLocaleString()}</p>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">כתובת אימייל</Label>
            <Input
              id="email"
              type="email"
              value={paymentData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="holderName">שם בעל הכרטיס</Label>
            <Input
              id="holderName"
              value={paymentData.holderName}
              onChange={(e) => handleInputChange('holderName', e.target.value)}
              placeholder="שם מלא כפי שמופיע בכרטיס"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="cardNumber">מספר כרטיס</Label>
            <Input
              id="cardNumber"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expiryDate">תאריך תפוגה</Label>
              <Input
                id="expiryDate"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={3}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
            <Lock className="h-4 w-4" />
            <span>התשלום מאובטח בהצפנת SSL</span>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? 'מעבד תשלום...' : `שלם ₪${amount.toLocaleString()}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StripePaymentForm;
