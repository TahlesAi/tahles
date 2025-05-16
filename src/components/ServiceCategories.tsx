
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones,
  Loader2, Lightbulb, AlignRight, Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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

interface Category {
  id: string;
  name: string; 
  description: string;
  icon: string;
  subcategories_count?: number;
  image_url?: string;
}

interface Subcategory {
  id: string;
  name: string; 
  description: string;
  icon: string;
  providers_count?: number;
  image_url?: string;
}

export default function ServiceCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredSubcategories, setFeaturedSubcategories] = useState<Subcategory[]>([]);
  const [popularServices, setPopularServices] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories with subcategory counts
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select(`
            id, 
            name, 
            description, 
            icon,
            image_url,
            subcategories(count)
          `)
          .order('name');
          
        if (categoriesError) {
          throw categoriesError;
        }
        
        const processedCategories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          image_url: category.image_url,
          subcategories_count: category.subcategories?.length || 0
        }));
        
        setCategories(processedCategories);
        
        // Get popular subcategories across different categories
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select(`
            id,
            name,
            description,
            icon,
            image_url,
            provider_subcategories(count)
          `)
          .order('created_at', { ascending: false })
          .limit(6);
          
        if (subcategoriesError) {
          throw subcategoriesError;
        }
        
        const processedSubcategories = subcategoriesData.map(subcategory => ({
          id: subcategory.id,
          name: subcategory.name,
          description: subcategory.description,
          icon: subcategory.icon,
          image_url: subcategory.image_url,
          providers_count: subcategory.provider_subcategories?.length || 0
        }));
        
        setFeaturedSubcategories(processedSubcategories);
        
        // Fetch some popular services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select(`
            id, 
            name, 
            description, 
            price_range,
            image_url,
            provider_id,
            providers(name)
          `)
          .limit(4);
          
        if (servicesError) {
          throw servicesError;
        }
        
        if (servicesData) {
          setPopularServices(servicesData);
        }
        
      } catch (error: any) {
        console.error("Error fetching categories:", error);
        setError(error.message || 'שגיאה בטעינת הנתונים');
        toast.error("שגיאה בטעינת הנתונים", {
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
            <p className="text-gray-600">מגוון השירותים שלנו להפקת אירועים מושלמים</p>
          </div>
          <div className="flex justify-center items-center my-12">
            <Loader2 className="h-12 w-12 text-brand-600 animate-spin" />
            <span className="mr-3 text-lg text-gray-600">טוען קטגוריות...</span>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
            >
              נסה שנית
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
            <p className="text-gray-600 mb-4">לא נמצאו קטגוריות שירותים במערכת</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">קטגוריות שירותים</h2>
          <p className="text-gray-600">מגוון השירותים שלנו להפקת אירועים מושלמים, הרצאות, ימי כיף ואמנים מובילים</p>
        </div>
        
        {/* Main Categories */}
        <h3 className="text-2xl font-bold mb-6 text-right">קטגוריות ראשיות</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <Card className="h-full hover:shadow-md transition-all transform hover:-translate-y-1 duration-300">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <div className="text-brand-600">
                      {iconMap[category.icon] || <span>{category.icon}</span>}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
                  {category.subcategories_count > 0 && (
                    <span className="mt-3 text-xs px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                      {category.subcategories_count} תתי-קטגוריות
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Subcategories */}
        {featuredSubcategories.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6 text-right">קטגוריות פופולריות</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {featuredSubcategories.map((subcategory) => (
                <Link key={subcategory.id} to={`/subcategories/${subcategory.id}`}>
                  <Card className="h-full hover:shadow-md transition-all transform hover:-translate-y-1 duration-300 border-accent1-100">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                      <div className="w-14 h-14 rounded-full bg-accent1-50 flex items-center justify-center mb-4">
                        <div className="text-accent1-600">
                          {iconMap[subcategory.icon] || <span>{subcategory.icon}</span>}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{subcategory.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{subcategory.description}</p>
                      {subcategory.providers_count > 0 ? (
                        <span className="mt-3 text-xs px-2 py-1 bg-accent1-50 text-accent1-700 rounded-full">
                          {subcategory.providers_count} נותני שירות
                        </span>
                      ) : (
                        <span className="mt-3 text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                          אין ספקים עדיין
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        
        {/* Popular Services */}
        {popularServices.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6 mt-12 text-right">שירותים מובילים</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <Link to={`/services/${service.id}`}>
                    <div className="aspect-[5/3] w-full overflow-hidden relative">
                      <img 
                        src={service.image_url || "/placeholder.svg"} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      {service.price_range && (
                        <Badge className="absolute bottom-2 left-2 bg-brand-600">
                          {service.price_range}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium line-clamp-1">{service.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        {service.providers?.name || "ספק שירות"}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </>
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700"
          >
            צפייה בכל הקטגוריות
            <svg className="w-5 h-5 mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
