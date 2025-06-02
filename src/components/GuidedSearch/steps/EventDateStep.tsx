
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  
  // טעינה מ-localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('guided-search-date-step');
    if (savedData) {
      try {
        const { date, startTime, endTime } = JSON.parse(savedData);
        if (date) setSelectedDate(new Date(date));
        if (startTime) setSelectedStartTime(startTime);
        if (endTime) setSelectedEndTime(endTime);
      } catch (error) {
        console.log('Error loading saved date data:', error);
      }
    }
  }, []);

  // שמירה ב-localStorage
  useEffect(() => {
    const dataToSave = {
      date: selectedDate?.toISOString(),
      startTime: selectedStartTime,
      endTime: selectedEndTime
    };
    localStorage.setItem('guided-search-date-step', JSON.stringify(dataToSave));
  }, [selectedDate, selectedStartTime, selectedEndTime]);
  
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
    onUpdate(selectedDate, selectedStartTime, selectedEndTime);
  };

  return (
    <div className="space-y-6 text-right p-4" dir="rtl">
      {/* כותרת מרכזית */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <CalendarIcon className="h-6 w-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">מתי האירוע יתקיים?</h3>
        </div>
        <p className="text-gray-600 text-sm">בחרו תאריך ושעות האירוע לבדיקת זמינות</p>
      </div>
      
      {/* כרטיס מרכזי */}
      <Card className="max-w-md mx-auto shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-5">
            {/* בחירת תאריך */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 text-center">תאריך האירוע</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-4/5 mx-auto block justify-center text-center font-normal h-12 text-base border-2 hover:border-purple-400 focus:border-purple-500"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "EEEE, d בMMMM yyyy", { locale: he }) : "בחרו תאריך"}
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

            {/* בחירת שעות */}
            <div className="grid grid-cols-2 gap-4">
              {/* שעת התחלה */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-center">שעת התחלה</label>
                <Select value={selectedStartTime} onValueChange={setSelectedStartTime}>
                  <SelectTrigger className="w-full text-center h-12 text-base border-2 hover:border-purple-400 focus:border-purple-500">
                    <Clock className="ml-1 h-4 w-4" />
                    <SelectValue placeholder="בחרו שעה" />
                  </SelectTrigger>
                  <SelectContent className="max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <SelectItem key={time.value} value={time.value} className="text-center">
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* שעת סיום */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-center">שעת סיום</label>
                <Select value={selectedEndTime} onValueChange={setSelectedEndTime}>
                  <SelectTrigger className="w-full text-center h-12 text-base border-2 hover:border-purple-400 focus:border-purple-500">
                    <Clock className="ml-1 h-4 w-4" />
                    <SelectValue placeholder="בחרו שעה" />
                  </SelectTrigger>
                  <SelectContent className="max-h-40 overflow-y-auto">
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

            {/* הצגת הבחירה */}
            {selectedDate && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                <p className="text-sm text-purple-800 font-medium">
                  📅 {format(selectedDate, "EEEE, d בMMMM", { locale: he })}
                  {selectedStartTime && ` • ${selectedStartTime}`}
                  {selectedEndTime && ` - ${selectedEndTime}`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* כפתור המשך */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleNext} 
          className="px-8 py-3 text-lg h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200" 
          size="lg"
        >
          המשך ➜
        </Button>
        {!selectedDate && (
          <p className="text-xs text-gray-500 text-center mt-2 absolute">
            ניתן להמשיך גם ללא בחירת תאריך
          </p>
        )}
      </div>
    </div>
  );
};

export default EventDateStep;
