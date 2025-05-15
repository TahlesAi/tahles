
import { supabase } from "@/integrations/supabase/client";
import type { BookingData } from "../validations/booking";

export async function createBooking(bookingData: BookingData) {
  const { providerId, serviceId, customerName, customerPhone, customerEmail, eventDate, additionalRequests } = bookingData;
  
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          provider_id: providerId,
          service_id: serviceId,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          event_date: eventDate,
          additional_requests: additionalRequests || null,
        },
      ])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
