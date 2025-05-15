
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url?: string;
  count?: number;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
}

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
  "Headphones": <Headphones className="h-8 w-8" />
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [performersSubcategories, setPerformersSubcategories] = useState<Subcategory[]>([]);
  const [producersSubcategories, setProducersSubcategories] = useState<Subcategory[]>([]);
  const [activitiesSubcategories, setActivitiesSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // שליפת נתוני הקטגוריות מסופהבייס
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select(`
            id, 
            name, 
            description, 
            icon, 
            image_url, 
            subcategories(
              id
            )
          `);

        if (categoriesError) {
          throw new Error(categoriesError.message);
        }

        // עיבוד הנתונים והוספת ספירת הספקים
        const processedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          image_url: category.image_url,
          count: category.subcategories?.length || 0
        }));

        setCategories(processedCategories);
        
        // שליפת תת-קטגוריות של מופעים (מייצג "אמנים ומופעים" בדף)
        const performersCategory = categoriesData.find(c => c.name === 'מופעים');
        if (performersCategory) {
          const { data: performersData, error: performersError } = await supabase
            .from("subcategories")
            .select(`
              id, 
              name, 
              description, 
              icon,
              provider_subcategories(
                provider_id
              )
            `)
            .eq("category_id", performersCategory.id);

          if (performersError) {
            throw new Error(performersError.message);
          }

          const processedPerformers = performersData.map(subcategory => ({
            id: subcategory.id,
            name: subcategory.name,
            description: subcategory.description,
            icon: subcategory.icon,
            count: subcategory.provider_subcategories?.length || 0
          }));

          setPerformersSubcategories(processedPerformers);
        }

        // בשלב זה, אין לנו עדיין נתונים אמיתיים לקטגוריות הנוספות
        // אז נשתמש בנתונים הסטטיים המקוריים
        
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // מצב של טעינה
  if (loading) {
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

  // נשתמש בנתונים הקיימים לקטגוריות שאין לנו עדיין מסופהבייס
  const producersCategories: Subcategory[] = [
    { 
      id: "locations", 
      name: "לוקיישנים", 
      icon: "MapPin", 
      description: "אולמות, גנים, מתחמים לאירועים",
      count: 124 
    },
    { 
      id: "catering", 
      name: "שירותי קייטרינג", 
      icon: "Utensils", 
      description: "קייטרינג לאירועים וכיבוד",
      count: 108 
    },
    { 
      id: "sound", 
      name: "שירותי סאונד", 
      icon: "Headphones", 
      description: "ציוד הגברה וסאונד לאירועים",
      count: 74 
    },
    { 
      id: "equipment", 
      name: "ציוד אודיו-ויזואלי", 
      icon: "Monitor", 
      description: "הקרנות, תאורה וציוד טכני",
      count: 98
    },
    { 
      id: "photography", 
      name: "צלמים", 
      icon: "Camera", 
      description: "צילום סטילס, וידאו וסרטונים",
      count: 157 
    },
    { 
      id: "decor", 
      name: "עיצוב ודקורציה", 
      icon: "Sparkles", 
      description: "עיצוב אירועים ותפאורה",
      count: 112 
    },
  ];

  const activitiesCategories: Subcategory[] = [
    { 
      id: "lectures", 
      name: "הרצאות", 
      icon: "Users", 
      description: "הרצאות מרתקות בכל הנושאים",
      count: 88 
    },
    { 
      id: "workshops", 
      name: "סדנאות", 
      icon: "PlusCircle", 
      description: "סדנאות חווייתיות, ODT וגיבוש",
      count: 93 
    },
    { 
      id: "attractions", 
      name: "אטרקציות", 
      icon: "PartyPopper", 
      description: "אטרקציות לאירועים ומסיבות",
      count: 76 
    },
    { 
      id: "tours", 
      name: "טיולים וימי גיבוש", 
      icon: "TentTree", 
      description: "סיורים, טיולי שטח וימי כיף",
      count: 68 
    },
    { 
      id: "tickets", 
      name: "כרטיסים לאטרקציות", 
      icon: "Calendar", 
      description: "כרטיסים למופעים ואטרקציות",
      count: 45 
    },
    { 
      id: "gifts", 
      name: "מתנות ומזכרות", 
      icon: "Gift", 
      description: "מתנות לאורחים ומזכרות",
      count: 63
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">קטגוריות שירותים</h1>
              <p className="text-xl mb-8">
                מצאו את השירותים המושלמים לכל אירוע - מבחר רחב ומגוון
              </p>
            </div>
          </div>
        </section>

        {/* קטגוריות עיקריות - מבסיס הנתונים */}
        {categories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">קטגוריות עיקריות</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/categories/${category.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                          <div className="text-brand-600">
                            {iconMap[category.icon] || category.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                        <p className="text-gray-500 text-center mb-4">{category.description}</p>
                        <div className="mt-auto text-sm text-gray-400">{category.count} קטגוריות משנה</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Performers Categories - מסופהבייס */}
        {performersSubcategories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">אמנים ומופעים</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {performersSubcategories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/subcategories/${category.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                          <div className="text-brand-600">{iconMap[category.icon] || category.icon}</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                        <p className="text-gray-500 text-center mb-4">{category.description}</p>
                        <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Producers Categories - סטטי לבינתיים */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">שירותי הפקה ולוגיסטיקה</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {producersCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/subcategories/${category.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-accent1-100 flex items-center justify-center mb-4">
                        <div className="text-accent1-600">{iconMap[category.icon] || category.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                      <p className="text-gray-500 text-center mb-4">{category.description}</p>
                      <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Categories - סטטי לבינתיים */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">פעילויות וחוויות</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {activitiesCategories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/subcategories/${category.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                        <div className="text-brand-600">{iconMap[category.icon] || category.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{category.name}</h3>
                      <p className="text-gray-500 text-center mb-4">{category.description}</p>
                      <div className="mt-auto text-sm text-gray-400">{category.count} נותני שירות</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-600 text-white">
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
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
