
import * as z from "zod";

export const bookingFormSchema = z.object({
  customerName: z
    .string()
    .min(0, { message: "" }) // שדה לא חובה לבדיקה
    .max(50, { message: "שם לא יכול להכיל יותר מ-50 תווים" })
    .optional(),
  customerPhone: z
    .string()
    .min(0, { message: "" }) // שדה לא חובה לבדיקה
    .max(15, { message: "מספר טלפון לא יכול להכיל יותר מ-15 תווים" })
    .optional(),
  customerEmail: z
    .string()
    .email({ message: "יש להזין כתובת אימייל תקינה" })
    .or(z.string().length(0)) // מאפשר מחרוזת ריקה
    .optional(),
  eventDate: z
    .date({ required_error: "" })
    .optional(), // לא חובה לבדיקה
  additionalRequests: z
    .string()
    .max(500, { message: "בקשות נוספות לא יכולות להכיל יותר מ-500 תווים" })
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export interface BookingData extends BookingFormValues {
  providerId: string;
  serviceId: string;
}
