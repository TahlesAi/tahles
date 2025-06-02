
import { useState, useMemo } from 'react';
import { consolidatedProducts, consolidatedCalendars } from '@/lib/consolidatedMockData';

export const useAvailabilityFilter = (selectedDate?: string, selectedTime?: string) => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  const availableProducts = useMemo(() => {
    if (!showOnlyAvailable || !selectedDate) {
      return consolidatedProducts.filter(product => product.available);
    }

    // קבל רשימת ספקים זמינים בתאריך ושעה הנבחרים
    const availableProviderIds = consolidatedCalendars
      .filter(calendar => {
        return calendar.slots.some(slot => {
          const isDateMatch = slot.date === selectedDate;
          const isTimeMatch = !selectedTime || slot.startTime <= selectedTime;
          const isSlotAvailable = slot.isAvailable && slot.currentBookings < slot.maxBookings;
          
          return isDateMatch && isTimeMatch && isSlotAvailable;
        });
      })
      .map(calendar => calendar.providerId);

    // סנן מוצרים רק מספקים זמינים
    return consolidatedProducts.filter(product => 
      product.available && 
      availableProviderIds.includes(product.providerId)
    );
  }, [selectedDate, selectedTime, showOnlyAvailable]);

  const getProviderAvailability = (providerId: string, date: string, time?: string) => {
    const calendar = consolidatedCalendars.find(cal => cal.providerId === providerId);
    if (!calendar) return false;

    return calendar.slots.some(slot => {
      const isDateMatch = slot.date === date;
      const isTimeMatch = !time || slot.startTime <= time;
      const isSlotAvailable = slot.isAvailable && slot.currentBookings < slot.maxBookings;
      
      return isDateMatch && isTimeMatch && isSlotAvailable;
    });
  };

  return {
    availableProducts,
    showOnlyAvailable,
    setShowOnlyAvailable,
    getProviderAvailability
  };
};
