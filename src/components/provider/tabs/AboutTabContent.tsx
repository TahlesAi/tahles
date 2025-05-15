
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";

interface AboutTabContentProps {
  providerName: string;
  providerDescription: string;
}

const AboutTabContent = ({ providerName, providerDescription }: AboutTabContentProps) => (
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

export default AboutTabContent;
