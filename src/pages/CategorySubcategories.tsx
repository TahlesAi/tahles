
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

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

const iconComponents: Record<string, React.ReactNode> = {
  // ניתן להוסיף יותר אייקונים לפי הצורך
};

const CategorySubcategories = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
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
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

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
            <h1 className="text-2xl font-bold mb-4">שגיאה בטעינת הנתונים</h1>
            <p>{error || "הקטגוריה לא נמצאה"}</p>
            <Link to="/categories" className="mt-4 inline-block text-brand-600 hover:underline">
              חזרה לכל הקטגוריות
            </Link>
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${category.image_url})` 
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
                            {/* כאן יש להציג אייקון לפי השם */}
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
              <p>אין תת-קטגוריות זמינות כרגע.</p>
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
