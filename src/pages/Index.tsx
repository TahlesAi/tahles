
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import AdditionalServices from "@/components/AdditionalServices";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { eventConcepts } from "@/lib/searchSuggestions";

const features = [
  {
    title: "פתרונות מקיפים",
    description: "מגוון שירותים מקצה לקצה: לוקיישנים, הגברה, מופעים, קייטרינג, צילום ועוד.",
    icon: "🔍"
  },
  {
    title: "הזמנה פשוטה ובטוחה",
    description: "מערכת הזמנות אינטואיטיבית עם תשלומים מאובטחים והגנה לשני הצדדים.",
    icon: "📅"
  },
  {
    title: "ספקים מאומתים",
    description: "כל ספקי השירות עוברים תהליך אימות המבטיח איכות ואמינות עבור האירוע שלכם.",
    icon: "✅"
  },
  {
    title: "הכל במקום אחד",
    description: "מתקשורת ועד תשלומים, נהלו את כל היבטי האירוע שלכם בפלטפורמה אחת.",
    icon: "📱"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* CTA - הועבר לחלק העליון של הדף */}
        <section className="py-16 bg-gradient-to-r from-brand-600 to-accent1-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">מוכנים ליצור אירוע מדהים?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              הצטרפו לאלפי מארגני אירועים שמצאו את נותני השירות המושלמים עבור האירועים המיוחדים שלהם.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-brand-600 hover:bg-gray-100">
                חיפוש שירותים
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                הצטרפות כנותן שירות
              </Button>
            </div>
          </div>
        </section>
        
        {/* קונספטים */}
        <section className="py-10 bg-white border-b">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">קונספטים פופולריים</h2>
              <Badge variant="outline" className="cursor-pointer">ראה הכל</Badge>
            </div>
            
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-4 min-w-max">
                {eventConcepts.map((concept, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-3 flex flex-col items-center justify-center h-24 w-32 cursor-pointer hover:bg-gray-200 transition-colors gap-2"
                  >
                    {concept.icon}
                    <span className="font-medium text-center text-sm">{concept.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <ServiceCategories />
        
        <FeaturedProviders />
        
        {/* מאפיינים */}
        <section className="py-16 bg-white">
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
          </div>
        </section>
        
        <AdditionalServices />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
