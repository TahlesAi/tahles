
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Home, ChevronRight } from 'lucide-react';
import { useEventContext } from '@/context/EventContext';
import { 
  Music, Camera, Utensils, MapPin, Mic2, Monitor, 
  Gift, Sparkles, Calendar, Wand2, PartyPopper, 
  TentTree, User, PlusCircle, Users, Headphones 
} from "lucide-react";
import { HebrewCategory, HebrewSubcategory } from '@/lib/types/hierarchy';

const CategorySubcategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    setSelectedSubcategory, 
    getSubcategoriesByCategory,
    hebrewCategories,
    isLoading, 
    error 
  } = useEventContext();
  
  const [hebrewCategory, setHebrewCategory] = useState<HebrewCategory | null>(null);

  useEffect(() => {
    // Reset selected subcategory when viewing a new category
    setSelectedSubcategory(null);
    
    // Find and set the selected Hebrew category
    if (categoryId && hebrewCategories.length > 0) {
      const category = hebrewCategories.find(c => c.id === categoryId);
      setHebrewCategory(category || null);
    }
    
    // For backward compatibility, also set the selected category from the regular categories
    if (categoryId && categories.length > 0) {
      const category = categories.find(c => c.id === categoryId);
      setSelectedCategory(category || null);
    }
  }, [categoryId, categories, hebrewCategories, setSelectedCategory, setSelectedSubcategory]);

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

  if (error || (!hebrewCategory && !selectedCategory)) {
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
  if (categoryId === 'catering') {
    return (
      <CateringRedirect />
    );
  }

  // Use Hebrew subcategories if available, otherwise fall back to legacy subcategories
  const subcategories = hebrewCategory ? hebrewCategory.subcategories : 
    getSubcategoriesByCategory(categoryId || '');

  // Get the category name from either Hebrew or legacy data
  const categoryName = hebrewCategory ? hebrewCategory.name : 
    selectedCategory ? selectedCategory.name : '';
    
  const categoryDescription = hebrewCategory ? hebrewCategory.description : 
    selectedCategory ? selectedCategory.description : '';

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
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
            <p className="text-gray-600">{categoryDescription}</p>
          </div>

          {/* תת-קטגוריות */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">תת-קטגוריות ב{categoryName}</h2>
            
            {subcategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => {
                  // Handle both Hebrew subcategory and legacy subcategory
                  const subcategoryId = 'subcategoryId' in subcategory ? 
                    subcategory.subcategoryId : subcategory.id;
                  const subcategoryName = subcategory.name;
                  const subcategoryIcon = subcategory.icon;
                  const subcategoryDescription = subcategory.description || '';
                  
                  return (
                    <Link
                      key={subcategoryId}
                      to={`/subcategories/${subcategoryId}`}
                      className="group"
                      onClick={() => {
                        // Only set selected subcategory if it's a legacy subcategory
                        if (!('subcategoryId' in subcategory)) {
                          setSelectedSubcategory(subcategory);
                        }
                      }}
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="ml-3 p-2 bg-brand-50 rounded-md">
                              <div className="h-5 w-5 text-brand-600">
                                {subcategoryIcon && typeof subcategoryIcon === 'string' && iconMap[subcategoryIcon] ? (
                                  <div className="text-brand-600">
                                    {iconMap[subcategoryIcon]}
                                  </div>
                                ) : (
                                  <div className="h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs">
                                    {subcategoryName.substring(0, 1)}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium group-hover:text-brand-600 transition-colors">
                                {subcategoryName}
                              </h3>
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {subcategoryDescription}
                              </p>
                            </div>
                            <div className="mr-auto">
                              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
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
  "Headphones": <Headphones className="h-5 w-5" />
};

export default CategorySubcategories;
