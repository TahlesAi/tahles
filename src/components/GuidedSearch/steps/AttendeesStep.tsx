
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
    if (customCount) {
      onUpdate(customCount);
    }
  };
  
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-lg font-medium text-center">כמה משתתפים צפויים באירוע?</h3>
      
      <div className="flex flex-col items-center space-y-4">
        <Select onValueChange={handleSelect} dir="rtl">
          <SelectTrigger className="w-full max-w-xs text-right">
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
        
        {selectedRange === "custom" && (
          <div className="flex w-full max-w-xs space-x-2 space-x-reverse">
            <Input
              type="number"
              placeholder="הזן מספר משתתפים"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              min={1}
              className="text-right"
            />
            <Button onClick={handleCustomCount}>שמור</Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <Button onClick={() => onUpdate("לא ידוע")} variant="ghost">
          דלג, עוד לא יודע
        </Button>
      </div>
    </div>
  );
};

export default AttendeesStep;
