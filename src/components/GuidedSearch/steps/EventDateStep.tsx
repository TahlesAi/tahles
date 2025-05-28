
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
  onUpdate: (date: Date | null, time?: string) => void;
  onSkip: () => void;
}

const EventDateStep = ({ eventDate, onUpdate, onSkip }: EventDateStepProps) => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Generate time options (every hour from 8:00 to 23:00)
  const timeOptions = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 8;
    return {
      value: `${hour}:00`,
      label: `${hour}:00`
    };
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onUpdate(date, selectedTime);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (eventDate) {
      onUpdate(eventDate, time);
    }
  };

  const handleNext = () => {
    if (eventDate && selectedTime) {
      onUpdate(eventDate, selectedTime);
    } else if (eventDate) {
      // If only date is selected, continue without time
      onUpdate(eventDate);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-lg font-medium text-center">מתי האירוע אמור להתקיים?</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Date Selection */}
        <div className="w-full max-w-xs">
          <label className="block text-sm font-medium mb-2 text-right">תאריך האירוע</label>
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
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        {eventDate && (
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-2 text-right">שעת האירוע (אופציונלי)</label>
            <Select value={selectedTime} onValueChange={handleTimeSelect}>
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="בחר שעה (אופציונלי)" />
                <Clock className="ml-2 h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1 text-right">
              השעה עוזרת לנו למצוא זמינות מדויקת ומחיר מתאים
            </p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        {eventDate && (
          <Button onClick={handleNext} className="w-full">
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
