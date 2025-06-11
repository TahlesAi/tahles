
// Mock calendar data for Neta Bresler
import { availabilityManager } from './availabilityManager';

// Register Neta Bresler's services in the availability system
export const initializeNetaAvailability = () => {
  const netaProviderId = 'neta-bresler-id';
  
  // Register all of Neta's services with calendar integration
  const netaServices = [
    'neta-8-lies-show',
    'neta-nomad-show', 
    'neta-second-thought-lecture',
    'neta-combined-show'
  ];

  netaServices.forEach(serviceId => {
    availabilityManager.registerService(serviceId, netaProviderId, {
      serviceId,
      providerId: netaProviderId,
      isAvailable: true,
      hasCalendar: true,
      maxConcurrentBookings: 1,
      currentBookings: 0
    });
  });

  // Create default calendar for Neta
  availabilityManager.createDefaultCalendar(netaProviderId);
  
  console.log('Neta Bresler availability initialized');
};

// Mock availability slots for Neta Bresler - next 30 days
export const createNetaCalendarSlots = () => {
  const slots = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends (Saturday = 6, Sunday = 0 in Hebrew context we skip Saturday)
    if (date.getDay() === 6) continue;
    
    // Create morning and evening slots
    const morningSlot = {
      id: `neta-morning-${date.toISOString().split('T')[0]}`,
      provider_id: 'neta-bresler-id',
      available_date: date.toISOString().split('T')[0],
      start_time: '10:00',
      end_time: '13:00',
      is_available: true,
      max_bookings: 1,
      current_bookings: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const eveningSlot = {
      id: `neta-evening-${date.toISOString().split('T')[0]}`,
      provider_id: 'neta-bresler-id', 
      available_date: date.toISOString().split('T')[0],
      start_time: '19:00',
      end_time: '22:00',
      is_available: true,
      max_bookings: 1,
      current_bookings: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    slots.push(morningSlot, eveningSlot);
  }
  
  return slots;
};

// Initialize on import
initializeNetaAvailability();
