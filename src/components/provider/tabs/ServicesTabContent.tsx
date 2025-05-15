
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Tag, Clock, Info, CheckCircle, Star } from "lucide-react";
import ServiceCard from '../ServiceCard';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServicesTabContentProps {
  services: any[];
  onBookService: (service: any) => void;
}

const ServicesTabContent = ({ services, onBookService }: ServicesTabContentProps) => {
  // Categorize services
  const standardServices = services.filter(s => !s.is_premium && !s.is_custom);
  const premiumServices = services.filter(s => s.is_premium);
  const customServices = services.filter(s => s.is_custom);

  return (
    <TabsContent value="services" className="p-6 text-right" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">שירותים וחבילות</h2>
      <p className="mb-6">
        אנו מציעים מגוון שירותים המותאמים לצרכים הספציפיים של האירוע שלך.
      </p>
      
      <div className="space-y-8">
        {services.length > 0 ? (
          <>
            {/* Premium Services */}
            {premiumServices.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Star className="h-5 w-5 ml-2 text-amber-500" />
                  שירותי פרימיום
                </h3>
                <div className="space-y-4">
                  {premiumServices.map((service, index) => (
                    <ServiceCard 
                      key={`premium-${index}`}
                      service={service}
                      onBookService={onBookService}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Standard Services */}
            {standardServices.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">שירותים סטנדרטיים</h3>
                <div className="space-y-4">
                  {standardServices.map((service, index) => (
                    <ServiceCard 
                      key={`standard-${index}`}
                      service={service}
                      onBookService={onBookService}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom Services */}
            {customServices.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">שירותים בהתאמה אישית</h3>
                <div className="space-y-4">
                  {customServices.map((service, index) => (
                    <ServiceCard 
                      key={`custom-${index}`}
                      service={service}
                      onBookService={onBookService}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Service Features */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">פרטי השירות</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      מה כלול בשירות?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>ייעוץ מקדים לפני האירוע</li>
                      <li>התאמת השירות לדרישות הספציפיות שלך</li>
                      <li>כל הציוד הנדרש</li>
                      <li>תמיכה טכנית בזמן האירוע</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      ערך מוסף
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-gray-700">
                      <p>אנחנו מביאים ניסיון של שנים בתחום ומתחייבים לחוויית לקוח מושלמת.</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-gray-100">מקצועיות</Badge>
                        <Badge variant="outline" className="bg-gray-100">אמינות</Badge>
                        <Badge variant="outline" className="bg-gray-100">גמישות</Badge>
                        <Badge variant="outline" className="bg-gray-100">יחס אישי</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      תוספות אפשריות
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>שעות נוספות</li>
                      <li>שירותי הגברה מתקדמים</li>
                      <li>אפקטים מיוחדים</li>
                      <li>צילום מקצועי של האירוע</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
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
};

export default ServicesTabContent;
