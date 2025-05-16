
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Subcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
}

// מיפוי אייקונים מלוסיד
import {
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones
} from "lucide-react";

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
  "Headphones": <Headphones className="h-8 w-8" />
};

const CategorySubcategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
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
          throw new Error(categoryError.message);
        }

        setCategory(categoryData);

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
          .eq("category_id", categoryId);

        if (subcategoriesError) {
          throw new Error(subcategoriesError.message);
        }

        // עיבוד הנתונים והוספת ספירת הספקים
        const processedSubcategories = subcategoriesData.map(subcategory => ({
          id: subcategory.id,
          name: subcategory.name,
          description: subcategory.description,
          icon: subcategory.icon,
          count: subcategory.provider_subcategories?.length || 0
        }));

        setSubcategories(processedSubcategories);
        
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
              <div className="max-w-3xl mx-auto">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-8" />
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
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
                  <Link 
                    key={subcategory.id} 
                    to={`/subcategories/${subcategory.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                          <div className="text-brand-600">
                            {iconComponents[subcategory.icon] || subcategory.icon}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{subcategory.name}</h3>
                        <p className="text-gray-500 text-center mb-4">{subcategory.description}</p>
                        <div className="mt-auto text-sm text-gray-400">{subcategory.count} נותני שירות</div>
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
                <p className="mb-4">אין תת-קטגוריות זמינות כרגע עבור קטגוריה זו.</p>
                {category.name === "אולמות ומקומות אירוע" && (
                  <p className="text-brand-600">בקרוב! אנו עובדים על הוספת מקומות אירוע מומלצים.</p>
                )}
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
