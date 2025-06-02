
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, User, UtensilsCrossed, Car } from "lucide-react";

interface SpecialRequestsProps {
  bookingData: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const SpecialRequests: React.FC<SpecialRequestsProps> = ({
  bookingData,
  onUpdate,
  onNext,
  onBack
}) => {
  return (
    <div className="space-y-6">
      {/* בקשות מיוחדות כלליות */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <MessageSquare className="h-4 w-4 ml-2" />
          בקשות מיוחדות או הערות
        </Label>
        <Textarea
          value={bookingData.specialRequests}
          onChange={(e) => onUpdate({ specialRequests: e.target.value })}
          placeholder="תאר כאן כל בקשה מיוחדת, התאמות נדרשות או הערות חשובות לנותן השירות..."
          className="min-h-[120px]"
        />
      </div>

      {/* נגישות */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <User className="h-4 w-4 ml-2" />
          צרכי נגישות
        </Label>
        <Textarea
          value={bookingData.accessibilityNeeds}
          onChange={(e) => onUpdate({ accessibilityNeeds: e.target.value })}
          placeholder="פרט צרכי נגישות מיוחדים: כיסאות גלגלים, עיוור/כבד שמיעה, וכו'..."
          className="min-h-[80px]"
        />
      </div>

      {/* קייטרינג וכיבוד */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <UtensilsCrossed className="h-4 w-4 ml-2" />
          דרישות כיבוד ומזון
        </Label>
        <Textarea
          value={bookingData.cateringRequests}
          onChange={(e) => onUpdate({ cateringRequests: e.target.value })}
          placeholder="פרט דרישות כשרות, אלרגיות, צרכי כיבוד מיוחדים..."
          className="min-h-[80px]"
        />
      </div>

      {/* פרטי חניה */}
      <div>
        <Label className="flex items-center mb-3 text-base font-medium">
          <Car className="h-4 w-4 ml-2" />
          פרטי חניה
        </Label>
        <Textarea
          value={bookingData.parkingInfo}
          onChange={(e) => onUpdate({ parkingInfo: e.target.value })}
          placeholder="איפה נותן השירות יכול לחנות? פרט מיקום, עלויות, מגבלות זמן..."
          className="min-h-[80px]"
        />
      </div>

      {/* הסכמות */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium">הסכמות ואישורים</h4>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="data-usage"
            checked={bookingData.agreeToDataUsage || false}
            onCheckedChange={(checked) => onUpdate({ agreeToDataUsage: !!checked })}
          />
          <div className="flex-1">
            <Label htmlFor="data-usage" className="text-sm cursor-pointer">
              אני מסכים לשיתוף הפרטים עם נותן השירות לצורך ביצוע ההזמנה
            </Label>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="contact-permission"
            checked={bookingData.agreeToContact || false}
            onCheckedChange={(checked) => onUpdate({ agreeToContact: !!checked })}
          />
          <div className="flex-1">
            <Label htmlFor="contact-permission" className="text-sm cursor-pointer">
              אני מסכים שנותן השירות יצור איתי קשר לצורך תיאום פרטי האירוע
            </Label>
          </div>
        </div>
      </div>

      {/* הערה חשובה */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">שים לב</h4>
        <p className="text-sm text-blue-800">
          כל הבקשות המיוחדות יועברו לנותן השירות לבחינה. שינויים במחיר עלולים לחול 
          בהתאם לבקשות המיוחדות. נותן השירות יצור איתך קשר לאישור סופי.
        </p>
      </div>

      {/* כפתורי ניווט */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          שלב קודם
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-brand-600 hover:bg-brand-700"
        >
          שלב הבא
        </Button>
      </div>
    </div>
  );
};

export default SpecialRequests;
