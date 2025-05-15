
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Phone, CircleCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { he } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AvailabilityData {
  date: string;
  slots: {
    id: string;
    start_time: string;
    end_time: string;
  }[];
}

const BookingTabContent = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState<AvailabilityData[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('provider_availability')
          .select('*')
          .eq('provider_id', id)
          .eq('is_available', true)
          .order('available_date', { ascending: true })
          .order('start_time', { ascending: true });

        if (error) throw error;

        // Group by date
        const groupedByDate: Record<string, any[]> = {};
        data?.forEach((slot) => {
          const dateStr = slot.available_date;
          if (!groupedByDate[dateStr]) {
            groupedByDate[dateStr] = [];
          }
          groupedByDate[dateStr].push({
            id: slot.id,
            start_time: slot.start_time,
            end_time: slot.end_time,
          });
        });

        // Convert to array format
        const formattedAvailability = Object.keys(groupedByDate).map((date) => ({
          date,
          slots: groupedByDate[date],
        }));

        setAvailability(formattedAvailability);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  return (
    <TabsContent value="booking" className="p-6 text-right" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">זמינות והזמנה</h2>
      <p className="mb-6">
        להלן שעות הזמינות הכלליות שלנו. לתאריכים ספציפיים, אנא צרו קשר או בדקו את יומן ההזמנות שלנו.
      </p>
      
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">יום</TableHead>
            <TableHead className="text-right">שעות פעילות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">ראשון</TableCell>
            <TableCell>9:00 - 18:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">שני</TableCell>
            <TableCell>9:00 - 18:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">שלישי</TableCell>
            <TableCell>9:00 - 18:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">רביעי</TableCell>
            <TableCell>9:00 - 18:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">חמישי</TableCell>
            <TableCell>9:00 - 22:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">שישי</TableCell>
            <TableCell>10:00 - 16:00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">שבת</TableCell>
            <TableCell>סגור</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-8 mb-6">
        <h3 className="text-lg font-semibold mb-4">זמינות חודש מאי 2025</h3>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
        ) : availability.length > 0 ? (
          <div className="space-y-4">
            {availability.map((day) => (
              <Card key={day.date} className="p-4">
                <h4 className="font-medium text-lg mb-2">
                  {format(parseISO(day.date), "EEEE, d בMMMM", { locale: he })}
                </h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {day.slots.map((slot) => (
                    <Button 
                      key={slot.id} 
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <CircleCheck className="h-4 w-4 text-green-500 ml-1" />
                      {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">לא נמצאה זמינות לחודש הקרוב</p>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">הזמן תאריך</h3>
        <p className="mb-4">
          מוכנים להבטיח את השירותים שלנו לאירוע שלך? בדקו את היומן שלנו לתאריכים זמינים או צרו קשר ישירות.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button>
            <CalendarIcon className="h-4 w-4 ml-2" />
            צפה בלוח שנה מלא
          </Button>
          <Button variant="outline">
            <Phone className="h-4 w-4 ml-2" />
            צור קשר לבדיקת זמינות
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default BookingTabContent;
