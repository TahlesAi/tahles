
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Trash2 } from 'lucide-react';
import { CalendarSlot } from '@/hooks/useProviderCalendar';

interface CalendarSlotsListProps {
  slots: CalendarSlot[];
  onToggleAvailability: (slotId: string) => void;
  onRemoveSlot: (slotId: string) => void;
}

const CalendarSlotsList: React.FC<CalendarSlotsListProps> = ({
  slots,
  onToggleAvailability,
  onRemoveSlot
}) => {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        אין משבצות זמן עבור תאריך זה
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {slots.map((slot) => (
        <div key={slot.id} className="border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">
                  {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                </span>
              </div>
              
              {slot.service_area && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{slot.service_area}</span>
                </div>
              )}

              <Badge 
                variant={slot.is_available ? "default" : "secondary"}
                className="text-xs"
              >
                {slot.is_available ? 'זמין' : 'לא זמין'}
              </Badge>

              <span className="text-xs text-gray-500">
                {slot.current_bookings}/{slot.max_bookings} הזמנות
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleAvailability(slot.id)}
              >
                {slot.is_available ? 'השבת' : 'הפעל'}
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemoveSlot(slot.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarSlotsList;
