
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventDateStepProps {
  eventDate: Date | null | undefined;
  onUpdate: (date: Date | null, startTime?: string, endTime?: string) => void;
  onSkip: () => void;
}

const EventDateStep = ({ eventDate, onUpdate, onSkip }: EventDateStepProps) => {
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  
  // Generate time options (every 30 minutes from 8:00 to 23:30)
  const timeOptions = Array.from({ length: 32 }, (_, i) => {
    const totalMinutes = 8 * 60 + i * 30; // Start from 8:00, add 30 minutes each time
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return {
      value: timeString,
      label: timeString
    };
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onUpdate(date, selectedStartTime, selectedEndTime);
    }
  };

  const handleStartTimeSelect = (time: string) => {
    setSelectedStartTime(time);
    if (eventDate) {
      onUpdate(eventDate, time, selectedEndTime);
    }
  };

  const handleEndTimeSelect = (time: string) => {
    setSelectedEndTime(time);
    if (eventDate) {
      onUpdate(eventDate, selectedStartTime, time);
    }
  };

  const handleNext = () => {
    if (eventDate && selectedStartTime) {
      onUpdate(eventDate, selectedStartTime, selectedEndTime);
    } else if (eventDate) {
      // If only date is selected, continue without time
      onUpdate(eventDate);
    }
  };

  const canProceed = eventDate !== null && eventDate !== undefined;

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
                {eventDate ? format(eventDate, "EEEE, d MMMM yyyy", { locale: he }) : "בחר תאריך"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={eventDate || undefined}
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
        {eventDate && (
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

        {/* End Time Selection */}
        {eventDate && selectedStartTime && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-2 text-right">שעת סיום (אופציונלי)</label>
            <Select value={selectedEndTime} onValueChange={handleEndTimeSelect}>
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחר שעת סיום (אופציונלי)" />
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
            <p className="text-xs text-gray-500 mt-1 text-right">
              שעת הסיום עוזרת לחישוב מחיר מדויק יותר
            </p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 mt-8">
        {canProceed && (
          <Button onClick={handleNext} className="w-full" disabled={!selectedStartTime}>
            המשך
          </Button>
        )}
        <Button onClick={onSkip} variant="ghost" className="w-full">
          דלג, עוד לא יודע
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
