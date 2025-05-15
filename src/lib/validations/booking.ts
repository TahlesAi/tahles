
import * as z from "zod";

export const bookingFormSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "שם חייב להכיל לפחות 2 תווים" })
    .max(50, { message: "שם לא יכול להכיל יותר מ-50 תווים" }),
  customerPhone: z
    .string()
    .min(9, { message: "מספר טלפון חייב להכיל לפחות 9 ספרות" })
    .max(15, { message: "מספר טלפון לא יכול להכיל יותר מ-15 תווים" }),
  customerEmail: z
    .string()
    .email({ message: "יש להזין כתובת אימייל תקינה" }),
  eventDate: z
    .date({ required_error: "יש לבחור תאריך לאירוע" })
    .refine((date) => date >= new Date(), { message: "לא ניתן לבחור תאריך שעבר" }),
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
