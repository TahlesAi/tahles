
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, MapPin, Plus, Trash2, Save } from 'lucide-react';
import { useProviderCalendar, CalendarSlot } from '@/hooks/useProviderCalendar';
import { useToast } from '@/hooks/use-toast';

interface CalendarAvailabilityManagerProps {
  providerId: string;
  serviceId?: string;
}

const CalendarAvailabilityManager: React.FC<CalendarAvailabilityManagerProps> = ({
  providerId,
  serviceId
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newSlot, setNewSlot] = useState({
    startTime: '',
    endTime: '',
    maxBookings: 1,
    serviceArea: '',
    isAvailable: true
  });
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  
  const { fetchAvailableSlots, loading } = useProviderCalendar(providerId);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedDate) {
      loadSlots();
    }
  }, [selectedDate]);

  const loadSlots = async () => {
    if (!selectedDate) return;
    
    try {
      const availableSlots = await fetchAvailableSlots(selectedDate, newSlot.serviceArea);
      setSlots(availableSlots);
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את הזמינות",
        variant: "destructive"
      });
    }
  };

  const addTimeSlot = async () => {
    if (!selectedDate || !newSlot.startTime || !newSlot.endTime) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    // בדיקה שזמן הסיום מאוחר יותר מזמן ההתחלה
    if (newSlot.startTime >= newSlot.endTime) {
      toast({
        title: "שגיאה",
        description: "זמן הסיום חייב להיות מאוחר יותר מזמן ההתחלה",
        variant: "destructive"
      });
      return;
    }

    try {
      // כאן נוסיף קריאה לשרת להוספת הזמן
      // לעת עתה נוסיף למערך המקומי
      const newSlotData: CalendarSlot = {
        id: `temp-${Date.now()}`,
        provider_id: providerId,
        date: selectedDate,
        start_time: newSlot.startTime,
        end_time: newSlot.endTime,
        is_available: newSlot.isAvailable,
        service_area: newSlot.serviceArea,
        max_bookings: newSlot.maxBookings,
        current_bookings: 0
      };

      setSlots(prev => [...prev, newSlotData]);
      
      // איפוס הטופס
      setNewSlot({
        startTime: '',
        endTime: '',
        maxBookings: 1,
        serviceArea: '',
        isAvailable: true
      });

      toast({
        title: "הצלחה",
        description: "משבצת זמן נוספה בהצלחה"
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן להוסיף משבצת זמן",
        variant: "destructive"
      });
    }
  };

  const removeSlot = async (slotId: string) => {
    try {
      setSlots(prev => prev.filter(slot => slot.id !== slotId));
      
      toast({
        title: "הצלחה",
        description: "משבצת הזמן נמחקה"
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן למחוק משבצת זמן",
        variant: "destructive"
      });
    }
  };

  const toggleSlotAvailability = async (slotId: string) => {
    try {
      setSlots(prev => prev.map(slot => 
        slot.id === slotId 
          ? { ...slot, is_available: !slot.is_available }
          : slot
      ));
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לעדכן זמינות",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            ניהול זמינות יומן
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* בחירת תאריך */}
          <div className="space-y-2">
            <label className="text-sm font-medium">בחר תאריך</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {selectedDate && (
            <>
              {/* הוספת משבצת זמן חדשה */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">הוסף משבצת זמן</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">שעת התחלה</label>
                    <Input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">שעת סיום</label>
                    <Input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">מקסימום הזמנות</label>
                    <Input
                      type="number"
                      min="1"
                      value={newSlot.maxBookings}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, maxBookings: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">אזור שירות</label>
                    <Input
                      placeholder="תל אביב, ירושלים..."
                      value={newSlot.serviceArea}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, serviceArea: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newSlot.isAvailable}
                      onCheckedChange={(checked) => setNewSlot(prev => ({ ...prev, isAvailable: checked }))}
                    />
                    <span className="text-sm">זמין להזמנות</span>
                  </div>
                  
                  <Button onClick={addTimeSlot} disabled={loading}>
                    <Plus className="h-4 w-4 ml-1" />
                    הוסף משבצת
                  </Button>
                </div>
              </div>

              {/* רשימת משבצות קיימות */}
              <div className="space-y-3">
                <h4 className="font-medium">משבצות זמן קיימות</h4>
                
                {slots.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    אין משבצות זמן עבור תאריך זה
                  </div>
                ) : (
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
                              onClick={() => toggleSlotAvailability(slot.id)}
                            >
                              {slot.is_available ? 'השבת' : 'הפעל'}
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeSlot(slot.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarAvailabilityManager;
