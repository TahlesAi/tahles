
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, ChevronLeft } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

const CategorySubcategories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { 
    categories, 
    subcategories, 
    providers,
    services,
    getSubcategoriesByCategory,
    getProvidersBySubcategory,
    getServicesBySubcategory,
    isLoading 
  } = useEventContext();
  
  const [category, setCategory] = useState<any>(null);
  const [categorySubcategories, setCategorySubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (!categoryId) return;
    
    console.log('Viewing category with ID:', categoryId);
    
    // מציאת הקטגוריה
    const foundCategory = categories.find(cat => cat.id === categoryId);
    
    if (foundCategory) {
      console.log('Found category:', foundCategory.name);
      setCategory(foundCategory);
      
      // מציאת תתי הקטגוריות
      const subs = getSubcategoriesByCategory(categoryId);
      console.log('Found subcategories:', subs.length);
      
      // עדכון תתי הקטגוריות עם מידע על מספר ספקים ושירותים
      const enrichedSubs = subs.map(sub => {
        const subProviders = getProvidersBySubcategory(sub.id);
        const subServices = getServicesBySubcategory(services, sub.id);
        
        return {
          ...sub,
          providersCount: subProviders.length,
          servicesCount: subServices.length
        };
      });
      
      setCategorySubcategories(enrichedSubs);
    } else {
      console.log('Category not found');
    }
  }, [categoryId, categories, subcategories, providers, services, getSubcategoriesByCategory, getProvidersBySubcategory, getServicesBySubcategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">טוען קטגוריות...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">הקטגוריה לא נמצאה</h2>
            <p className="mb-6">לא הצלחנו למצוא את הקטגוריה המבוקשת.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowRight className="h-4 w-4 ml-2" />
              חזרה
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* ניווט נתיב */}
          <nav className="flex items-center space-x-2 mb-8" dir="rtl">
            <Link to="/" className="text-gray-500 hover:text-brand-600 transition-colors">
              דף הבית
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <Link to="/categories" className="text-gray-500 hover:text-brand-600 transition-colors">
              קטגוריות
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <span className="text-brand-600 font-medium">{category.name}</span>
          </nav>

          {/* כותרת הקטגוריה */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
            <div className="mt-6">
              <Badge variant="outline" className="text-base px-4 py-2">
                {categorySubcategories.length} תתי קטגוריות זמינות
              </Badge>
            </div>
          </div>

          {/* רשימת תתי קטגוריות */}
          {categorySubcategories.length === 0 ? (
            <div className="text-center py-16">
              <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                אין תתי קטגוריות זמינות
              </h3>
              <p className="text-gray-500 mb-6">
                לא נמצאו תתי קטגוריות עבור קטגוריה זו כרגע.
              </p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לקטגוריות
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categorySubcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/subcategories/${subcategory.id}`}
                  className="group block"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center group-hover:bg-brand-200 transition-colors mb-3">
                          <Layers className="h-6 w-6 text-brand-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                          {subcategory.name}
                        </h3>
                        {subcategory.description && (
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <span>{subcategory.providersCount} ספקים</span>
                        <span>{subcategory.servicesCount} שירותים</span>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-brand-600 font-medium text-sm group-hover:underline">
                          צפה בספקים ←
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategorySubcategories;
