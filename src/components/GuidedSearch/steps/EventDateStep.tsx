
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
    setIsCalendarOpen(false); // Close calendar automatically
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
    <div className="space-y-8 text-right" dir="rtl">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">מתי האירוע אמור להתקיים?</h3>
        <p className="text-gray-600">בחירת התאריך והשעות חיונית לבדיקת זמינות נותני השירות</p>
      </div>
      
      <div className="flex flex-col items-center space-y-6">
        {/* Date Selection */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium mb-3 text-center">תאריך האירוע *</label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center text-center font-normal h-12"
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy", { locale: he }) : "בחר תאריך"}
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

        {/* Time Selection - Compact Layout */}
        {selectedDate && (
          <div className="w-full max-w-lg space-y-4">
            <label className="block text-sm font-medium text-center">שעות האירוע *</label>
            <div className="grid grid-cols-2 gap-6 px-4">
              {/* Start Time */}
              <div className="space-y-2">
                <label className="block text-xs text-gray-500 text-center">שעת התחלה</label>
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
                <label className="block text-xs text-gray-500 text-center">שעת סיום</label>
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
        )}
      </div>
      
      {/* Centered Continue Button */}
      <div className="flex flex-col items-center gap-3 pt-4">
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
        <Button onClick={onSkip} variant="ghost" className="text-gray-500">
          דלג, עוד לא יודע
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
