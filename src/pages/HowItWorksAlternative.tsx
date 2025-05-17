
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Search, Calendar, CreditCard, CheckCircle, Star, Filter, Utensils, Mic, Gift, Building, Map, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorksAlternative = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - משופר */}
        <section className="bg-gradient-to-br from-accent1-600 via-brand-600 to-brand-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">החוויה המושלמת לארגון האירוע שלך</h1>
              <p className="text-xl mb-10 opacity-90">
                פלטפורמה חדשנית וחכמה שמתאימה בדיוק את השירותים שאתם צריכים לאירוע המושלם
              </p>
              <Link 
                to="/search" 
                className="inline-flex items-center bg-white text-brand-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                בואו נמצא את השירות המושלם
                <ArrowLeft className="mr-4 rotate-[10deg]" size={20} />
              </Link>
              
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <CheckCircle className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="text-right">
                    <span className="block font-bold">+10,000</span>
                    <span className="text-sm">ספקים איכותיים</span>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <CheckCircle className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="text-right">
                    <span className="block font-bold">+50,000</span>
                    <span className="text-sm">אירועים מוצלחים</span>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <Star className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="text-right">
                    <span className="block font-bold">4.9/5</span>
                    <span className="text-sm">דירוג ממוצע</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* איך זה עובד - תהליך ויזואלי */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">איך מוצאים את השירות המושלם?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ארבעה צעדים פשוטים שיובילו אתכם לשירות המושלם עבור האירוע שלכם
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              {/* תהליך בצעדים - ויזואלי יותר */}
              <div className="relative">
                {/* קו מקשר בין הצעדים */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-brand-200 -translate-y-1/2 z-0"></div>
                
                <div className="grid md:grid-cols-4 gap-8 relative z-10">
                  {/* צעד 1 */}
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                    <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-6 text-3xl font-bold border-4 border-white shadow-md">
                      1
                    </div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">בחירת קטגוריה</h3>
                    <p className="text-gray-600">
                      בחרו את סוג השירות שאתם מחפשים - אמנים, מרצים, לוקיישנים, הפקה, ועוד
                    </p>
                  </div>
                  
                  {/* צעד 2 */}
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                    <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-6 text-3xl font-bold border-4 border-white shadow-md">
                      2
                    </div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                      <Filter className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">התאמה מדויקת</h3>
                    <p className="text-gray-600">
                      הגדירו את הדרישות המדויקות: מועד, קונספט, קהל היעד, מספר משתתפים ותקציב
                    </p>
                  </div>
                  
                  {/* צעד 3 */}
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                    <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-6 text-3xl font-bold border-4 border-white shadow-md">
                      3
                    </div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">שריון ביומנים</h3>
                    <p className="text-gray-600">
                      בחרו מתוך רשימת השירותים המותאמים לכם ושריינו בזמן אמת את התאריך המבוקש
                    </p>
                  </div>
                  
                  {/* צעד 4 */}
                  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
                    <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-6 text-3xl font-bold border-4 border-white shadow-md">
                      4
                    </div>
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">הזמנה מאובטחת</h3>
                    <p className="text-gray-600">
                      השלימו את ההזמנה במהירות ובקלות באמצעות מערכת התשלומים המאובטחת שלנו
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-16">
                <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                  <Link to="/search">
                    חפש שירותים עכשיו
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* קטגוריות פופולריות */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">קטגוריות שירותים פופולריות</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                מצאו את השירותים המושלמים מתוך מגוון הקטגוריות שלנו
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              <Link to="/search?category=locations" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Building className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">לוקיישנים</h3>
                <p className="text-sm text-gray-500">אולמות, גני אירועים, לופטים ומתחמים</p>
              </Link>
              
              <Link to="/search?category=food" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Utensils className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">מזון ומשקאות</h3>
                <p className="text-sm text-gray-500">קייטרינג, שפים, דוכני מזון וברים ניידים</p>
              </Link>
              
              <Link to="/search?category=production" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Camera className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">הפקה</h3>
                <p className="text-sm text-gray-500">הגברה, תאורה, צילום, במות ועיצוב</p>
              </Link>
              
              <Link to="/search?category=performances" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Mic className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">מופעים ואמנים</h3>
                <p className="text-sm text-gray-500">זמרים, להקות, מנטליסטים, סטנדאפיסטים</p>
              </Link>
              
              <Link to="/search?category=gifts" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Gift className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">מתנות</h3>
                <p className="text-sm text-gray-500">מזכרות, מתנות ממותגות, כרטיסי מתנה</p>
              </Link>
              
              <Link to="/search?category=trips" className="bg-gray-50 border border-gray-100 p-6 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
                  <Map className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="font-bold mb-2">ימי כיף וטיולים</h3>
                <p className="text-sm text-gray-500">גיבוש, סיורים, אטרקציות וחוויות</p>
              </Link>
            </div>
          </div>
        </section>

        {/* למה תכלס - יתרונות */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">למה להשתמש בתכלס?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* יתרונות ללקוחות */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-8 text-brand-600 text-center border-b border-gray-100 pb-4">
                  ללקוחות
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">גישה למגוון רחב של אמנים, מרצים ונותני שירות מובילים</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">השוואת מחירים ומפרטים בקלות ובמהירות</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">ביצוע הזמנה מהירה, פשוטה ומאובטחת בזמן אמת</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-brand-100 text-brand-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">חיסכון בזמן ובכסף בתהליך חיפוש ומציאת השירותים המושלמים</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button asChild className="text-lg bg-brand-600 hover:bg-brand-700 px-8">
                    <Link to="/search">חפש שירותים</Link>
                  </Button>
                </div>
              </div>
              
              {/* יתרונות לספקים */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-8 text-accent1-600 text-center border-b border-gray-100 pb-4">
                  לספקים
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">הצגת השירותים לקהל לקוחות רחב ורלוונטי</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">ניהול נוח ומהיר של הזמנות ויומן האירועים</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">קבלת תשלומים באופן מאובטח ומהיר</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-accent1-100 text-accent1-600 p-2 rounded-full mt-1 ml-4">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-lg">בניית מוניטין באמצעות חוות דעת של לקוחות מרוצים</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button asChild variant="outline" className="text-lg border-accent1-600 text-accent1-600 hover:bg-accent1-50 px-8">
                    <Link to="/provider-onboarding">הצטרף כנותן שירות</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - משופר */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">שאלות נפוצות</h2>
            
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-gray-200">
                  <AccordionTrigger className="text-right text-lg font-medium py-4 hover:text-brand-600">איך מגישים בקשה לשירות?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    בחרו את הקטגוריה המתאימה, הזינו את הפרטים הנדרשים כמו תאריך, מיקום ומספר משתתפים, ובחרו מבין השירותים המוצעים. לאחר מכן, מלאו את פרטי ההזמנה ובצעו תשלום.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-gray-200">
                  <AccordionTrigger className="text-right text-lg font-medium py-4 hover:text-brand-600">מה מדיניות הביטולים?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    <ul className="list-disc pr-5 space-y-2">
                      <li>ביטול עד 48 שעות לאחר ביצוע ההזמנה: ללא דמי ביטול</li>
                      <li>ביטול 14+ יום לפני האירוע: 50 ₪ דמי ביטול</li>
                      <li>ביטול 7-14 יום לפני האירוע: 100 ₪ או 5% מסכום ההזמנה (הגבוה מביניהם)</li>
                      <li>ביטול 3-6 ימים לפני האירוע: 50% מסכום ההזמנה</li>
                      <li>ביטול 24-48 שעות לפני האירוע: 80% מסכום ההזמנה</li>
                      <li>ביטול פחות מ-24 שעות לפני האירוע: 100% מסכום ההזמנה</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-gray-200">
                  <AccordionTrigger className="text-right text-lg font-medium py-4 hover:text-brand-600">איך מצטרפים כנותן שירות לפלטפורמה?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    לחצו על "הצטרפות כנותן שירות" בתפריט הראשי ועברו את תהליך הרישום הפשוט. יש למלא את פרטי החברה/עסק, לתאר את השירותים שאתם מציעים, להעלות תמונות ולקבוע מחירים.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-gray-200">
                  <AccordionTrigger className="text-right text-lg font-medium py-4 hover:text-brand-600">איך משלמים עבור השירותים?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    התשלום מתבצע באמצעות כרטיס אשראי, PayPal או Bit דרך מערכת התשלומים המאובטחת שלנו. בהזמנות גדולות ניתן לשלם בתשלומים.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-right text-lg font-medium py-4 hover:text-brand-600">מה קורה אם הספק מבטל את ההופעה?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    במקרה של ביטול מצד הספק, תקבלו החזר כספי מלא. אנו נעשה כל מאמץ לסייע לכם למצוא חלופה מתאימה לאירוע שלכם.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* קריאה לפעולה */}
        <section className="py-16 bg-gradient-to-br from-brand-600 to-accent1-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">מוכנים להתחיל?</h2>
              <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
                מצאו את האמנים, המרצים ונותני השירות המושלמים לאירוע הבא שלכם או הצטרפו כנותני שירות
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-brand-600 font-medium px-8 py-6 text-lg">
                  <Link to="/search">
                    חיפוש שירותים
                    <ArrowLeft className="mr-3" size={18} />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-6 text-lg">
                  <Link to="/provider-onboarding">
                    הצטרף כנותן שירות
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* אלמנטים דקורטיביים */}
          <div className="hidden md:block absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorksAlternative;
