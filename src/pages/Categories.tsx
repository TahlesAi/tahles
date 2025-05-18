
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones,
  Building, ChefHat, BookOpen, MapPin as Map, Lightbulb
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEventContext } from "@/context/EventContext";

// מיפוי שמות אייקונים לקומפוננטות של Lucide React
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-8 w-8" />,
  "Camera": <Camera className="h-8 w-8" />,
  "Utensils": <Utensils className="h-8 w-8" />,
  "MapPin": <MapPin className="h-8 w-8" />,
  "Mic": <Mic2 className="h-8 w-8" />,
  "Mic2": <Mic2 className="h-8 w-8" />,
  "Monitor": <Monitor className="h-8 w-8" />,
  "Gift": <Gift className="h-8 w-8" />,
  "Sparkles": <Sparkles className="h-8 w-8" />,
  "Calendar": <Calendar className="h-8 w-8" />,
  "Wand2": <Wand2 className="h-8 w-8" />,
  "PartyPopper": <PartyPopper className="h-8 w-8" />,
  "TentTree": <TentTree className="h-8 w-8" />,
  "User": <User className="h-8 w-8" />,
  "PlusCircle": <PlusCircle className="h-8 w-8" />,
  "Users": <Users className="h-8 w-8" />,
  "Headphones": <Headphones className="h-8 w-8" />,
  "BookOpen": <BookOpen className="h-8 w-8" />,
  "Map": <Map className="h-8 w-8" />,
  "Building": <Building className="h-8 w-8" />,
  "ChefHat": <ChefHat className="h-8 w-8" />,
  "Lightbulb": <Lightbulb className="h-8 w-8" />
};

const Categories = () => {
  const { 
    isLoading, 
    error, 
    setSelectedCategory,
    hebrewCategories,
    hebrewConcepts
  } = useEventContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedCategory(null);
  }, [setSelectedCategory]);

  // מצב של טעינה
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Skeleton className="h-10 w-1/2 mx-auto mb-6 bg-white/20" />
                <Skeleton className="h-6 w-3/4 mx-auto bg-white/20" />
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Skeleton className="h-10 w-1/4 mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !hebrewCategories || hebrewCategories.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold mb-6">שגיאה בטעינת הקטגוריות</h1>
              <p className="mb-8">{error || "לא נמצאו קטגוריות במערכת"}</p>
              <Button asChild>
                <Link to="/">חזרה לדף הבית</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16" dir="rtl">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">קטגוריות שירותים</h1>
              <p className="text-xl mb-8">
                מצאו את השירותים המושלמים לכל אירוע - מבחר רחב ומגוון
              </p>
            </div>
          </div>
        </section>

        {/* קטגוריות עיקריות - Using Hebrew Categories */}
        <section className="py-16 bg-white" dir="rtl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">קטגוריות עיקריות</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {hebrewCategories.map((category) => {
                const subcategoryCount = category.subcategories.length;
                return (
                  <Link 
                    key={category.id} 
                    to={`/categories/${category.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                          <div className="text-brand-600">
                            {category.icon && iconMap[category.icon] || (
                              <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
                                {category.name.substring(0, 1)}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                        <p className="text-gray-500 text-center mb-4">{category.description || ""}</p>
                        <div className="mt-auto text-sm text-gray-400">{subcategoryCount} תת-קטגוריות</div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* קונספטים פופולריים */}
        <section className="py-16 bg-gray-50" dir="rtl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">קונספטים פופולריים</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {hebrewConcepts.map((concept) => {
                const subconcept_count = concept.subconcepts ? concept.subconcepts.length : 0;
                return (
                  <Link 
                    key={concept.id} 
                    to={`/concepts/${concept.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-accent1-50 flex items-center justify-center mb-4">
                          <div className="text-accent1-600">
                            {concept.icon && iconMap[concept.icon] || (
                              <div className="w-8 h-8 rounded-full bg-accent1-500 flex items-center justify-center text-white">
                                {concept.name.substring(0, 1)}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-center">{concept.name}</h3>
                        <div className="mt-auto text-sm text-gray-400">{subconcept_count} סוגי אירועים</div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white" dir="rtl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">לא מוצאים את מה שחיפשתם?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              צרו קשר עם צוות השירות שלנו ונשמח לסייע לכם למצוא את השירות המושלם לאירוע שלכם
            </p>
            <Link 
              to="/contact" 
              className="bg-white text-brand-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              דברו איתנו
            </Link>
          </div>
        </section>
        
        {/* Provider Onboarding CTA */}
        <section className="py-16 bg-gray-50" dir="rtl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">נותני שירות? הצטרפו למערכת</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              פרסמו את השירותים שלכם באתר והגיעו ללקוחות חדשים
            </p>
            <Button size="lg" asChild>
              <Link to="/provider-onboarding">הצטרפו כספק</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
