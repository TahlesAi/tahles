
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Zap, Search, CreditCard, CalendarClock, Award } from "lucide-react";
import GuidedSearchModal from "@/components/GuidedSearch/GuidedSearchModal";

const HowItWorks = () => {
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);

  const handleStartClick = () => {
    setIsGuidedSearchOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        <section className="py-16 bg-gradient-to-b from-brand-50 to-white">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">איך ת'כל'ס עובד?</h1>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              מערכת תכל'ס מחברת בין ספקים לבין אנשים המחפשים שירותים לאירועים שלהם בצורה פשוטה, מהירה ואמינה.
            </p>
            <div className="mt-6">
              <Button 
                className="bg-accent1-500 hover:bg-accent1-600 text-white px-8 py-6 text-lg rounded-full"
                onClick={handleStartClick}
              >
                בואו נתחיל
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">איך מוצאים את השירות המושלם?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <Search className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. בחירת קטגוריה</h3>
                <p className="text-gray-700">
                  בחרו את סוג השירות שאתם מחפשים - לוקיישן, הופעה, קייטרינג או כל שירות אחר לאירוע שלכם.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <Zap className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. התאמה אישית</h3>
                <p className="text-gray-700">
                  ציינו פרטים כמו תאריך האירוע, מספר משתתפים, תקציב ודרישות מיוחדות לקבלת הצעות מותאמות אישית.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <CheckCircle2 className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. בחירת הספק</h3>
                <p className="text-gray-700">
                  בחרו מתוך רשימת הספקים המתאימים, השוו מחירים, קראו חוות דעת וצפו בתיק העבודות שלהם.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <CalendarClock className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">4. הזמנה וסגירת פרטים</h3>
                <p className="text-gray-700">
                  הזמינו את השירות, תאמו תאריכים וסגרו את כל הפרטים ישירות דרך המערכת.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <CreditCard className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">5. תשלום מאובטח</h3>
                <p className="text-gray-700">
                  שלמו באופן מאובטח דרך המערכת וקבלו אישור הזמנה רשמי לשקט נפשי מלא.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="bg-brand-100 p-3 w-14 h-14 rounded-full mb-6 flex items-center justify-center">
                  <Award className="text-brand-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">6. חוויה מושלמת</h3>
                <p className="text-gray-700">
                  תיהנו מהשירות המקצועי שבחרתם, ושתפו את החוויה שלכם בדירוג וחוות דעת.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg rounded-full"
                onClick={handleStartClick}
              >
                חפשו שירותים עכשיו
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">עבור ספקי שירות</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">הצטרפו לקהילת הספקים של תכל'ס</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-accent1-500 flex-shrink-0 ml-2" />
                  <span>פתחו חנות וירטואלית לשירותים שלכם ללא עלות</span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-accent1-500 flex-shrink-0 ml-2" />
                  <span>הרחיבו את מעגל הלקוחות שלכם וקבלו הזמנות חדשות</span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-accent1-500 flex-shrink-0 ml-2" />
                  <span>נהלו את היומן, ההזמנות והתשלומים במקום אחד</span>
                </li>
                <li className="flex">
                  <CheckCircle2 className="h-6 w-6 text-accent1-500 flex-shrink-0 ml-2" />
                  <span>בנו מוניטין באמצעות דירוגים וחוות דעת מלקוחות</span>
                </li>
              </ul>
              
              <Button asChild className="bg-accent1-500 hover:bg-accent1-600 text-white w-full py-6 text-lg">
                <Link to="/provider-onboarding">הצטרפו כספק שירות</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              מצאו את השירות המושלם לאירוע הבא שלכם או הצטרפו כספק שירות
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg"
                onClick={handleStartClick}
              >
                חיפוש שירותים
              </Button>
              
              <Button asChild variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-50 px-8 py-6 text-lg">
                <Link to="/provider-onboarding">הצטרפות כספק</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Guided Search Modal */}
      <GuidedSearchModal 
        isOpen={isGuidedSearchOpen} 
        onClose={() => setIsGuidedSearchOpen(false)} 
      />
    </div>
  );
};

export default HowItWorks;
