
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CalendarAvailabilityCheck {
  serviceId: string;
  date: string;
  startTime: string;
  durationMinutes?: number;
  location?: string;
}

export const useCalendarAvailability = () => {
  const [loading, setLoading] = useState(false);

  const checkServiceAvailability = async ({
    serviceId,
    date,
    startTime,
    durationMinutes = 120,
    location
  }: CalendarAvailabilityCheck): Promise<boolean> => {
    if (!serviceId || !date || !startTime) return false;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('check_service_availability', {
        p_service_id: serviceId,
        p_date: date,
        p_start_time: startTime,
        p_duration_minutes: durationMinutes,
        p_location: location
      });
      
      if (error) {
        console.error('Error checking service availability:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Error checking service availability:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkMultipleServicesAvailability = async (
    checks: CalendarAvailabilityCheck[]
  ): Promise<Record<string, boolean>> => {
    const results: Record<string, boolean> = {};
    
    const promises = checks.map(async (check) => {
      const available = await checkServiceAvailability(check);
      return { serviceId: check.serviceId, available };
    });
    
    const checkResults = await Promise.all(promises);
    
    checkResults.forEach(({ serviceId, available }) => {
      results[serviceId] = available;
    });
    
    return results;
  };

  return {
    loading,
    checkServiceAvailability,
    checkMultipleServicesAvailability
  };
};
