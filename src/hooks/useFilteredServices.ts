
import { useMemo, useEffect, useState } from 'react';
import { useCalendarAvailability } from './useCalendarAvailability';
import type { SearchResultService } from '@/types';

interface FilteredServicesOptions {
  services: SearchResultService[];
  selectedDate?: string;
  selectedTime?: string;
  selectedLocation?: string;
  showOnlyAvailable?: boolean;
}

export const useFilteredServices = ({
  services,
  selectedDate,
  selectedTime,
  selectedLocation,
  showOnlyAvailable = true
}: FilteredServicesOptions) => {
  const [availabilityChecks, setAvailabilityChecks] = useState<Record<string, boolean>>({});
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const { checkMultipleServicesAvailability } = useCalendarAvailability();

  // בדיקת זמינות כאשר משתנים הפרמטרים
  useEffect(() => {
    const checkAvailability = async () => {
      if (!showOnlyAvailable || !selectedDate || !selectedTime || services.length === 0) {
        setAvailabilityChecks({});
        return;
      }

      setIsCheckingAvailability(true);
      
      const checks = services.map(service => ({
        serviceId: service.id,
        date: selectedDate,
        startTime: selectedTime,
        durationMinutes: service.duration || 120,
        location: selectedLocation
      }));

      try {
        const results = await checkMultipleServicesAvailability(checks);
        setAvailabilityChecks(results);
      } catch (error) {
        console.error('Error checking multiple services availability:', error);
        setAvailabilityChecks({});
      } finally {
        setIsCheckingAvailability(false);
      }
    };

    checkAvailability();
  }, [services, selectedDate, selectedTime, selectedLocation, showOnlyAvailable, checkMultipleServicesAvailability]);

  // סינון השירותים על בסיס זמינות
  const filteredServices = useMemo(() => {
    if (!showOnlyAvailable || !selectedDate || !selectedTime) {
      return services;
    }

    return services.filter(service => {
      const isAvailable = availabilityChecks[service.id];
      return isAvailable === true;
    });
  }, [services, availabilityChecks, showOnlyAvailable, selectedDate, selectedTime]);

  return {
    filteredServices,
    availabilityChecks,
    isCheckingAvailability
  };
};
