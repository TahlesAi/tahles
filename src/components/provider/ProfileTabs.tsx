
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Phone, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ServiceCard from './ServiceCard';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  providerName: string;
  providerDescription?: string;
  services: any[];
  onBookService: (service: any) => void;
}

const ProfileTabs = ({ 
  activeTab, 
  setActiveTab, 
  providerName, 
  providerDescription = '', 
  services, 
  onBookService 
}: ProfileTabsProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
            <TabsTrigger 
              value="about" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              אודות
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              שירותים
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              חוות דעת
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              זמינות והזמנה
            </TabsTrigger>
          </TabsList>
          
          <AboutTabContent 
            providerName={providerName}
            providerDescription={providerDescription}
          />
          
          <ServicesTabContent 
            services={services}
            onBookService={onBookService}
          />
          
          <ReviewsTabContent />
          
          <BookingTabContent />
        </Tabs>
      </CardContent>
    </Card>
  );
};

const AboutTabContent = ({ providerName, providerDescription }: { providerName: string, providerDescription: string }) => (
  <TabsContent value="about" className="p-6 text-right" dir="rtl">
    <h2 className="text-2xl font-bold mb-4">אודות {providerName}</h2>
    <p className="mb-6">{providerDescription}</p>
    
    {providerName === "נטע ברסלר" && (
      <>
        <h3 className="text-xl font-semibold mb-3">מה אנו מציעים</h3>
        <ul className="list-disc pr-5 space-y-2 mb-6">
          <li>מופעי קריאת מחשבות אינטראקטיביים לכל סוג של אירוע</li>
          <li>קסמים אישיים בין שולחנות האירוע</li>
          <li>התאמה אישית של המופע לאופי האירוע והלקוח</li>
          <li>ניסיון של מעל 15 שנה בהופעה במגוון אירועים</li>
          <li>שילוב הומור וריגושים למופע בלתי נשכח</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3">הניסיון שלנו</h3>
        <p>
          עם ניסיון של יותר מעשור בהופעה באירועים רבים, אנו מביאים מקצועיות ומצוינות לכל מופע. 
          נטע ברסלר הופיע במגוון אירועים מחתונות ועד מסיבות חברה, והוא ידוע ביכולתו המרשימה 
          להפוך כל אירוע למיוחד.
        </p>
      </>
    )}
  </TabsContent>
);

const ServicesTabContent = ({ services, onBookService }: { services: any[], onBookService: (service: any) => void }) => (
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

const ReviewsTabContent = () => (
  <TabsContent value="reviews" className="p-6 text-right" dir="rtl">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="flex items-center ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-5 w-5 text-yellow-400 fill-yellow-400" 
            />
          ))}
        </div>
        <span className="font-medium">4.9</span>
        <span className="text-gray-500 mr-1">(87)</span>
      </div>
      <h2 className="text-2xl font-bold">חוות דעת</h2>
    </div>
    
    <div className="space-y-6">
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            18 באפריל, 2025
          </div>
          <div className="font-semibold">שרה כהן</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p>פשוט מדהים! הופיע בחתונה שלנו והיה פנומנלי. האורחים לא מפסיקים לדבר על כמה המופע היה מרשים. ממליצה בחום!</p>
      </div>
      
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            22 במרץ, 2025
          </div>
          <div className="font-semibold">מיכאל לוי</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p>הזמנו אותו לאירוע חברה והוא היה מקצועי ביותר. תקשורת מצוינת לפני האירוע, הגיע בזמן, והציג מופע יוצא מן הכלל.</p>
      </div>
      
      <div className="border-b pb-6">
        <div className="flex justify-between mb-2">
          <div className="text-gray-500 text-sm">
            5 במרץ, 2025
          </div>
          <div className="font-semibold">יסמין אברהם</div>
        </div>
        <div className="flex mb-2 justify-end">
          {[1, 2, 3, 4].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
          <Star 
            className="h-4 w-4 text-gray-300"
          />
        </div>
        <p>מופע טוב מאוד עם רפרטואר רחב. הם נענו לבקשות שלנו והשאירו את האנרגיה גבוהה לאורך כל הערב. הבעיה היחידה הייתה שההתארגנות לקחה קצת יותר זמן ממה שציפינו.</p>
      </div>
    </div>
    
    <div className="text-center mt-6">
      <Button variant="outline">
        טען עוד חוות דעת
      </Button>
    </div>
  </TabsContent>
);

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

export default ProfileTabs;
