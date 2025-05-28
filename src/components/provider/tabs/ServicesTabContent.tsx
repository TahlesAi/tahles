
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Tag, Clock, Info, CheckCircle, Star, PlusCircle, Award, Monitor } from "lucide-react";
import ServiceCard from '../ServiceCard';
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Card } from '@/components/ui/card';

interface ServicesTabContentProps {
  services: any[];
  onBookService: (service: any) => void;
  providerId: string;
}

const ServicesTabContent = ({ services, onBookService, providerId }: ServicesTabContentProps) => {
  // Categorize services
  const standardServices = services.filter(s => !s.is_premium && !s.is_custom);
  const premiumServices = services.filter(s => s.is_premium);
  const customServices = services.filter(s => s.is_custom);

  return (
    <TabsContent value="services" className="p-6 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">שירותים וחבילות</h2>
        <Link to={`/provider/${providerId}/services/add`}>
          <Button variant="outline" size="sm">
            <PlusCircle className="ml-2 h-4 w-4" />
            הוספת שירות חדש
          </Button>
        </Link>
      </div>
      
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
                  <Award className="h-5 w-5 ml-2 text-amber-500" />
                  שירותי פרימיום
                </h3>
                <div className="space-y-4">
                  {premiumServices.map((service, index) => (
                    <ServiceCard 
                      key={`premium-${index}`}
                      service={service}
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
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom Services */}
            {customServices.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Monitor className="h-5 w-5 ml-2 text-brand-600" />
                  שירותים בהתאמה אישית
                </h3>
                <div className="space-y-4">
                  {customServices.map((service, index) => (
                    <ServiceCard 
                      key={`custom-${index}`}
                      service={service}
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
                      <Info className="ml-2 h-4 w-4" />
                      מה כלול בשירות?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>ייעוץ מקדים לפני האירוע</li>
                      <li>התאמת השירות לדרישות הספציפיות שלך</li>
                      <li>כל הציוד הנדרש</li>
                      <li>תמיכה טכנית בזמן האירוע</li>
                      <li>אחריות מלאה על השירות</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <CheckCircle className="ml-2 h-4 w-4" />
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
                        <Badge variant="outline" className="bg-gray-100">מחירים הוגנים</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Tag className="ml-2 h-4 w-4" />
                      תוספות אפשריות
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>שעות נוספות</li>
                      <li>שירותי הגברה מתקדמים</li>
                      <li>אפקטים מיוחדים</li>
                      <li>צילום מקצועי של האירוע</li>
                      <li>תוספות מזון ומשקאות</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg border border-dashed text-center">
            <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl font-medium mb-2">אין שירותים זמינים</h3>
            <p className="text-gray-500 mb-4">
              עדיין לא הוספת שירותים. הוסף את השירותים הראשונים שלך כדי להתחיל למכור.
            </p>
            <Link to={`/provider/${providerId}/services/add`}>
              <Button>
                <PlusCircle className="ml-2 h-4 w-4" />
                הוסף שירות ראשון
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {services.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">חבילות מותאמות אישית</h3>
          <Card className="p-4 bg-gradient-to-r from-brand-50 to-accent1-50 border-accent1-100">
            <p className="mb-4">
              צריך משהו ספציפי לאירוע שלך? צור איתנו קשר כדי ליצור חבילה מותאמת אישית לדרישות המדויקות שלך.
            </p>
            <Button variant="outline" className="bg-white">
              <MessageSquare className="h-4 w-4 ml-2" />
              בקש הצעת מחיר מותאמת אישית
            </Button>
          </Card>
        </div>
      )}
    </TabsContent>
  );
};

export default ServicesTabContent;
