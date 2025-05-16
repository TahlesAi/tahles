
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Star, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Provider {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  service_count: number;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  category_id: string;
  category_name?: string;
}

const SubcategoryProviders = () => {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        
        // Validate if subcategoryId is a valid UUID
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!subcategoryId || !uuidRegex.test(subcategoryId)) {
          throw new Error("מזהה תת-קטגוריה לא תקין");
        }
        
        // שליפת נתוני תת-הקטגוריה
        const { data: subcategoryData, error: subcategoryError } = await supabase
          .from("subcategories")
          .select(`
            id, 
            name, 
            description, 
            icon,
            category_id,
            categories(name)
          `)
          .eq("id", subcategoryId)
          .single();

        if (subcategoryError) {
          throw new Error(subcategoryError.message);
        }

        setSubcategory({
          ...subcategoryData,
          category_name: subcategoryData.categories?.name
        });

        // שליפת ספקי השירות בתת-הקטגוריה
        const { data: providersData, error: providersError } = await supabase
          .from("provider_subcategories")
          .select(`
            providers(
              id,
              name,
              description,
              logo_url,
              services(id)
            )
          `)
          .eq("subcategory_id", subcategoryId);

        if (providersError) {
          throw new Error(providersError.message);
        }

        // עיבוד הנתונים
        const processedProviders = providersData
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

    if (subcategoryId) {
      fetchSubcategoryData();
    }
  }, [subcategoryId, navigate]);

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
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
  if (error || !subcategory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">שגיאה בטעינת הנתונים</h1>
              <p className="mb-6 text-gray-600">{error || "תת-הקטגוריה לא נמצאה"}</p>
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
        {/* Hero Section with Subcategory Info */}
        <section className="bg-brand-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {subcategory.category_id && (
                <Link to={`/categories/${subcategory.category_id}`} className="inline-flex items-center text-white/80 hover:text-white mb-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  חזרה ל{subcategory.category_name || 'קטגוריה'}
                </Link>
              )}
              <h1 className="text-3xl font-bold mb-4">{subcategory.name}</h1>
              <p className="text-lg">{subcategory.description}</p>
            </div>
          </div>
        </section>

        {/* Providers List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {providers.length > 0 ? `נותני שירות ב${subcategory.name}` : ''}
            </h2>
            
            {providers.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">אין ספקי שירות זמינים כרגע בתת-קטגוריה זו.</p>
                <p className="text-brand-600 mb-6">אנחנו עובדים על הוספת ספקים נוספים בקרוב!</p>
                <Link to="/categories" className="text-brand-600 hover:underline mt-4 inline-block">
                  חזרה לכל הקטגוריות
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">רוצים להציע את השירות שלכם?</h2>
            <p className="mb-6">הצטרפו לרשימת נותני השירות שלנו והגדילו את החשיפה לקהל הרחב</p>
            <Link 
              to="/provider-onboarding" 
              className="bg-brand-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
              הצטרפו כנותני שירות
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryProviders;
