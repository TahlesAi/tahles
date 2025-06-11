
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { useProviderCalendar, CalendarSlot } from '@/hooks/useProviderCalendar';
import { useToast } from '@/hooks/use-toast';
import CalendarSlotForm from './CalendarSlotForm';
import CalendarSlotsList from './CalendarSlotsList';

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
      const availableSlots = await fetchAvailableSlots(selectedDate);
      setSlots(availableSlots);
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את הזמינות",
        variant: "destructive"
      });
    }
  };

  const handleSlotChange = (updates: Partial<typeof newSlot>) => {
    setNewSlot(prev => ({ ...prev, ...updates }));
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

    if (newSlot.startTime >= newSlot.endTime) {
      toast({
        title: "שגיאה",
        description: "זמן הסיום חייב להיות מאוחר יותר מזמן ההתחלה",
        variant: "destructive"
      });
      return;
    }

    try {
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
              <CalendarSlotForm
                newSlot={newSlot}
                onSlotChange={handleSlotChange}
                onAddSlot={addTimeSlot}
                loading={loading}
              />

              <div className="space-y-3">
                <h4 className="font-medium">משבצות זמן קיימות</h4>
                <CalendarSlotsList
                  slots={slots}
                  onToggleAvailability={toggleSlotAvailability}
                  onRemoveSlot={removeSlot}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarAvailabilityManager;
