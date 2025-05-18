
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Home, ChevronRight } from 'lucide-react';
import { useEventContext } from '@/context/EventContext';

const CategorySubcategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    setSelectedSubcategory, 
    getSubcategoriesByCategory,
    isLoading, 
    error 
  } = useEventContext();

  useEffect(() => {
    // Reset selected subcategory when viewing a new category
    setSelectedSubcategory(null);
    
    // Find and set the selected category
    if (categoryId && categories.length > 0) {
      const category = categories.find(c => c.id === categoryId);
      setSelectedCategory(category || null);
    }
  }, [categoryId, categories, setSelectedCategory, setSelectedSubcategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-8 flex-grow">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Array(6).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !selectedCategory) {
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

  // קטגוריית קייטרינג מופנית לדף ייעודי
  if (categoryId === 'cb6c8965-2dfc-442b-824d-528ab2ab5648') {
    return (
      <CateringRedirect />
    );
  }

  const subcategories = getSubcategoriesByCategory(categoryId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" dir="rtl">
        <div className="container px-4 py-8">
          {/* פירורי לחם */}
          <nav className="flex mb-6 text-sm items-center text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              <Home className="h-4 w-4 ml-1" />
            </Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
            <ChevronLeft className="h-3 w-3 mx-1" />
            <span className="text-gray-900 font-medium">{selectedCategory.name}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">{selectedCategory.name}</h1>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>

          {/* תת-קטגוריות */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">תת-קטגוריות ב{selectedCategory.name}</h2>
            
            {subcategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/subcategories/${subcategory.id}`}
                    className="group"
                    onClick={() => setSelectedSubcategory(subcategory)}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="ml-3 p-2 bg-brand-50 rounded-md">
                            <div className="h-5 w-5 text-brand-600">
                              {subcategory.icon ? (
                                <div className="text-brand-600">
                                  {typeof subcategory.icon === 'string' && iconMap[subcategory.icon]}
                                </div>
                              ) : (
                                <div className="h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                                  {subcategory.name.substring(0, 1)}
                                </div>
                              )}
                            </div>
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
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">לא נמצאו תת-קטגוריות בקטגוריה זו</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/categories">חזרה לקטגוריות</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <div className="text-center py-8 bg-brand-50 rounded-lg mt-10">
            <h3 className="text-xl font-bold mb-2">מעוניינים להציע שירותים בקטגוריה זו?</h3>
            <p className="text-gray-600 mb-4">הצטרפו כספק ופרסמו את השירותים שלכם</p>
            <Button asChild>
              <Link to="/provider-onboarding">הצטרפו כספק</Link>
            </Button>
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

export default CategorySubcategories;
