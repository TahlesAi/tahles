
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, { message: "יש להזין שם מלא" }),
  email: z.string().email({ message: "יש להזין כתובת אימייל תקינה" }),
  phone: z.string().min(9, { message: "יש להזין מספר טלפון תקין" }),
  allowMarketing: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadCaptureFormProps {
  filterData?: any;
  onSubmitSuccess: () => void;
}

export default function LeadCaptureForm({ filterData, onSubmitSuccess }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: filterData?.contactInfo?.name || "",
      email: filterData?.contactInfo?.email || "",
      phone: filterData?.contactInfo?.phone || "",
      allowMarketing: true,
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // שילוב הנתונים מהפילטרים הקודמים עם פרטי הקשר
      const leadData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        allow_marketing: values.allowMarketing,
        // פרטי הפילטר אם קיימים
        ...filterData && {
          kosher: filterData.kosher,
          menu_type: filterData.menuType,
          regions: filterData.regions,
          guest_count: filterData.guestCount,
          event_date: filterData.date,
          budget_range: filterData.budgetPerGuest,
        }
      };
      
      // שמירת הליד בסופאבייס
      const { error } = await supabase
        .from("catering_leads")
        .insert(leadData);
      
      if (error) {
        console.error("Error saving lead:", error);
        throw new Error("שגיאה בשמירת הפרטים");
      }
      
      // הצגת הודעת הצלחה
      toast.success("תודה! פרטיך נשמרו בהצלחה", {
        description: "נציג יצור איתך קשר בהקדם עם הצעות מתאימות"
      });
      
      // קריאה לפונקציית ההצלחה שהועברה מהקומפוננטה ההורה
      onSubmitSuccess();
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("אירעה שגיאה בשמירת הפרטים", {
        description: "אנא נסו שנית מאוחר יותר"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-lg mx-auto border border-gray-200">
      <CardHeader>
        <CardTitle>השאירו פרטים לקבלת הצעות מותאמות</CardTitle>
        <CardDescription>
          אין לנו כרגע קייטרינג שעונה במדויק על הפילטרים שבחרת, אך אנחנו יכולים לעזור!
          השאירו פרטים ונציג שלנו יחזור אליכם עם הצעות מותאמות אישית.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <Input placeholder="שם מלא" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>אימייל</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    לא נשתף את כתובת האימייל שלך עם גורמים אחרים
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>טלפון</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="050-1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="allowMarketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-x-reverse">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      אני מסכים/ה לקבל דיוור ועדכונים מסחריים
                    </FormLabel>
                    <FormDescription>
                      ניתן לבטל את ההסכמה בכל עת
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                שליחת פרטים
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500 text-center">
          בלחיצה על "שליחת פרטים" אתם מסכימים לתנאי השימוש ולמדיניות הפרטיות שלנו
        </p>
      </CardFooter>
    </Card>
  );
}
