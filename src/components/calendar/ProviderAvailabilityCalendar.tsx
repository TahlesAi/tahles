
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';
import { useProviderCalendar, CalendarSlot } from '@/hooks/useProviderCalendar';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface ProviderAvailabilityCalendarProps {
  providerId: string;
  serviceArea?: string;
  onDateTimeSelect: (date: string, timeSlot: CalendarSlot) => void;
}

const ProviderAvailabilityCalendar: React.FC<ProviderAvailabilityCalendarProps> = ({
  providerId,
  serviceArea,
  onDateTimeSelect
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<CalendarSlot[]>([]);
  const { loading, fetchAvailableSlots } = useProviderCalendar(providerId);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      fetchAvailableSlots(dateString, serviceArea).then(setAvailableSlots);
    }
  }, [selectedDate, providerId, serviceArea, fetchAvailableSlots]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };

  const handleTimeSlotSelect = (slot: CalendarSlot) => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      onDateTimeSelect(dateString, slot);
    }
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5); // HH:MM format
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            בחירת תאריך ושעה
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* לוח שנה */}
            <div>
              <h3 className="font-medium mb-3">בחרו תאריך</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date < new Date(Date.now() - 24 * 60 * 60 * 1000)}
                locale={he}
                className="rounded-md border"
              />
            </div>

            {/* משבצות זמן זמינות */}
            <div>
              <h3 className="font-medium mb-3">
                {selectedDate ? 
                  `שעות זמינות ל-${format(selectedDate, 'dd/MM/yyyy', { locale: he })}` : 
                  'בחרו תאריך כדי לראות שעות זמינות'
                }
              </h3>
              
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">טוען זמינות...</p>
                </div>
              )}

              {selectedDate && !loading && availableSlots.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>אין זמינות בתאריך זה</p>
                </div>
              )}

              {availableSlots.length > 0 && (
                <div className="space-y-3">
                  {availableSlots.map((slot) => (
                    <Card 
                      key={slot.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleTimeSlotSelect(slot)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {slot.service_area && (
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="h-3 w-3 ml-1" />
                                {slot.service_area}
                              </Badge>
                            )}
                            
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 ml-1" />
                              {slot.max_bookings - slot.current_bookings} זמין
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderAvailabilityCalendar;
