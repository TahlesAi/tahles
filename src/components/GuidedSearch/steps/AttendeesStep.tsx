
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AttendeesStepProps {
  attendeesCount: string | undefined;
  onUpdate: (count: string) => void;
}

const AttendeesStep = ({ attendeesCount, onUpdate }: AttendeesStepProps) => {
  const [customCount, setCustomCount] = useState(attendeesCount || "");
  const [selectedRange, setSelectedRange] = useState<string | undefined>(undefined);
  
  const handleSelect = (value: string) => {
    setSelectedRange(value);
    if (value === "custom") {
      return;
    } else {
      onUpdate(value);
    }
  };
  
  const handleCustomCount = () => {
    if (customCount && parseInt(customCount) > 0) {
      onUpdate(customCount);
    }
  };
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">כמה משתתפים צפויים באירוע?</h3>
        <p className="text-gray-600 text-sm">מספר המשתתפים חיוני לבדיקת התאמת השירות ומחיר מדויק</p>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-sm">
          <Select onValueChange={handleSelect} dir="rtl">
            <SelectTrigger className="w-full text-center h-12">
              <SelectValue placeholder="בחר טווח משתתפים" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1-10">1-10 משתתפים</SelectItem>
                <SelectItem value="11-30">11-30 משתתפים</SelectItem>
                <SelectItem value="31-60">31-60 משתתפים</SelectItem>
                <SelectItem value="61-100">61-100 משתתפים</SelectItem>
                <SelectItem value="101-250">101-250 משתתפים</SelectItem>
                <SelectItem value="251+">251+ משתתפים</SelectItem>
                <SelectItem value="custom">מספר מדויק</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {selectedRange === "custom" && (
          <div className="w-full max-w-sm space-y-4">
            <Input
              type="number"
              placeholder="הזן מספר משתתפים מדויק"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              min={1}
              className="text-center h-12"
            />
            <Button 
              onClick={handleCustomCount} 
              className="w-full h-12" 
              disabled={!customCount || parseInt(customCount) <= 0}
            >
              המשך עם {customCount} משתתפים
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-center text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
        <p><strong>טיפ:</strong> אם אינך בטוח במספר המדויק, בחר טווח קרוב - תמיד ניתן לעדכן בהמשך</p>
      </div>
    </div>
  );
};

export default AttendeesStep;
