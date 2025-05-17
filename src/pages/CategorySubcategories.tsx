import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  ChevronLeft, AlertCircle, Loader2, Star,
  Building, Warehouse, Briefcase, Home, Users, 
  Landmark, PartyPopper, Utensils, DoorClosed, 
  Music, Lightbulb, Camera, MapPin, Mic2, Monitor,
  Gift, Sparkles, Calendar, Wand2, 
  TentTree, User, PlusCircle, Headphones, Hotel, School,
  Puzzle, Gamepad, KeySquare
} from "lucide-react";

interface Subcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
  isDemoData?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
}

interface Provider {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  service_count: number;
}

const iconComponents: Record<string, React.ReactNode> = {
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
  "Building": <Building className="h-8 w-8" />,
  "Warehouse": <Warehouse className="h-8 w-8" />,
  "Briefcase": <Briefcase className="h-8 w-8" />,
  "Home": <Home className="h-8 w-8" />,
  "Hotel": <Hotel className="h-8 w-8" />,
  "School": <School className="h-8 w-8" />,
  "Landmark": <Landmark className="h-8 w-8" />,
  "DoorClosed": <DoorClosed className="h-8 w-8" />,
  "Lightbulb": <Lightbulb className="h-8 w-8" />,
  "Puzzle": <Puzzle className="h-8 w-8" />,
  "Gamepad": <Gamepad className="h-8 w-8" />,
  "KeySquare": <KeySquare className="h-8 w-8" />
};

// רשימת תת-קטגוריות ברירת מחדל ללוקיישנים
const defaultLocationSubcategories = [
  { 
    name: "וילות אירוח", 
    description: "וילות פרטיות לאירועים ואירוח", 
    icon: "Home" 
  },
  { 
    name: "חללי ספורט", 
    description: "מתקני ואולמות ספורט להשכרה", 
    icon: "Users" 
  },
  { 
    name: "חללי עבודה", 
    description: "מרחבי עבודה משותפים וחדרי ישיבות", 
    icon: "Briefcase" 
  },
  { 
    name: "לופטים", 
    description: "חללים מעוצבים רב-שימושיים", 
    icon: "Warehouse" 
  },
  { 
    name: "אולמות הרצאות ומופעים", 
    description: "אודיטוריומים ואולמות להרצאות", 
    icon: "School" 
  },
  { 
    name: "חללים ציבוריים", 
    description: "מרחבים ציבוריים להשכרה", 
    icon: "Landmark" 
  },
  { 
    name: "אולמות אירועים", 
    description: "אולמות לארועים גדולים ומשפחתיים", 
    icon: "Building" 
  },
  { 
    name: "מסעדות", 
    description: "מסעדות וחללי הסעדה להשכרה", 
    icon: "Utensils" 
  },
  { 
    name: "חדרים פרטיים", 
    description: "חדרים להשכרה לאירועים קטנים", 
    icon: "DoorClosed" 
  },
  { 
    name: "מועדונים וחללי אירוח", 
    description: "מועדוני לילה וחללי אירוח", 
    icon: "Music" 
  },
  { 
    name: "חדרי קריוקי", 
    description: "חדרים מאובזרים לאירועי שירה ומוסיקה", 
    icon: "Headphones" 
  },
  { 
    name: "חדרי בריחה", 
    description: "חדרי בריחה וחידות להפעלות קבוצתיות", 
    icon: "Puzzle" 
  },
  { 
    name: "הפקות קונספט בהתאמה אישית", 
    description: "הפקות ייחודיות במיקום לפי דרישה", 
    icon: "Lightbulb" 
  }
];

const CategorySubcategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocationCategory, setIsLocationCategory] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Validate if categoryId is a valid UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!categoryId || !uuidRegex.test(categoryId)) {
          throw new Error("מזהה קטגוריה לא תקין");
        }
        
        // שליפת נתוני הקטגוריה
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("*")
          .eq("id", categoryId)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
          throw new Error(categoryError.message);
        }

        if (!categoryData) {
          throw new Error("הקטגוריה לא נמצאה");
        }

        setCategory(categoryData);
        
        // בדיקה האם זו קטגוריית לוקיישנים
        const isLocations = categoryData.name === "אולמות ומקומות אירוע" || categoryId === "d0251580-5005-4bd8-ae4d-ddd1084f1c99";
        setIsLocationCategory(isLocations);

        // שליפת תת-הקטגוריות
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
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
          .eq("category_id", categoryId)
          .order('name');

        if (subcategoriesError) {
          console.error("Error fetching subcategories:", subcategoriesError);
          throw new Error(subcategoriesError.message);
        }

        // עיבוד הנתונים והוספת ספירת הספקים
        let processedSubcategories = subcategoriesData.map(subcategory => ({
          id: subcategory.id,
          name: subcategory.name,
          description: subcategory.description,
          icon: subcategory.icon,
          count: subcategory.provider_subcategories?.length || 0
        }));
        
        // אם זו קטגוריית לוקיישנים ואין תת קטגוריות, השתמש בקבוצת הדגמה
        if (isLocations && processedSubcategories.length === 0) {
          processedSubcategories = defaultLocationSubcategories.map((subcategory, index) => ({
            id: `demo-location-${index}`,
            name: subcategory.name,
            description: subcategory.description,
            icon: subcategory.icon,
            count: 0,
            isDemoData: true
          }));
        }

        setSubcategories(processedSubcategories);
        
        // אם אין תתי קטגוריות ולא מדובר בקטגוריית לוקיישנים, שלוף את כל הספקים בקטגוריה זו באופן ישיר
        if (processedSubcategories.length === 0 && !isLocations) {
          // שליפת ספקים בקטגוריה זו
          const { data: providerSubcategories, error: providersError } = await supabase
            .from("provider_subcategories")
            .select(`
              providers(
                id,
                name,
                description,
                logo_url,
                services(id)
              ),
              subcategories(category_id)
            `)
            .eq("subcategories.category_id", categoryId);

          if (providersError) {
            console.error("Error fetching providers:", providersError);
            throw new Error(providersError.message);
          }

          // עיבוד נתוני הספקים
          const processedProviders = providerSubcategories
            .filter(item => item.providers) // Filter out null providers
            .map(item => {
              const provider = item.providers;
              return {
                id: provider.id,
                name: provider.name,
                description: provider.description,
                logo_url: provider.logo_url,
                service_count: provider.services ? provider.services.length : 0
              };
            });

          setProviders(processedProviders);
        }
        
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
        toast.error("שגיאה בטעינת הנתונים", {
          description: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId, navigate]);

  // מצב של טעינה
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
                  <span className="mr-3 text-lg text-gray-600">טוען נתונים...</span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // מצב של שגיאה
  if (error || !category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">שגיאה בטעינת הנתונים</h1>
              <p className="mb-6 text-gray-600">{error || "הקטגוריה לא נמצאה"}</p>
              <Link 
                to="/categories" 
                className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
              >
                חזרה לכל הקטגוריות
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    if (subcategory.isDemoData) {
      // אם זה נתוני דמו, הצג Toast עם הודעה
      toast.info(`${subcategory.name} בפיתוח`, {
        description: "קטגוריה זו עדיין בפיתוח ותהיה זמינה בקרוב"
      });
    } else {
      // אחרת, נווט לדף תת-הקטגוריה
      navigate(`/subcategories/${subcategory.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Category Info */}
        <section 
          className="bg-cover bg-center py-24 text-white relative"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${category.image_url || '/placeholder.svg'})` 
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Link to="/categories" className="inline-flex items-center text-white mb-4 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                חזרה לכל הקטגוריות
              </Link>
              <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Subcategories List */}
        {subcategories.length > 0 ? (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">תת קטגוריות ב{category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id} 
                    onClick={() => handleSubcategoryClick(subcategory)}
                    className="cursor-pointer"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                          <div className="text-brand-600">
                            {iconComponents[subcategory.icon] || <span>{subcategory.icon}</span>}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{subcategory.name}</h3>
                        <p className="text-gray-500 text-center mb-4">{subcategory.description}</p>
                        <div className="mt-auto">
                          {subcategory.isDemoData ? (
                            <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              בקרוב
                            </span>
                          ) : (
                            <span className="text-sm px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                              {subcategory.count} נותני שירות
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : providers.length > 0 ? (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">נותני שירות ב{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
                  <Link 
                    key={provider.id} 
                    to={`/providers/${provider.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="md:w-1/3 h-48 md:h-auto bg-gray-100 relative">
                            {provider.logo_url ? (
                              <img 
                                src={provider.logo_url} 
                                alt={provider.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <span className="text-gray-400 text-lg">אין תמונה</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6 md:w-2/3 flex flex-col">
                            <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{provider.description}</p>
                            
                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="flex items-center mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i}
                                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">(12 ביקורות)</span>
                              </div>
                              <span className="text-sm text-gray-500">{provider.service_count} שירותים</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg border border-dashed">
                <h3 className="text-xl font-semibold mb-4">אין תוכן זמין כרגע</h3>
                <p className="mb-6">כרגע אין תת-קטגוריות או נותני שירות זמינים עבור {category.name}. אנו עובדים על הוספת תוכן נוסף בקרוב!</p>
                
                <div className="flex justify-center mt-4">
                  <Link 
                    to="/categories" 
                    className="bg-brand-100 text-brand-700 px-4 py-2 rounded-lg font-medium hover:bg-brand-200 transition-colors"
                  >
                    חזרה לכל הקטגוריות
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">מחפשים משהו מיוחד?</h2>
            <p className="mb-6">צרו קשר עם צוות השירות שלנו ונמצא את הספק המושלם עבורכם</p>
            <Link 
              to="/contact" 
              className="bg-brand-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              צרו קשר
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategorySubcategories;
