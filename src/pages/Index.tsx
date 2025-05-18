
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategoriesHebrew from "@/components/ServiceCategoriesHebrew";
import FeaturedProviders from "@/components/FeaturedProviders";
import AdditionalServices from "@/components/AdditionalServices";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChartBig } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { eventConcepts } from "@/lib/searchSuggestions";
import { Link } from "react-router-dom";
import useIsMobile from "@/hooks/use-mobile";
import { useEventContext } from "@/context/EventContext";

const features = [
  {
    title: "פתרונות מפיקים מקיפים",
    description: "מגוון שירותים לכל צורך: אמנים והרצאות מובילים, ימי כיף וגיבוש, לוקיישנים, הגברה ותאורה, צילום ועוד.",
    icon: "🔍"
  },
  {
    title: "הזמנה מהירה, פשוטה ובטוחה",
    description: "מערכת הזמנות אינטואיטיבית בזמן אמת עם תשלומים מאובטחים והגנה לשני הצדדים.",
    icon: "📅"
  },
  {
    title: "ספקים מאומתים",
    description: "כל ספקי השירות עוברים תהליך אימות קפדני המבטיח איכות ואמינות עבור האירוע שלכם.",
    icon: "✅"
  },
  {
    title: "הכל במקום אחד",
    description: "מתקשורת ועד תשלומים, נהלו את כל היבטי האירוע שלכם בפלטפורמה אחת נוחה וידידותית.",
    icon: "📱"
  }
];

// יתרונות חדשים למשתמשים
const userBenefits = [
  {
    title: "דף מוצר מקצועי",
    description: "דף מוצר מקצועי לכל חלופה – המאפשר טעימה חווייתית בכל מוצר בו מתעניינים.",
    icon: "📋"
  },
  {
    title: "מערכת שיתוף ביקורות",
    description: "מערכת שיתוף ביקורות פנימית בין הלקוחות – אשר מבטיחה הצלחה בבחירת המוצרים.",
    icon: "⭐"
  },
  {
    title: "5% קשבק להזמנה הבאה",
    description: "לקוחות תכלס חוסכים בכל הזמנה 5% קשבק להזמנה הבאה.",
    icon: "💰"
  }
];

// יתרונות חדשים לספקים
const providerBenefits = [
  {
    title: "מערכת ניהול ושיווק מושלמת",
    description: "מערכת ניהול ושיווק מושלמת להצגת השירותים שלכם בצורה מקצועית.",
    icon: "📊"
  },
  {
    title: "פטור מדמי ניהול",
    description: "פטור מדמי ניהול למשך 5 שנים למצטרפים בתקופת ההרצה.",
    icon: "🎁"
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const { featuredServices, topProviders } = useEventContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* קונספטים - שיפור תצוגה במובייל */}
        <section className="py-10 bg-white border-b" dir="rtl">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">קונספטים פופולריים</h2>
              <Badge variant="outline" className="cursor-pointer">ראה הכל</Badge>
            </div>
            
            <div className={`overflow-x-auto pb-6 ${isMobile ? '-mx-4 px-4' : ''}`}>
              <div className="flex gap-4 min-w-max">
                {eventConcepts.map((concept, index) => (
                  <Link key={index} to={`/search?concept=${encodeURIComponent(concept.value)}`}>
                    <div
                      className="bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center h-24 w-32 cursor-pointer hover:bg-gray-200 transition-colors gap-2"
                    >
                      {concept.icon}
                      <span className="font-medium text-center text-sm">{concept.value}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA - מוקם אחרי הקונספטים */}
        <section className="py-16 bg-gradient-to-r from-brand-600 to-accent1-600 text-white" dir="rtl">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">מוכנים ליצור אירוע מדהים?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              הצטרפו לאלפי מארגני אירועים שמצאו את האמנים, המרצים ונותני השירות המושלמים עבור האירועים המיוחדים שלהם.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-brand-600 hover:bg-gray-100">
                <Link to="/categories">חיפוש שירותים</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-accent1-500 text-white hover:bg-accent1-600 border-2 border-white">
                <Link to="/provider-onboarding" className="flex items-center">
                  <BarChartBig className="h-5 w-5 ml-2" />
                  הצטרפות כנותן שירות
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* קטגוריות שירות - עכשיו עם הרכיב העברי החדש */}
        <ServiceCategoriesHebrew />
        
        {/* ספקים מובילים */}
        <section className="py-16 bg-white" dir="rtl">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">ספקים מובילים</h2>
              <Link to="/providers" className="text-brand-600 hover:text-brand-700 font-medium flex items-center text-sm">
                לכל הספקים
                <ArrowRight className="h-4 w-4 mr-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(topProviders && topProviders.length > 0 ? topProviders.slice(0, 4) : Array(4).fill(null)).map((provider, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {provider ? (
                    <Link to={`/providers/${provider.id}`}>
                      <div className="aspect-video bg-gray-100">
                        {provider.logo_url ? (
                          <img src={provider.logo_url} alt={provider.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">אין תמונה</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{provider.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{provider.description}</p>
                        {provider.rating && (
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-lg">
                                  {i < Math.round(provider.rating) ? "★" : "☆"}
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">({provider.review_count || 0})</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">טוען...</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" asChild>
                <Link to="/providers">לכל הספקים</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* מאפיינים והיתרונות החדשים */}
        <section className="py-16 bg-gray-50" dir="rtl">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">למה ת'כל'ס?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* יתרונות ללקוחות */}
            <h2 className="text-2xl font-bold mt-16 mb-8 text-center">יתרונות ללקוחות</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 border-brand-100">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* יתרונות לספקים */}
            <h2 className="text-2xl font-bold mt-16 mb-8 text-center">יתרונות לספקים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {providerBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 border-accent1-100">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* שירותים נוספים */}
        <AdditionalServices />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
