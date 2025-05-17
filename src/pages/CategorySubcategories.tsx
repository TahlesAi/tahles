
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const CategorySubcategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch category data
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single();

        if (categoryError) throw categoryError;
        setCategory(categoryData);

        // Fetch subcategories for this category
        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('subcategories')
          .select('id, name, description, icon, provider_subcategories(provider_id)')
          .eq('category_id', categoryId)
          .order('name', { ascending: true });

        if (subcategoriesError) throw subcategoriesError;
        setSubcategories(subcategoriesData);

        // ספקים ייחודיים לקטגוריה זו 
        if (subcategoriesData.length > 0) {
          // אוסף את כל ספקי המשנה לתת-קטגוריה
          const allProviderIds = subcategoriesData
            .flatMap(sub => sub.provider_subcategories)
            .map(ps => ps.provider_id)
            .filter((id, index, self) => id && self.indexOf(id) === index); // רק ערכים ייחודיים

          if (allProviderIds.length > 0) {
            const { data: providersData, error: providersError } = await supabase
              .from('providers')
              .select('id, name, description, logo_url, services(id)')
              .in('id', allProviderIds);

            if (providersError) throw providersError;
            setProviders(providersData);
          } else {
            // אם אין תת-קטגוריות, בדוק אם יש ספקים משויכים ישירות לקטגוריה
            const { data: directProviders, error: directProvidersError } = await supabase
              .from('provider_subcategories')
              .select('providers(id, name, description, logo_url, services(id)), subcategories(category_id)')
              .eq('subcategories.category_id', categoryId);

            if (directProvidersError) throw directProvidersError;
            
            if (directProviders && directProviders.length > 0) {
              // שמירת הספקים הייחודיים
              const uniqueProviders = directProviders
                .filter(p => p.providers) // הסרת שורות ללא ספקים
                .map(p => p.providers)
                .filter((provider, index, self) => 
                  index === self.findIndex(p => p.id === provider.id)
                );
              
              setProviders(uniqueProviders);
            } else {
              setProviders([]);
            }
          }
        } else {
          // אם אין תת-קטגוריות, בדוק אם יש ספקים משויכים ישירות לקטגוריה
          const { data: directProviders, error: directProvidersError } = await supabase
            .from('provider_subcategories')
            .select('providers(id, name, description, logo_url, services(id)), subcategories(category_id)')
            .eq('subcategories.category_id', categoryId);

          if (directProvidersError) throw directProvidersError;
          
          if (directProviders && directProviders.length > 0) {
            // שמירת הספקים הייחודיים
            const uniqueProviders = directProviders
              .filter(p => p.providers) // הסרת שורות ללא ספקים
              .map(p => p.providers)
              .filter((provider, index, self) => 
                index === self.findIndex(p => p.id === provider.id)
              );
            
            setProviders(uniqueProviders);
          } else {
            setProviders([]);
          }
        }
      } catch (error) {
        console.error('שגיאה בטעינת הנתונים:', error);
        toast.error('אירעה שגיאה בטעינת הנתונים');
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  // פותחים דף קייטרינג מיוחד אם זה קטגוריית קייטרינג
  if (categoryId === 'cb6c8965-2dfc-442b-824d-528ab2ab5648') {
    return (
      <CateringRedirect />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-8 flex-grow">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
              ))}
            </div>

            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-16 flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">קטגוריה לא נמצאה</h1>
            <p className="text-gray-600 mb-6">מצטערים, הקטגוריה שחיפשת אינה קיימת.</p>
            <Button asChild>
              <Link to="/categories">חזרה לקטגוריות</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* פירורי לחם */}
          <nav className="flex mb-6 text-sm items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-4 w-4 ml-1" />
            </Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>

          {/* תת-קטגוריות */}
          {subcategories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">תת-קטגוריות ב{category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/subcategories/${subcategory.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="ml-3 p-2 bg-brand-50 rounded-md">
                            {/* אייקון קשיח למטרות הדגמה, אפשר להשתמש בספריית האייקונים */}
                            <div className="h-5 w-5 text-brand-600">{subcategory.icon}</div>
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-brand-600 transition-colors">
                              {subcategory.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {subcategory.description}
                            </p>
                          </div>
                          <div className="mr-auto">
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ספקים פופולאריים */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">ספקי {category.name} מובילים</h2>
            {providers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <Link
                    key={provider.id}
                    to={`/providers/${provider.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {provider.logo_url ? (
                          <img
                            src={provider.logo_url}
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">אין תמונה</span>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium group-hover:text-brand-600 transition-colors mb-1">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                          {provider.description}
                        </p>
                        <div className="flex justify-end">
                          <span className="text-xs text-brand-600 font-medium">
                            {provider.services?.length || 0} שירותים זמינים
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">לא נמצאו ספקים בקטגוריה זו</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// רכיב הפניה מחדש לדף הקייטרינג הייעודי
const CateringRedirect = () => {
  useEffect(() => {
    // פשוט ניווט לדף הקייטרינג הייעודי
    window.location.href = '/catering-search';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container px-4 py-16 flex-grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">מעבר לדף חיפוש שירותי קייטרינג...</p>
          <div className="mt-4">
            <Button asChild>
              <Link to="/catering-search">לחץ כאן אם לא הועברת אוטומטית</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategorySubcategories;
