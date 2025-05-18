
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, PackageCheck, ShieldCheck, Sparkles, Trophy, Users } from "lucide-react";
import GuidedSearchModal from "@/components/GuidedSearch/GuidedSearchModal";

const HowItWorks = () => {
  const [isGuidedSearchOpen, setIsGuidedSearchOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartSearch = () => {
    setIsGuidedSearchOpen(true);
  };

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
                הפלטפורמה שעושה לכם סדר בהפקת האירועים
              </p>
              <button 
                onClick={handleStartSearch}
                className="inline-flex items-center bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                בואו נתחיל <ArrowLeft className="mr-4 rotate-[10deg]" size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">איך מוצאים את השירות המושלם?</h2>
            
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">בחרו קטגוריה</h3>
                <p className="text-gray-600">בחרו את סוג השירות שאתם מחפשים - לדוגמא: אמנים, מרצים, לוקיישנים, הפקה, אבטחה ועוד...</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">התאמה אישית לצרכים</h3>
                <p className="text-gray-600">הגדירו את הדרישות המדויקות: מועד, קונספט, קהל היעד, מספר משתתפים ותקציב</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">שריינו ביומנים</h3>
                <p className="text-gray-600">בחרו מתוך רשימת השירותים המותאמים לכם ושריינו בזמן אמת את התאריך המבוקש</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-2xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-2">בצעו הזמנה מאובטחת</h3>
                <p className="text-gray-600">השלימו את ההזמנה במהירות ובקלות באמצעות מערכת התשלומים המאובטחת שלנו</p>
              </div>
            </div>
          </div>
        </section>

        {/* For customers - Expanded Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">למה להשתמש בתכלס?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-brand-600">יתרונות ללקוחות</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">גישה למגוון רחב של ספקים איכותיים</p>
                      <p className="text-gray-600 mt-1">מאגר מקיף של אמנים, מרצים ונותני שירות מובילים מכל התחומים</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">השוואת מחירים וחוות דעת</p>
                      <p className="text-gray-600 mt-1">קבלו מידע מפורט על כל שירות, כולל מחירים, זמינות וביקורות של לקוחות קודמים</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">חיסכון משמעותי בזמן</p>
                      <p className="text-gray-600 mt-1">שריון בדקות במקום ימים של חיפושים וטלפונים לבדיקת זמינות</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">דף מוצר מקצועי לכל חלופה</p>
                      <p className="text-gray-600 mt-1">טעימה חווייתית בכל מוצר בו אתם מתעניינים, כולל סרטונים ותמונות איכותיות</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">5% קשבק להזמנה הבאה</p>
                      <p className="text-gray-600 mt-1">לקוחות תכלס חוסכים בכל הזמנה 5% קשבק להזמנה הבאה</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">אבטחת תשלומים ושקיפות מלאה</p>
                      <p className="text-gray-600 mt-1">מערכת תשלומים מאובטחת ושקיפות מלאה לגבי המחירים והתנאים</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-accent1-600">יתרונות לספקים</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">חשיפה מוגברת לקהל יעד רלוונטי</p>
                      <p className="text-gray-600 mt-1">הגיעו ללקוחות פוטנציאליים בדיוק ברגע שהם מחפשים את השירותים שלכם</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">ניהול יומן חכם ואוטומטי</p>
                      <p className="text-gray-600 mt-1">מערכת ניהול אירועים מתקדמת המסנכרנת את היומן שלכם ומונעת התנגשויות</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">מערכת ניהול ושיווק מושלמת</p>
                      <p className="text-gray-600 mt-1">מערכת ניהול ושיווק מקצועית להצגת השירותים שלכם בצורה הטובה ביותר</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">תשלומים מהירים ומאובטחים</p>
                      <p className="text-gray-600 mt-1">קבלו את התשלומים ישירות לחשבון שלכם באופן מהיר, בטוח ושקוף</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">פטור מדמי ניהול</p>
                      <p className="text-gray-600 mt-1">פטור מדמי ניהול למשך 5 שנים למצטרפים בתקופת ההרצה</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">בניית מוניטין דיגיטלי</p>
                      <p className="text-gray-600 mt-1">בניית פרופיל מקצועי הכולל ביקורות וחוות דעת שמחזקות את המוניטין שלכם</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Section - New Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">יתרונות מתקדמים במערכת תכלס</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-6">
                  <ShieldCheck className="h-12 w-12 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">אבטחה מתקדמת</h3>
                <p className="text-gray-700">
                  מערכת אבטחה מתקדמת להגנה על הנתונים שלכם ועל התשלומים, כולל הצפנת SSL ומערכות הגנה נגד הונאות.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-6">
                  <Trophy className="h-12 w-12 text-accent1-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">שקיפות מלאה</h3>
                <p className="text-gray-700">
                  מחירים, זמינות, תנאים ודירוגים - הכל שקוף וגלוי לעיניכם לפני ביצוע ההזמנה, ללא הפתעות או עלויות נסתרות.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-6">
                  <PackageCheck className="h-12 w-12 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">בקרת איכות</h3>
                <p className="text-gray-700">
                  כל ספק עובר תהליך אימות ובדיקת איכות לפני הצטרפותו למערכת, להבטחת רמת שירות ומקצועיות גבוהה לכל לקוחותינו.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Benefits - New Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">יתרונות בלעדיים במערכת תכלס</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-brand-600 text-white p-4 rounded-full">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">התאמה אישית מדויקת</h3>
                  <p className="text-gray-700 mb-4">
                    מנוע החיפוש החכם שלנו משתמש בטכנולוגיה מתקדמת כדי להתאים בין צרכי הלקוחות לבין הספקים המתאימים ביותר, תוך התחשבות במגוון רחב של פרמטרים.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-brand-600 ml-2" />
                      <span>התאמה לפי סוג אירוע, קהל יעד וגודל</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-brand-600 ml-2" />
                      <span>שיקלול התקציב והמיקום הגיאוגרפי</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-brand-600 ml-2" />
                      <span>מערכת שיקלול חוות דעת קודמות</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-accent1-600 text-white p-4 rounded-full">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">שירות לקוחות מקצועי</h3>
                  <p className="text-gray-700 mb-4">
                    צוות שירות הלקוחות שלנו זמין לעזור לכם בכל שלב בתהליך, החל מבחירת הספקים המתאימים ועד להשלמת ההזמנה וביצועה המוצלח.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-accent1-600 ml-2" />
                      <span>תמיכה זמינה בטלפון ובצ'אט</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-accent1-600 ml-2" />
                      <span>מענה מהיר לכל בעיה או שאלה</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-accent1-600 ml-2" />
                      <span>מומחי תוכן לייעוץ מקצועי</span>
                    </li>
                  </ul>
                </div>
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
                  <AccordionTrigger className="text-right">מה מדיניות הביטולים?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pr-5 space-y-1">
                      <li>ביטול עד 48 שעות לאחר ביצוע ההזמנה: ללא דמי ביטול</li>
                      <li>ביטול 14+ יום לפני האירוע: 50 ₪ דמי ביטול</li>
                      <li>ביטול 7-14 יום לפני האירוע: 100 ₪ או 5% מסכום ההזמנה (הגבוה מביניהם)</li>
                      <li>ביטול 3-6 ימים לפני האירוע: 50% מסכום ההזמנה</li>
                      <li>ביטול 24-48 שעות לפני האירוע: 80% מסכום ההזמנה</li>
                      <li>ביטול פחות מ-24 שעות לפני האירוע: 100% מסכום ההזמנה</li>
                    </ul>
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
              מצאו את האמנים, המרצים ונותני השירות המושלמים לאירוע הבא שלכם או הצטרפו כנותני שירות
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={handleStartSearch}
                className="inline-flex items-center bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                קדימה&nbsp;&nbsp;<ArrowLeft className="mr-6 rotate-[10deg]" size={18} />
              </button>
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
      
      {/* Guided Search Modal */}
      <GuidedSearchModal 
        isOpen={isGuidedSearchOpen} 
        onClose={() => setIsGuidedSearchOpen(false)} 
      />
    </div>
  );
};

export default HowItWorks;
