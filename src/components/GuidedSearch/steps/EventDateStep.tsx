
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventDateStepProps {
  eventDate: Date | null | undefined;
  onUpdate: (date: Date | null, startTime?: string, endTime?: string) => void;
  onSkip: () => void;
}

const EventDateStep = ({ eventDate, onUpdate, onSkip }: EventDateStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(eventDate || null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  
  // Generate time options (every 30 minutes from 8:00 to 23:30)
  const timeOptions = Array.from({ length: 32 }, (_, i) => {
    const totalMinutes = 8 * 60 + i * 30;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return {
      value: timeString,
      label: timeString
    };
  });

  const handleDateSelect = (date: Date | undefined) => {
    const newDate = date || null;
    setSelectedDate(newDate);
  };

  const handleStartTimeSelect = (time: string) => {
    setSelectedStartTime(time);
    console.log("Start time selected:", time);
  };

  const handleEndTimeSelect = (time: string) => {
    setSelectedEndTime(time);
    console.log("End time selected:", time);
  };

  const handleNext = () => {
    console.log("HandleNext called with:", { selectedDate, selectedStartTime, selectedEndTime });
    if (selectedDate && selectedStartTime && selectedEndTime) {
      onUpdate(selectedDate, selectedStartTime, selectedEndTime);
    }
  };

  // All three fields are now required to proceed
  const canProceed = selectedDate && selectedStartTime && selectedEndTime;

  useEffect(() => {
    console.log("EventDateStep state:", { selectedDate, selectedStartTime, selectedEndTime, canProceed });
  }, [selectedDate, selectedStartTime, selectedEndTime, canProceed]);

  return (
    <div className="space-y-6 text-right min-h-[500px] overflow-y-auto" dir="rtl">
      <h3 className="text-lg font-medium text-center">מתי האירוע אמור להתקיים?</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Date Selection */}
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2 text-right">תאריך האירוע *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right font-normal"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy", { locale: he }) : "בחר תאריך"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate || undefined}
                onSelect={handleDateSelect}
                initialFocus
                locale={he}
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Start Time Selection */}
        {selectedDate && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-2 text-right">שעת התחלה *</label>
            <Select value={selectedStartTime} onValueChange={handleStartTimeSelect}>
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחר שעת התחלה" />
                <Clock className="ml-2 h-4 w-4" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value} className="text-right">
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1 text-right">
              שעת התחלה חיונית לבדיקת זמינות נותן השירות
            </p>
          </div>
        )}

        {/* End Time Selection - Now Required */}
        {selectedDate && selectedStartTime && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-2 text-right">שעת סיום *</label>
            <Select value={selectedEndTime} onValueChange={handleEndTimeSelect}>
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחר שעת סיום" />
                <Clock className="ml-2 h-4 w-4" />
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto">
                {timeOptions
                  .filter(time => time.value > selectedStartTime)
                  .map((time) => (
                  <SelectItem key={time.value} value={time.value} className="text-right">
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-red-500 mt-1 text-right">
              שעת סיום חובה לחישוב מחיר מדויק והזמנת השירות
            </p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 mt-8">
        <Button 
          onClick={handleNext} 
          className="w-full" 
          disabled={!canProceed}
        >
          {!selectedDate ? 'יש לבחור תאריך' : 
           !selectedStartTime ? 'יש לבחור שעת התחלה' :
           !selectedEndTime ? 'יש לבחור שעת סיום' : 'המשך'}
        </Button>
        <Button onClick={onSkip} variant="ghost" className="w-full">
          דלג, עוד לא יודע
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
