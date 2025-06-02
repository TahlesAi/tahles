
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import ProviderAvailabilityCalendar from '@/components/calendar/ProviderAvailabilityCalendar';
import { CalendarSlot } from '@/hooks/useProviderCalendar';

interface ServiceAvailabilityCalendarProps {
  serviceId: string;
  providerId: string;
  onDateSelect: (date: string, timeSlot: string) => void;
}

const ServiceAvailabilityCalendar: React.FC<ServiceAvailabilityCalendarProps> = ({
  serviceId,
  providerId,
  onDateSelect
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: string;
    slot: CalendarSlot;
  } | null>(null);

  const handleDateTimeSelect = (date: string, timeSlot: CalendarSlot) => {
    setSelectedDateTime({ date, slot: timeSlot });
    onDateSelect(date, `${timeSlot.start_time}-${timeSlot.end_time}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-600" />
          בחירת תאריך וזמן
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ProviderAvailabilityCalendar
          providerId={providerId}
          onDateTimeSelect={handleDateTimeSelect}
        />

        {/* אישור בחירה */}
        {selectedDateTime && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                נבחר: {selectedDateTime.date} בשעה {selectedDateTime.slot.start_time.slice(0, 5)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceAvailabilityCalendar;
