
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

interface CalendarIntegrationProps {
  eventData: {
    title: string;
    date: string;
    time: string;
    location: string;
  };
  onAddToCalendar: () => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  eventData,
  onAddToCalendar
}) => {
  const createOutlookEvent = () => {
    const startDate = new Date(`${eventData.date}T${eventData.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventData.title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&location=${encodeURIComponent(eventData.location)}`;
    
    window.open(outlookUrl, '_blank');
  };

  const createAppleEvent = () => {
    const startDate = new Date(`${eventData.date}T${eventData.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const appleUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventData.title}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
    
    const link = document.createElement('a');
    link.href = appleUrl;
    link.download = 'event.ics';
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calendar className="h-5 w-5 ml-2" />
          הוסף ליומן
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            הוסף את האירוע ליומן שלך כדי לא לשכוח:
          </p>

          <div className="text-sm bg-gray-50 p-3 rounded-lg">
            <div className="font-medium mb-1">{eventData.title}</div>
            <div className="text-gray-600">
              {new Date(eventData.date).toLocaleDateString('he-IL')} בשעה {eventData.time}
            </div>
            <div className="text-gray-600 text-xs mt-1">
              {eventData.location}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={onAddToCalendar}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 ml-2" />
              Google Calendar
            </Button>

            <Button
              variant="outline"
              onClick={createOutlookEvent}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 ml-2" />
              Outlook
            </Button>

            <Button
              variant="outline"
              onClick={createAppleEvent}
              className="w-full"
            >
              <Calendar className="h-4 w-4 ml-2" />
              הורד קובץ ICS
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            המערכת תשלח לך תזכורת 24 שעות לפני האירוע
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;
