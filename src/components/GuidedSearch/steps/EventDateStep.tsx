
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
}

const EventDateStep = ({ eventDate, onUpdate }: EventDateStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(eventDate || null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
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
    setIsCalendarOpen(false);
  };

  const handleNext = () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      onUpdate(selectedDate, selectedStartTime, selectedEndTime);
    }
  };

  const canProceed = selectedDate && selectedStartTime && selectedEndTime;

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1">מתי האירוע יתקיים?</h3>
        <p className="text-gray-600 text-sm">בחירת התאריך והשעות לבדיקת זמינות</p>
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        {/* Compact Date and Times */}
        <div className="w-full max-w-lg">
          <div className="grid grid-cols-3 gap-2 items-end">
            {/* Date Selection */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-center">תאריך</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-center font-normal h-9 text-sm"
                  >
                    <CalendarIcon className="ml-1 h-3 w-3" />
                    {selectedDate ? format(selectedDate, "d/M", { locale: he }) : "תאריך"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
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

            {/* Start Time */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-center">התחלה</label>
              <Select value={selectedStartTime} onValueChange={setSelectedStartTime}>
                <SelectTrigger className="w-full text-center h-9 text-sm">
                  <SelectValue placeholder="שעה" />
                  <Clock className="ml-1 h-3 w-3" />
                </SelectTrigger>
                <SelectContent className="max-h-32 overflow-y-auto">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-center text-sm">
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* End Time */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-center">סיום</label>
              <Select value={selectedEndTime} onValueChange={setSelectedEndTime}>
                <SelectTrigger className="w-full text-center h-9 text-sm">
                  <SelectValue placeholder="שעה" />
                  <Clock className="ml-1 h-3 w-3" />
                </SelectTrigger>
                <SelectContent className="max-h-32 overflow-y-auto">
                  {timeOptions
                    .filter(time => !selectedStartTime || time.value > selectedStartTime)
                    .map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-center text-sm">
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="flex justify-center pt-2">
        <Button 
          onClick={handleNext} 
          className="px-6 py-2 text-base h-10" 
          disabled={!canProceed}
        >
          {!selectedDate ? 'בחר תאריך' : 
           !selectedStartTime ? 'בחר שעת התחלה' :
           !selectedEndTime ? 'בחר שעת סיום' : 'המשך'}
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
