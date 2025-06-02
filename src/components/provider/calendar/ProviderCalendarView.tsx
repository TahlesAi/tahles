
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle
} from "lucide-react";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { toast } from "sonner";

interface CalendarSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
  notes?: string;
}

interface ProviderCalendarViewProps {
  setupData: any;
}

const ProviderCalendarView: React.FC<ProviderCalendarViewProps> = ({ setupData }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: '09:00',
    endTime: '17:00',
    maxBookings: 1,
    notes: ''
  });

  // יצירת משבצות ברירת מחדל על בסיס ההגדרות
  useEffect(() => {
    if (setupData && selectedDate) {
      generateDefaultSlots();
    }
  }, [selectedDate, setupData]);

  const generateDefaultSlots = () => {
    if (!selectedDate || !setupData?.workingHours) return;

    const dayName = format(selectedDate, 'EEEE', { locale: he }).toLowerCase();
    const dayKey = getDayKeyFromDayName(dayName);
    
    if (dayKey && setupData.workingHours[dayKey]?.enabled) {
      const workingDay = setupData.workingHours[dayKey];
      const defaultSlot: CalendarSlot = {
        id: `default-${format(selectedDate, 'yyyy-MM-dd')}`,
        date: format(selectedDate, 'yyyy-MM-dd'),
        startTime: workingDay.start,
        endTime: workingDay.end,
        isAvailable: true,
        maxBookings: 1,
        currentBookings: 0,
        notes: 'זמינות ברירת מחדל'
      };
      
      setSlots([defaultSlot]);
    } else {
      setSlots([]);
    }
  };

  const getDayKeyFromDayName = (dayName: string) => {
    const dayMap: Record<string, string> = {
      'sunday': 'sunday',
      'monday': 'monday', 
      'tuesday': 'tuesday',
      'wednesday': 'wednesday',
      'thursday': 'thursday',
      'friday': 'friday',
      'saturday': 'saturday'
    };
    return dayMap[dayName];
  };

  const handleAddSlot = () => {
    if (!selectedDate) return;

    const slot: CalendarSlot = {
      id: `custom-${Date.now()}`,
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      isAvailable: true,
      maxBookings: newSlot.maxBookings,
      currentBookings: 0,
      notes: newSlot.notes || 'משבצת מותאמת אישית'
    };

    setSlots(prev => [...prev, slot]);
    setShowAddSlot(false);
    setNewSlot({
      startTime: '09:00',
      endTime: '17:00',
      maxBookings: 1,
      notes: ''
    });
    
    toast.success('משבצת זמן נוספה בהצלחה');
  };

  const handleDeleteSlot = (slotId: string) => {
    setSlots(prev => prev.filter(slot => slot.id !== slotId));
    toast.success('משבצת הזמן נמחקה');
  };

  const toggleSlotAvailability = (slotId: string) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId 
        ? { ...slot, isAvailable: !slot.isAvailable }
        : slot
    ));
  };

  const selectedDateSlots = slots.filter(slot => 
    selectedDate && slot.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6" dir="rtl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CalendarIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">יומן הזמינות שלי</h1>
        </div>
        <p className="text-gray-600">
          נהל את הזמינות שלך ועדכן משבצות זמן לפי הצורך
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* לוח שנה */}
        <Card>
          <CardHeader>
            <CardTitle>בחירת תאריך</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={he}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* פרטי היום */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedDate ? 
                  format(selectedDate, 'dd/MM/yyyy', { locale: he }) : 
                  'בחר תאריך'
                }
              </span>
              {selectedDate && (
                <Button
                  size="sm"
                  onClick={() => setShowAddSlot(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  הוסף משבצת
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {selectedDateSlots.length > 0 ? (
                  selectedDateSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-4 border rounded-lg ${
                        slot.isAvailable ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={slot.isAvailable ? "default" : "secondary"}>
                            {slot.isAvailable ? 'זמין' : 'לא זמין'}
                          </Badge>
                          {!slot.id.startsWith('default') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteSlot(slot.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        כמות הזמנות מקסימלית: {slot.maxBookings} | 
                        הזמנות קיימות: {slot.currentBookings}
                      </div>
                      
                      {slot.notes && (
                        <div className="text-sm text-gray-500 mb-2">
                          {slot.notes}
                        </div>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleSlotAvailability(slot.id)}
                        className="w-full"
                      >
                        {slot.isAvailable ? 'סמן כלא זמין' : 'סמן כזמין'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>אין זמינות מוגדרת ליום זה</p>
                    <p className="text-sm">לחץ על "הוסף משבצת" כדי להוסיף זמינות</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                בחר תאריך מהלוח כדי לראות ולערוך זמינות
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* הוספת משבצת חדשה */}
      {showAddSlot && (
        <Card>
          <CardHeader>
            <CardTitle>הוספת משבצת זמן חדשה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">שעת התחלה</label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">שעת סיום</label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">מספר הזמנות מקסימלי</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newSlot.maxBookings}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, maxBookings: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">הערות (אופציונלי)</label>
                <input
                  type="text"
                  placeholder="הערות למשבצת זו"
                  value={newSlot.notes}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleAddSlot} className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-1" />
                הוסף משבצת
              </Button>
              <Button variant="outline" onClick={() => setShowAddSlot(false)}>
                ביטול
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* סיכום הגדרות */}
      <Card>
        <CardHeader>
          <CardTitle>סיכום הגדרות היומן</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">אזורי שירות:</h4>
              <div className="flex flex-wrap gap-2">
                {setupData?.serviceAreas?.map((area: string) => (
                  <Badge key={area} variant="outline">{area}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">ימי עבודה רגילים:</h4>
              <div className="space-y-1">
                {setupData?.workingHours && Object.entries(setupData.workingHours)
                  .filter(([_, hours]: [string, any]) => hours.enabled)
                  .map(([day, hours]: [string, any]) => (
                    <div key={day} className="text-sm">
                      {day}: {hours.start} - {hours.end}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderCalendarView;
