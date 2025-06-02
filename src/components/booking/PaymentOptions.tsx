
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, Building, FileText, AlertTriangle } from "lucide-react";

interface PaymentOptionsProps {
  bookingData: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  bookingData,
  onUpdate,
  onNext,
  onBack
}) => {
  const paymentMethods = [
    {
      id: 'credit',
      name: 'כרטיס אשראי',
      description: 'תשלום מיידי באמצעות כרטיס אשראי',
      icon: CreditCard,
      recommended: true,
      fees: 'ללא עמלה'
    },
    {
      id: 'bit',
      name: 'ביט',
      description: 'תשלום מהיר דרך אפליקציית ביט',
      icon: Smartphone,
      fees: 'ללא עמלה'
    },
    {
      id: 'bank_transfer',
      name: 'העברה בנקאית',
      description: 'העברה ישירה לחשבון הספק',
      icon: Building,
      fees: 'ללא עמלה',
      note: 'התשלום יועבר לספק בתוך 3-5 ימי עבודה'
    },
    {
      id: 'check',
      name: 'צ\'ק עתידי',
      description: 'צ\'ק על תאריך האירוע',
      icon: FileText,
      fees: 'עמלת טיפול ₪25',
      note: 'הצ\'ק יועבר לטיפול לאחר האירוע'
    }
  ];

  const isValid = bookingData.paymentMethod && 
                 bookingData.agreeToTerms && 
                 bookingData.agreeToCancellation;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">אופן תשלום</h3>
        <p className="text-gray-600 text-sm">
          בחר את אופן התשלום המועדף עליך
        </p>
      </div>

      {/* שיטות תשלום */}
      <RadioGroup
        value={bookingData.paymentMethod}
        onValueChange={(value) => onUpdate({ paymentMethod: value })}
        className="space-y-3"
      >
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          
          return (
            <Card 
              key={method.id}
              className={`cursor-pointer transition-all duration-200 ${
                bookingData.paymentMethod === method.id 
                  ? 'border-brand-500 bg-brand-50' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  
                  <div className="flex items-center flex-1">
                    <IconComponent className="h-5 w-5 text-brand-600 ml-3" />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-600">{method.fees}</span>
                          {method.recommended && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              מומלץ
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {method.description}
                      </p>
                      
                      {method.note && (
                        <p className="text-xs text-gray-500 mt-1">
                          {method.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </RadioGroup>

      {/* הסכמות */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium">תנאים והסכמות</h4>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={bookingData.agreeToTerms}
              onCheckedChange={(checked) => onUpdate({ agreeToTerms: !!checked })}
            />
            <div className="flex-1">
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                אני מסכים ל
                <button className="text-brand-600 underline mx-1">תנאי השימוש</button>
                ול
                <button className="text-brand-600 underline mx-1">מדיניות הפרטיות</button>
                של תכלס
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="cancellation"
              checked={bookingData.agreeToCancellation}
              onCheckedChange={(checked) => onUpdate({ agreeToCancellation: !!checked })}
            />
            <div className="flex-1">
              <Label htmlFor="cancellation" className="text-sm cursor-pointer">
                קראתי והבנתי את 
                <button className="text-brand-600 underline mx-1">נוהל הביטולים</button>
                ואת התנאים לקבלת החזר כספי
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* התראת ביטול */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 ml-2 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-yellow-800 mb-1">
              מדיניות ביטול חשובה
            </div>
            <ul className="text-yellow-700 space-y-1">
              <li>• ביטול עד 48 שעות לפני האירוע - החזר מלא</li>
              <li>• ביטול 24-48 שעות לפני - החזר 50%</li>
              <li>• ביטול פחות מ-24 שעות - ללא החזר</li>
              <li>• במקרה של כוח עליון - החזר מלא</li>
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
          disabled={!isValid}
          className="bg-brand-600 hover:bg-brand-700"
        >
          המשך לתשלום
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;
