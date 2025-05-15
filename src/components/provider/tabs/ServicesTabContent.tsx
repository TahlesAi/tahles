
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ServiceCard from '../ServiceCard';

interface ServicesTabContentProps {
  services: any[];
  onBookService: (service: any) => void;
}

const ServicesTabContent = ({ services, onBookService }: ServicesTabContentProps) => (
  <TabsContent value="services" className="p-6 text-right" dir="rtl">
    <h2 className="text-2xl font-bold mb-4">שירותים וחבילות</h2>
    <p className="mb-6">
      אנו מציעים מגוון שירותים המותאמים לצרכים הספציפיים של האירוע שלך.
    </p>
    
    <div className="space-y-4">
      {services.length > 0 ? (
        services.map((service, index) => (
          <ServiceCard 
            key={index}
            service={service}
            onBookService={onBookService}
          />
        ))
      ) : (
        <p className="text-gray-500">לא נמצאו שירותים זמינים כרגע.</p>
      )}
    </div>
    
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">חבילות מותאמות אישית</h3>
      <p className="mb-4">
        צריך משהו ספציפי לאירוע שלך? צור איתנו קשר כדי ליצור חבילה מותאמת אישית לדרישות המדויקות שלך.
      </p>
      <Button variant="outline">
        <MessageSquare className="h-4 w-4 ml-2" />
        בקש הצעת מחיר מותאמת אישית
      </Button>
    </div>
  </TabsContent>
);

export default ServicesTabContent;
