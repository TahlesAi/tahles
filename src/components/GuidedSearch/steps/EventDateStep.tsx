
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { he } from "date-fns/locale";

interface EventDateStepProps {
  eventDate: Date | null | undefined;
  onUpdate: (date: Date | null) => void;
  onSkip: () => void;
}

const EventDateStep = ({ eventDate, onUpdate, onSkip }: EventDateStepProps) => {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-lg font-medium text-center">מתי האירוע אמור להתקיים?</h3>
      
      <div className="flex flex-col items-center space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full max-w-xs justify-start text-right font-normal ${!eventDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {eventDate ? format(eventDate, "EEEE, d MMMM yyyy", { locale: he }) : "בחר תאריך"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={eventDate || undefined}
              onSelect={(date) => date && onUpdate(date)}
              initialFocus
              locale={he}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={onSkip} variant="ghost">
          דלג, עוד לא יודע
        </Button>
      </div>
    </div>
  );
};

export default EventDateStep;
