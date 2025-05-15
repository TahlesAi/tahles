
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">איך זה עובד?</h1>
              <p className="text-xl mb-8">
                הפלטפורמה המובילה למציאת שירותי בידור והפקה לאירועים בישראל
              </p>
              <Link 
                to="/search" 
                className="inline-block bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                חפש מופע עכשיו
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">איך מוצאים את השירות המושלם?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">בחרו קטגוריה</h3>
                <p className="text-gray-600">בחרו את סוג השירות שאתם מחפשים - אמנים, הופעות, שירותי הפקה ועוד</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">התאימו לצרכים שלכם</h3>
                <p className="text-gray-600">הגדירו את הדרישות הספציפיות, תאריך, סוג קהל, מספר משתתפים ותקציב</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">בצעו הזמנה</h3>
                <p className="text-gray-600">בחרו את השירות המתאים לכם ביותר והשלימו את ההזמנה בקלות</p>
              </div>
            </div>
          </div>
        </section>

        {/* For customers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">למה להשתמש בת'כלס?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-brand-600">ללקוחות</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>גישה למגוון רחב של אמנים, מפיקים ונותני שירות באירועים</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>השוואת מחירים ומפרטים בין נותני שירות שונים</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>ביצוע הזמנה מאובטחת ונוחה באופן מקוון</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>חיסכון בזמן ובכסף בתהליך חיפוש ומציאת שירותים לאירוע</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-accent1-600">לספקים</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>הצגת השירותים לקהל לקוחות רחב ורלוונטי</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>ניהול נוח של ההזמנות ויומן האירועים</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>קבלת תשלומים באופן מאובטח</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>בניית מוניטין באמצעות חוות דעת של לקוחות</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">שאלות נפוצות</h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-right">איך מגישים בקשה לשירות?</AccordionTrigger>
                  <AccordionContent>
                    בחרו את הקטגוריה המתאימה, הזינו את הפרטים הנדרשים כמו תאריך, מיקום ומספר משתתפים, ובחרו מבין השירותים המוצעים. לאחר מכן, מלאו את פרטי ההזמנה ובצעו תשלום.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-right">האם ניתן לבטל הזמנה?</AccordionTrigger>
                  <AccordionContent>
                    כן, ניתן לבטל הזמנה בהתאם למדיניות הביטולים של כל ספק. בדרך כלל, ביטולים עד 14 יום לפני האירוע כרוכים בדמי ביטול של 5-10%. לאחר מכן, דמי הביטול עשויים לעלות.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-right">איך מצטרפים כנותן שירות לפלטפורמה?</AccordionTrigger>
                  <AccordionContent>
                    לחצו על "הצטרפות כנותן שירות" בתפריט הראשי ועברו את תהליך הרישום הפשוט. יש למלא את פרטי החברה/עסק, לתאר את השירותים שאתם מציעים, להעלות תמונות ולקבוע מחירים.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-right">איך משלמים עבור השירותים?</AccordionTrigger>
                  <AccordionContent>
                    התשלום מתבצע באמצעות כרטיס אשראי, PayPal או Bit דרך מערכת התשלומים המאובטחת שלנו. בהזמנות גדולות ניתן לשלם בתשלומים.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-right">מה קורה אם הספק מבטל את ההופעה?</AccordionTrigger>
                  <AccordionContent>
                    במקרה של ביטול מצד הספק, תקבלו החזר כספי מלא. אנו נעשה כל מאמץ לסייע לכם למצוא חלופה מתאימה לאירוע שלכם.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">מוכנים להתחיל?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              מצאו את נותני השירות המושלמים לאירוע הבא שלכם או הצטרפו כנותני שירות
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/search" 
                className="bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                חפש שירותים
              </Link>
              <Link 
                to="/provider-onboarding" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                הצטרף כנותן שירות
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
