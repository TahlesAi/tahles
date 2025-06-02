
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar, Clock, MapPin, Users, User } from "lucide-react";

interface EventDetailsFormProps {
  bookingData: any;
  service: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  bookingData,
  service,
  onUpdate,
  onNext,
  onBack
}) => {
  const isValid = bookingData.eventDate && 
                 bookingData.eventTime && 
                 bookingData.eventLocation &&
                 bookingData.contactPerson &&
                 bookingData.contactPhone;

  const handleAttendeesChange = (value: number[]) => {
    onUpdate({ attendeesCount: value[0] });
  };

  return (
    <div className="space-y-6">
      {/* תאריך ושעה */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="flex items-center mb-2">
            <Calendar className="h-4 w-4 ml-2" />
            תאריך האירוע *
          </Label>
          <Input
            type="date"
            value={bookingData.eventDate}
            onChange={(e) => onUpdate({ eventDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Clock className="h-4 w-4 ml-2" />
            שעת התחלה *
          </Label>
          <Input
            type="time"
            value={bookingData.eventTime}
            onChange={(e) => onUpdate({ eventTime: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Clock className="h-4 w-4 ml-2" />
            זמן הגעה להכנות
          </Label>
          <Input
            type="time"
            value={bookingData.setupTime}
            onChange={(e) => onUpdate({ setupTime: e.target.value })}
            placeholder="זמן מוקדם יותר"
          />
          <p className="text-xs text-gray-500 mt-1">
            זמן נוסף להכנת הציוד (אופציונלי)
          </p>
        </div>
      </div>

      {/* מיקום האירוע */}
      <div>
        <Label className="flex items-center mb-2">
          <MapPin className="h-4 w-4 ml-2" />
          מיקום האירוע *
        </Label>
        <Textarea
          value={bookingData.eventLocation}
          onChange={(e) => onUpdate({ eventLocation: e.target.value })}
          placeholder="כתובת מדויקת של מקום האירוע, כולל פרטים נוספים כמו קומה, חדר וכו'..."
          className="min-h-[80px]"
          required
        />
      </div>

      {/* מספר משתתפים */}
      <div>
        <Label className="flex items-center mb-3">
          <Users className="h-4 w-4 ml-2" />
          מספר משתתפים צפוי: {bookingData.attendeesCount}
        </Label>
        <Slider
          value={[bookingData.attendeesCount]}
          onValueChange={handleAttendeesChange}
          max={500}
          min={1}
          step={1}
          className="mb-2"
        />
        <div className="text-xs text-gray-500 flex justify-between">
          <span>1</span>
          <span>500+</span>
        </div>
      </div>

      {/* איש קשר תפעולי */}
      <div>
        <h4 className="font-medium mb-4">איש קשר תפעולי לאירוע</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center mb-2">
              <User className="h-4 w-4 ml-2" />
              שם איש הקשר *
            </Label>
            <Input
              value={bookingData.contactPerson}
              onChange={(e) => onUpdate({ contactPerson: e.target.value })}
              placeholder="איש קשר באירוע"
              required
            />
          </div>

          <div>
            <Label className="mb-2 block">טלפון איש הקשר *</Label>
            <Input
              type="tel"
              value={bookingData.contactPhone}
              onChange={(e) => onUpdate({ contactPhone: e.target.value })}
              placeholder="050-1234567"
              required
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          איש הקשר הזה יהיה זמין ביום האירוע לתיאום עם נותן השירות
        </p>
      </div>

      {/* הערות על המקום */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium mb-2">פרטי תיאום חשובים</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• נא ודא שיש גישה לחשמל במקום האירוע</li>
          <li>• בדוק אפשרויות חניה לנותן השירות</li>
          <li>• ציין אם יש מגבלות רעש או זמן</li>
          <li>• ודא שהמקום מתאים לסוג השירות</li>
        </ul>
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
          שלב הבא
        </Button>
      </div>
    </div>
  );
};

export default EventDetailsForm;
