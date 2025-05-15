
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import AdditionalServices from "@/components/AdditionalServices";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "מציאת ההתאמה המושלמת",
    description: "חפשו וסננו דרך הרשת הנרחבת שלנו של נותני שירותים מאומתים למצוא בדיוק את מה שאתם צריכים.",
    icon: "🔍"
  },
  {
    title: "תהליך הזמנה פשוט",
    description: "מערכת הזמנות פשוטה ושקופה עם תשלומים מאובטחים והגנת הסכם לשני הצדדים.",
    icon: "📅"
  },
  {
    title: "נותני שירות מאומתים",
    description: "כל נותני השירות עוברים תהליך אימות המבטיח איכות ואמינות עבור האירוע שלכם.",
    icon: "✅"
  },
  {
    title: "ניהול הכל במקום אחד",
    description: "מתקשורת ועד תשלומים, נהלו את כל היבטי שירותי האירועים שלכם בפלטפורמה אחת.",
    icon: "📱"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <ServiceCategories />
        
        <FeaturedProviders />
        
        <AdditionalServices />
        
        {/* מאפיינים */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">למה לבחור ב-EventConnect</h2>
            
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
        
        {/* CTA */}
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
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                הצטרפות כנותן שירות
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
