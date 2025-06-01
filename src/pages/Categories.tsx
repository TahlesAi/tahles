
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
import { Badge } from "@/components/ui/badge";
import { useEventContext } from "@/context/EventContext";

// מיפוי שמות אייקונים לקומפוננטות של Lucide React
const iconMap: Record<string, React.ReactNode> = {
  "Music": <Music className="h-5 w-5" />,
  "Camera": <Camera className="h-5 w-5" />,
  "Utensils": <Utensils className="h-5 w-5" />,
  "MapPin": <MapPin className="h-5 w-5" />,
  "Mic": <Mic2 className="h-5 w-5" />,
  "Mic2": <Mic2 className="h-5 w-5" />,
  "Monitor": <Monitor className="h-5 w-5" />,
  "Gift": <Gift className="h-5 w-5" />,
  "Sparkles": <Sparkles className="h-5 w-5" />,
  "Calendar": <Calendar className="h-5 w-5" />,
  "Wand2": <Wand2 className="h-5 w-5" />,
  "PartyPopper": <PartyPopper className="h-5 w-5" />,
  "TentTree": <TentTree className="h-5 w-5" />,
  "User": <User className="h-5 w-5" />,
  "PlusCircle": <PlusCircle className="h-5 w-5" />,
  "Users": <Users className="h-5 w-5" />,
  "Headphones": <Headphones className="h-5 w-5" />,
  "BookOpen": <BookOpen className="h-5 w-5" />,
  "Map": <Map className="h-5 w-5" />,
  "Building": <Building className="h-5 w-5" />,
  "ChefHat": <ChefHat className="h-5 w-5" />,
  "Lightbulb": <Lightbulb className="h-5 w-5" />
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
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </div>
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
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-xl font-bold mb-4">שגיאה בטעינת הקטגוריות</h1>
            <p className="mb-6">{error || "לא נמצאו קטגוריות במערכת"}</p>
            <Button asChild size="sm">
              <Link to="/">חזרה לדף הבית</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container mx-auto px-4 py-6">
          {/* כותרת קומפקטית */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">קטגוריות שירותים</h1>
            <p className="text-gray-600 text-sm">בחר קטגוריה למציאת השירות המתאים</p>
          </div>

          {/* קטגוריות עיקריות - רשת צפופה */}
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {hebrewCategories.map((category) => {
                const subcategoryCount = category.subcategories ? category.subcategories.length : 0;
                return (
                  <Link 
                    key={category.id} 
                    to={`/categories/${category.id}`}
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-3 text-center">
                        <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-2 mx-auto group-hover:bg-brand-200 transition-colors">
                          <div className="text-brand-600">
                            {category.icon && iconMap[category.icon] ? (
                              iconMap[category.icon]
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                                {category.name.substring(0, 1)}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-sm font-medium mb-1 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
                          {category.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {subcategoryCount}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* קונספטים - גם בצורה קומפקטית */}
          {hebrewConcepts && hebrewConcepts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">קונספטים לאירועים</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {hebrewConcepts.slice(0, 8).map((concept) => (
                  <Link 
                    key={concept.id} 
                    to={`/concepts/${concept.id}`}
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-2.5 text-center">
                        <div className="w-8 h-8 rounded-lg bg-accent1-50 flex items-center justify-center mb-1.5 mx-auto group-hover:bg-accent1-100 transition-colors">
                          <div className="text-accent1-600">
                            {concept.icon && iconMap[concept.icon] ? (
                              <div className="scale-75">
                                {iconMap[concept.icon]}
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-accent1-500 flex items-center justify-center text-white text-xs">
                                {concept.name.substring(0, 1)}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xs font-medium line-clamp-2 leading-tight group-hover:text-accent1-600 transition-colors">
                          {concept.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA קומפקטי */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-3">
              ספק שירותים? הצטרף למערכת והגע ללקוחות חדשים
            </p>
            <Button size="sm" asChild>
              <Link to="/provider-onboarding">הצטרפות כספק</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
