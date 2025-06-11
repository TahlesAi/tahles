
import { useState, useCallback } from 'react';
import { createNetaCalendarSlots } from '@/lib/mockCalendarData';

export interface CalendarSlot {
  id: string;
  provider_id?: string;
  date?: string;
  start_time: string;
  end_time: string;
  is_available?: boolean;
  service_area?: string;
  max_bookings: number;
  current_bookings: number;
}

export const useProviderCalendar = (providerId: string) => {
  const [loading, setLoading] = useState(false);

  const fetchAvailableSlots = useCallback(async (date: string): Promise<CalendarSlot[]> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For Neta Bresler, return mock calendar data
      if (providerId === 'neta-bresler-id') {
        const allSlots = createNetaCalendarSlots();
        const slotsForDate = allSlots
          .filter(slot => slot.available_date === date && slot.is_available)
          .map(slot => ({
            id: slot.id,
            provider_id: slot.provider_id,
            date: slot.available_date,
            start_time: slot.start_time,
            end_time: slot.end_time,
            is_available: slot.is_available,
            service_area: undefined,
            max_bookings: slot.max_bookings,
            current_bookings: slot.current_bookings
          }));
        
        return slotsForDate;
      }
      
      // For other providers, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching calendar slots:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  return {
    fetchAvailableSlots,
    loading
  };
};
