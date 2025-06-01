
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

  const handleStartTimeSelect = (time: string) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeSelect = (time: string) => {
    setSelectedEndTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      onUpdate(selectedDate, selectedStartTime, selectedEndTime);
    }
  };

  const canProceed = selectedDate && selectedStartTime && selectedEndTime;

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">מתי האירוע אמור להתקיים?</h3>
        <p className="text-gray-600">בחירת התאריך והשעות חיונית לבדיקת זמינות נותני השירות</p>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Date and Times in one compact row */}
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-center">תאריך האירוע *</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-center font-normal h-11"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "d/M", { locale: he }) : "בחר תאריך"}
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-center">שעת התחלה *</label>
              <Select value={selectedStartTime} onValueChange={handleStartTimeSelect}>
                <SelectTrigger className="w-full text-center h-11">
                  <SelectValue placeholder="בחר שעה" />
                  <Clock className="ml-2 h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-center">
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-center">שעת סיום *</label>
              <Select value={selectedEndTime} onValueChange={handleEndTimeSelect}>
                <SelectTrigger className="w-full text-center h-11">
                  <SelectValue placeholder="בחר שעה" />
                  <Clock className="ml-2 h-4 w-4" />
                </SelectTrigger>
                <SelectContent className="max-h-48 overflow-y-auto">
                  {timeOptions
                    .filter(time => !selectedStartTime || time.value > selectedStartTime)
                    .map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-center">
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Centered Continue Button */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleNext} 
          className="px-8 py-3 text-lg h-12" 
          disabled={!canProceed}
          size="lg"
        >
          {!selectedDate ? 'יש לבחור תאריך' : 
           !selectedStartTime ? 'יש לבחור שעת התחלה' :
           !selectedEndTime ? 'יש לבחור שעת סיום' : 'המשך לבחירת סוג האירוע'}
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
