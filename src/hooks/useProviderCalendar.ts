
import { useState, useEffect } from 'react';
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
        .lt('current_bookings', supabase.raw('max_bookings'));

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
      const { error } = await supabase.rpc('book_calendar_slot', {
        slot_id: slotId
      });
      
      if (error) throw error;
      return true;
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
