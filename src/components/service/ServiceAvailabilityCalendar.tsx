
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle } from "lucide-react";

interface ServiceAvailabilityCalendarProps {
  serviceId: string;
  onDateSelect: (date: string, timeSlot: string) => void;
}

const ServiceAvailabilityCalendar: React.FC<ServiceAvailabilityCalendarProps> = ({
  serviceId,
  onDateSelect
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // דוגמה לזמינות (בפרויקט אמיתי יתוחבר ליומן)
  const availableDates = [
    { date: '2025-02-01', label: '1 בפברואר', available: true },
    { date: '2025-02-02', label: '2 בפברואר', available: false },
    { date: '2025-02-03', label: '3 בפברואר', available: true },
    { date: '2025-02-04', label: '4 בפברואר', available: true },
    { date: '2025-02-05', label: '5 בפברואר', available: false },
    { date: '2025-02-08', label: '8 בפברואר', available: true },
    { date: '2025-02-09', label: '9 בפברואר', available: true },
    { date: '2025-02-10', label: '10 בפברואר', available: true },
  ];

  const timeSlots = [
    { time: '10:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: false },
    { time: '16:00', available: true },
    { time: '18:00', available: true },
    { time: '20:00', available: true },
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onDateSelect(selectedDate, time);
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
        {/* בחירת תאריך */}
        <div>
          <h4 className="font-medium mb-3">תאריכים זמינים</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableDates.map((dateOption) => (
              <Button
                key={dateOption.date}
                variant={selectedDate === dateOption.date ? "default" : "outline"}
                className={`h-16 text-sm ${!dateOption.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => dateOption.available && handleDateSelect(dateOption.date)}
                disabled={!dateOption.available}
              >
                <div className="text-center">
                  <div>{dateOption.label}</div>
                  {!dateOption.available && (
                    <Badge variant="destructive" className="text-xs mt-1">תפוס</Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* בחירת שעה */}
        {selectedDate && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              שעות זמינות
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  className={`${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* אישור בחירה */}
        {selectedDate && selectedTime && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">נבחר: {selectedDate} בשעה {selectedTime}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceAvailabilityCalendar;
