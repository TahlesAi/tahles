
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingTabContent = () => (
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
    
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">הזמן תאריך</h3>
      <p className="mb-4">
        מוכנים להבטיח את השירותים שלנו לאירוע שלך? בדקו את היומן שלנו לתאריכים זמינים או צרו קשר ישירות.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button>
          <Calendar className="h-4 w-4 ml-2" />
          צפה בלוח שנה
        </Button>
        <Button variant="outline">
          <Phone className="h-4 w-4 ml-2" />
          צור קשר לבדיקת זמינות
        </Button>
      </div>
    </div>
  </TabsContent>
);

export default BookingTabContent;
