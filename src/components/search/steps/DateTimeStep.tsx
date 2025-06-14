
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface DateTimeStepProps {
  date?: Date;
  startTime?: string;
  endTime?: string;
  onDateChange: (date: Date | undefined) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange
}) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CalendarIcon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">מתי האירוע שלכם?</h2>
        <p className="text-gray-600">בחרו תאריך ושעות התחלה וסיום (לא חובה)</p>
      </div>
      
      <div className="space-y-4">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-right">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: he }) : "בחר תאריך (לא חובה)"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                onDateChange(date);
                setCalendarOpen(false);
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">שעת התחלה (לא חובה)</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime || ''}
              onChange={(e) => onStartTimeChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endTime">שעת סיום (לא חובה)</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime || ''}
              onChange={(e) => onEndTimeChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
