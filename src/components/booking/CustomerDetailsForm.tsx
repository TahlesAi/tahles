
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Mail, Phone, MapPin, Building } from "lucide-react";

interface CustomerDetailsFormProps {
  bookingData: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  bookingData,
  onUpdate,
  onNext,
  onBack
}) => {
  const isValid = bookingData.customerName && 
                 bookingData.customerEmail && 
                 bookingData.customerPhone;

  return (
    <div className="space-y-6">
      {/* פרטי לקוח בסיסיים */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center mb-2">
            <User className="h-4 w-4 ml-2" />
            שם מלא *
          </Label>
          <Input
            value={bookingData.customerName}
            onChange={(e) => onUpdate({ customerName: e.target.value })}
            placeholder="שם פרטי ושם משפחה"
            required
          />
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Mail className="h-4 w-4 ml-2" />
            כתובת מייל *
          </Label>
          <Input
            type="email"
            value={bookingData.customerEmail}
            onChange={(e) => onUpdate({ customerEmail: e.target.value })}
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Phone className="h-4 w-4 ml-2" />
            מספר טלפון *
          </Label>
          <Input
            type="tel"
            value={bookingData.customerPhone}
            onChange={(e) => onUpdate({ customerPhone: e.target.value })}
            placeholder="050-1234567"
            required
          />
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Building className="h-4 w-4 ml-2" />
            סוג אירוע
          </Label>
          <RadioGroup
            value={bookingData.eventType}
            onValueChange={(value) => onUpdate({ eventType: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">פרטי</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">עסקי</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* כתובת */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="flex items-center mb-2">
            <MapPin className="h-4 w-4 ml-2" />
            כתובת
          </Label>
          <Input
            value={bookingData.customerAddress}
            onChange={(e) => onUpdate({ customerAddress: e.target.value })}
            placeholder="רחוב ומספר בית"
          />
        </div>

        <div>
          <Label className="mb-2 block">עיר</Label>
          <Input
            value={bookingData.customerCity}
            onChange={(e) => onUpdate({ customerCity: e.target.value })}
            placeholder="שם העיר"
          />
        </div>
      </div>

      {/* הערות חשבוניות */}
      {bookingData.eventType === 'business' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium mb-2">הזמנה עסקית</h4>
          <p className="text-sm text-blue-700">
            עבור הזמנות עסקיות, נא ודא שפרטי החשבונית נכונים לצורך הוצאת חשבונית מס.
          </p>
        </div>
      )}

      {/* כפתורי ניווט */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          חזור
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="bg-brand-600 hover:bg-brand-700"
        >
          שלב הבא
        </Button>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
