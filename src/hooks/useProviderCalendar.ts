
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CalendarSlot {
  id: string;
  provider_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  service_area?: string;
  max_bookings: number;
  current_bookings: number;
}

export const useProviderCalendar = (providerId?: string) => {
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableSlots = async (
    date: string,
    serviceArea?: string
  ) => {
    if (!providerId) return [];
    
    setLoading(true);
    try {
      let query = supabase
        .from('provider_calendar')
        .select('*')
        .eq('provider_id', providerId)
        .eq('date', date)
        .eq('is_available', true)
        .lt('current_bookings', supabase.rpc('get_max_bookings', { calendar_id: 'id' }));

      if (serviceArea) {
        query = query.eq('service_area', serviceArea);
      }

      const { data, error } = await query.order('start_time');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching calendar slots:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slotId: string) => {
    try {
      // תחילה נשלוף את המידע הנוכחי
      const { data: currentSlot, error: fetchError } = await supabase
        .from('provider_calendar')
        .select('current_bookings, max_bookings')
        .eq('id', slotId)
        .single();
      
      if (fetchError) throw fetchError;
      
      if (currentSlot && currentSlot.current_bookings < currentSlot.max_bookings) {
        // עדכון מספר ההזמנות הנוכחיות
        const { error } = await supabase
          .from('provider_calendar')
          .update({ 
            current_bookings: currentSlot.current_bookings + 1 
          })
          .eq('id', slotId);
        
        if (error) throw error;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error booking slot:', error);
      return false;
    }
  };

  return {
    slots,
    loading,
    fetchAvailableSlots,
    bookSlot
  };
};
