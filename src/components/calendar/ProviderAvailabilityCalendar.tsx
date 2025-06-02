
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useProviderCalendar, CalendarSlot } from '@/hooks/useProviderCalendar';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface ProviderAvailabilityCalendarProps {
  providerId: string;
  onDateTimeSelect: (date: string, timeSlot: CalendarSlot) => void;
}

const ProviderAvailabilityCalendar: React.FC<ProviderAvailabilityCalendarProps> = ({
  providerId,
  onDateTimeSelect
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<CalendarSlot[]>([]);
  const { fetchAvailableSlots, loading } = useProviderCalendar(providerId);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      fetchAvailableSlots(dateString).then(setAvailableSlots);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot: CalendarSlot) => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      onDateTimeSelect(dateString, slot);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle>בחירת תאריך</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            locale={he}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              שעות זמינות ב-{format(selectedDate, 'dd/MM/yyyy', { locale: he })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">טוען שעות זמינות...</div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant="outline"
                    className="flex flex-col items-center p-3 h-auto"
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    <span className="font-medium">
                      {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {slot.max_bookings - slot.current_bookings} מקומות זמינים
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                אין שעות זמינות בתאריך זה
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderAvailabilityCalendar;
